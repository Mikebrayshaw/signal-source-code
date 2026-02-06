import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MobileNav from './MobileNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-border bg-surface fixed h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Mobile nav */}
      <MobileNav />

      {/* Main content */}
      <main className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        <TopBar />
        <div className="flex-1 p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
