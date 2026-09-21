import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiLoader } from 'react-icons/fi';
import { login, clearError, checkAuth } from '../store/authSlice';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Verify authentication with backend using cookie on page load
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(13,109,99,0.16),transparent_28%),linear-gradient(135deg,#0F172A_0%,#1E293B_35%,#F8FAFC_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0D6D63] shadow-[0_18px_40px_rgba(13,109,99,0.3)] mb-4">
            <FiMail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">DCintelix</h1>
          <p className="text-slate-300 text-sm mt-1">Admin Portal</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50 shadow-[0_25px_60px_rgba(15,23,42,0.18)] p-6 md:p-7">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4 text-center">
            Welcome back
          </h2>

          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#475569] mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 text-sm border border-[#D9E1E7] rounded-xl bg-white text-[#0F172A] focus:ring-2 focus:ring-[#0D6D63] focus:border-[#0D6D63] transition-colors outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[#475569] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 text-sm border border-[#D9E1E7] rounded-xl bg-white text-[#0F172A] focus:ring-2 focus:ring-[#0D6D63] focus:border-[#0D6D63] transition-colors outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0D6D63] hover:bg-[#0b5c53] text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-[#0D6D63]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <FiLogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              Need an account?{' '}
              <Link
                to="/admin/register"
                className="text-[#0D6D63] hover:text-[#0b5c53] font-medium"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-3 text-center">
            <a
              href="/"
              className="text-xs text-slate-500 hover:text-[#0D6D63] transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>

        <p className="text-center text-slate-300 text-xs mt-6">
          © {new Date().getFullYear()} DCintelix
        </p>
      </div>
    </div>
  );
}
