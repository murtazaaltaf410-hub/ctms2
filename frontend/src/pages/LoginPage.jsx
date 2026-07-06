import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bus, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import ThemeToggle from '../components/ui/ThemeToggle';

const roleConfig = {
  student: {
    title: 'Student Login',
    subtitle: 'Track your campus bus in real time',
    redirect: '/student',
    color: 'from-brand-600 to-indigo-700',
  },
  driver: {
    title: 'Driver Login',
    subtitle: 'Manage your journey and share location',
    redirect: '/driver',
    color: 'from-emerald-600 to-teal-700',
  },
  admin: {
    title: 'Admin Login',
    subtitle: 'Manage campus transport system',
    redirect: '/admin',
    color: 'from-slate-700 to-slate-900',
  },
};

export default function LoginPage() {
  const { role = 'student' } = useParams();
  const config = roleConfig[role] || roleConfig.student;
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password, role, remember);
      navigate(config.redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.forgotPassword(email);
      setForgotMsg(data.message);
    } catch {
      setForgotMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className={`hidden lg:flex lg:w-1/2 bg-gradient-to-br ${config.color} items-center justify-center p-12 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTIwIDBoLTJ2MmgxdjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center text-white"
        >
          <Bus className="w-24 h-24 mx-auto mb-6 opacity-90" />
          <h2 className="font-display text-3xl font-bold mb-3">CTMS</h2>
          <p className="text-white/80 max-w-sm">University of Kashmir North Campus Transport Management</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold">{config.title}</h1>
            <p className="text-slate-500 mt-1">{config.subtitle}</p>
          </div>

          {forgotMode ? (
            <form onSubmit={handleForgot} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
              </div>
              {forgotMsg && <p className="text-sm text-green-600">{forgotMsg}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => setForgotMode(false)} className="text-sm text-brand-600 hover:underline w-full text-center">
                Back to login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder={`${role}@uoknorth.edu.in`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded" />
                  Remember me
                </label>
                <button type="button" onClick={() => setForgotMode(true)} className="text-sm text-brand-600 hover:underline">
                  Forgot password?
                </button>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                  {error}
                </motion.p>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-500">
            {role !== 'student' && <Link to="/login/student" className="text-brand-600 hover:underline mr-4">Student</Link>}
            {role !== 'driver' && <Link to="/login/driver" className="text-brand-600 hover:underline mr-4">Driver</Link>}
            {role !== 'admin' && <Link to="/login/admin" className="text-brand-600 hover:underline">Admin</Link>}
          </div>

          {role === 'student' && (
            <p className="mt-4 text-xs text-center text-slate-400">
              Demo: student1@uoknorth.edu.in / Password@123
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
