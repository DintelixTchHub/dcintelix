import {
  FiBriefcase,
  FiCheckCircle,
  FiLogOut,
  FiMail,
  FiMessageSquare,
  FiUser,
} from 'react-icons/fi'

const navigationItems = [
  { id: 'contacts', label: 'Messages', icon: FiMessageSquare },
  { id: 'newsletter', label: 'Newsletter', icon: FiMail },
  { id: 'testimonials', label: 'Testimonials', icon: FiUser },
  { id: 'jobs', label: 'Jobs', icon: FiBriefcase },
  { id: 'applications', label: 'Applications', icon: FiCheckCircle },
]

export default function AdminSidebar({
  user,
  activeTab,
  isOpen,
  onTabChange,
  onLogout,
}) {
  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-slate-900 text-white transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>
      <div className="p-4">
        <h1 className="text-lg font-bold">DCintelix</h1>
        <p className="text-slate-400 text-xs">Dashboard</p>
      </div>

      <div className="px-4 py-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <FiUser className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium truncate max-w-[160px]">{user?.email}</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>

      <nav className="px-3 py-3">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === id ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'} ${id !== 'contacts' ? 'mt-1' : ''}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg text-sm transition-colors">
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
