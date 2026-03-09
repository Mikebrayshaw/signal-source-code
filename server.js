import 'dotenv/config'
import express from 'express'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8080

// --- Stripe & Supabase clients ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// --- Stripe webhook (MUST be before express.json()) ---
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature']
    let event
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object
          const userId = session.metadata?.user_id
          if (!userId) break

          // Retrieve subscription details
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription
          )

          await supabase.from('subscriptions').upsert(
            {
              user_id: userId,
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              status: subscription.status,
              price_id: subscription.items.data[0]?.price.id,
              current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          )
          console.log(`Subscription created for user ${userId}`)
          break
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const sub = event.data.object
          await supabase
            .from('subscriptions')
            .update({
              status: sub.status,
              current_period_end: new Date(
                sub.current_period_end * 1000
              ).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', sub.id)
          console.log(`Subscription ${sub.id} updated to ${sub.status}`)
          break
        }
      }
    } catch (err) {
      console.error('Webhook handler error:', err)
    }

    res.json({ received: true })
  }
)

// --- JSON body parser (after webhook route) ---
app.use(express.json())

// --- Create Checkout Session ---
app.post('/api/checkout', async (req, res) => {
  const { user_id, user_email } = req.body
  if (!user_id || !user_email) {
    return res.status(400).json({ error: 'user_id and user_email required' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: user_email,
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      metadata: { user_id },
      success_url: `${req.headers.origin || 'https://signal-source-code-production.up.railway.app'}/app/?checkout=success`,
      cancel_url: `${req.headers.origin || 'https://signal-source-code-production.up.railway.app'}/app/?checkout=cancel`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

// --- Get subscription status ---
app.get('/api/subscription/:userId', async (req, res) => {
  const { userId } = req.params

  const { data, error } = await supabase
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return res.json({ subscribed: false })
  }

  res.json({
    subscribed: data.status === 'active' || data.status === 'trialing',
    currentPeriodEnd: data.current_period_end,
    status: data.status,
  })
})

// --- Static files ---

// Landing page — static files from root
app.use('/', express.static(__dirname, { index: 'index.html' }))

// React SPA — built assets
app.use('/app', express.static(join(__dirname, 'dist'), { index: false }))

// SPA fallback — serve app.html for all /app/* routes
app.get('/app/*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'app.html'))
})
app.get('/app', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'app.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
