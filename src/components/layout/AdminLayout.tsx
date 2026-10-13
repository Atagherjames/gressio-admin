import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Users,
  ShoppingBag,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

export const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Users',
      to: '/users',
      icon: Users,
    },
    {
      label: 'Marketplace',
      to: '/marketplace',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE] flex">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Responsive Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header with Gressio Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Gressio Logo"
              className="w-9 h-9 object-contain rounded-xl shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-slate-900 tracking-tight">Gressio</span>
                <Badge variant="indigo" className="text-[10px] py-0 px-1.5">ADMIN</Badge>
              </div>
              <p className="text-[11px] text-slate-400">Campus Control Center</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EEF0FF] text-[#563CF9] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}
        </div>


        {/* Admin Profile & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={user?.profileImage}
                name={user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username || 'Admin'}
                size="sm"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username || 'Admin'}
                </p>
                <p className="text-xs text-slate-500 truncate font-mono">
                  {user?.identifier || 'Administrator'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger button for Mobile / Tablet */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <img
              src="/logo.png"
              alt="Gressio"
              className="w-7 h-7 object-contain rounded-lg lg:hidden shrink-0"
            />

            <h1 className="text-sm font-bold text-slate-800 truncate">
              Gressio Campus Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">


            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-slate-600 hover:text-rose-600 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 hover:bg-rose-50 lg:hidden flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
