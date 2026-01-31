import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "email_popup_shown";

const EmailPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem(STORAGE_KEY);
    if (hasSeenPopup) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;

      if (scrollPercentage >= 50) {
        setIsVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email_address", email);

      await fetch("https://app.kit.com/forms/aaf5fef82f/subscriptions", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: "rgba(10, 10, 11, 0.85)" }}
    >
      <div
        className="relative w-full"
        style={{
          maxWidth: "420px",
          backgroundColor: "#141415",
          border: "1px solid #27272A",
          borderRadius: "16px",
          padding: "32px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <p className="text-xl font-semibold text-white mb-2">Check your inbox!</p>
            <p className="text-gray-400">Your free playbook is on its way.</p>
          </div>
        ) : (
          <>
            {/* Headline */}
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4 pr-6"
              style={{ lineHeight: "1.3" }}
            >
              How many weekends have you wasted on projects that went nowhere?
            </h2>

            {/* Body */}
            <p className="text-gray-400 mb-6" style={{ lineHeight: "1.6" }}>
              Before you build your next thing, learn how to validate it in 48
              hours. Free guide — no fluff, just the process.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full h-12 px-4 rounded-lg bg-[#0A0A0B] border border-[#27272A] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#22C55E] transition-colors"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#22C55E" }}
              >
                {isSubmitting ? "Sending..." : "Get the Free Playbook"}
              </button>
            </form>

            {/* Small text */}
            <p className="text-center text-gray-500 text-sm mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailPopup;
