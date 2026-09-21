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
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 border-r border-[#E2E8F0] bg-[#000000] text-white transform transition-transform duration-300 shadow-[0_18px_50px_rgba(15,23,42,0.15)] ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:transform-none`}>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D6D63] flex items-center justify-center shadow-lg shadow-[#0D6D63]/20">
            <FiBriefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-wide">DCintelix</h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Dashboard</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
          <div className="w-9 h-9 bg-[#0D6D63] rounded-full flex items-center justify-center">
            <FiUser className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate max-w-[180px]">{user?.email}</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Admin</p>
          </div>
        </div>
      </div>

      <nav className="px-3 py-4 space-y-1.5">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${activeTab === id ? 'bg-[#0D6D63] text-white shadow-lg shadow-[#0D6D63]/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-[#0F172A]">
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2.5 text-red-300 hover:bg-white/5 rounded-xl text-sm transition-colors">
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
