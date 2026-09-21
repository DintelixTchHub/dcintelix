import { Navigate, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#000000] antialiased">
      <Outlet />
    </div>
  )
}

export function AdminIndexRedirect() {
  return <Navigate to="/admin/login" replace />
}
