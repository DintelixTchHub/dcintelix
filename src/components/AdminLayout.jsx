import { Navigate, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Outlet />
    </div>
  )
}

export function AdminIndexRedirect() {
  return <Navigate to="/admin/login" replace />
}
