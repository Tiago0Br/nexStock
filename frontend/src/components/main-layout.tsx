import { Outlet, NavLink } from 'react-router-dom'
import { PackageIcon, BoxIcon, LayoutDashboardIcon, MenuIcon } from 'lucide-react'
import { useState } from 'react'

export function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Dashboard (Produção)', icon: <LayoutDashboardIcon size={20} /> },
    { path: '/products', label: 'Produtos', icon: <PackageIcon size={20} /> },
    { path: '/materials', label: 'Matérias-Primas', icon: <BoxIcon size={20} /> }
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white">
        <div className="p-4 flex items-center justify-center border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-wider">
            INDÚSTRIA<span className="text-blue-400">FLEX</span>
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
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">
            INDÚSTRIA<span className="text-blue-400">FLEX</span>
          </h1>
          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <MenuIcon size={24} />
          </button>
        </header>

        {isMobileMenuOpen && (
          <nav className="md:hidden bg-slate-800 text-white p-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    isActive ? 'bg-blue-600' : 'hover:bg-slate-700'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
