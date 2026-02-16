import { BoxIcon, LayoutDashboardIcon, MenuIcon, PackageIcon } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from '../theme-toggle'

export function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Dashboard (Produção)', icon: <LayoutDashboardIcon size={20} /> },
    { path: '/products', label: 'Produtos', icon: <PackageIcon size={20} /> },
    { path: '/materials', label: 'Matérias-Primas', icon: <BoxIcon size={20} /> }
  ]

  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
          <h1 className="text-xl font-bold tracking-wider text-sidebar-foreground">
            INDÚSTRIA<span className="text-primary">FLEX</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-sidebar border-b border-sidebar-border p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-sidebar-foreground">
            INDÚSTRIA<span className="text-primary">FLEX</span>
          </h1>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-sidebar-foreground"
          >
            <MenuIcon size={24} />
          </button>
        </header>

        {isMobileMenuOpen && (
          <nav className="md:hidden bg-sidebar border-b border-sidebar-border p-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="pt-2 border-t border-sidebar-border">
              <ThemeToggle />
            </div>
          </nav>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
