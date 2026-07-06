import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bus, MapPin, Clock, Bell, Shield, Zap, Users, Route,
  ChevronRight, Phone, Mail, MapPinned
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { busAPI } from '../services/api';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ThemeToggle from '../components/ui/ThemeToggle';

const features = [
  { icon: MapPin, title: 'Real-Time Tracking', desc: 'See exactly where your campus bus is on an interactive map with live GPS updates.' },
  { icon: Clock, title: 'Smart ETA Prediction', desc: 'AI-powered arrival time estimates so you never miss your bus again.' },
  { icon: Bell, title: 'Instant Alerts', desc: 'Get notified about delays, route changes, and important transport updates.' },
  { icon: Route, title: 'Route Information', desc: 'Complete route details with all stops, distances, and estimated travel times.' },
  { icon: Shield, title: 'Secure Access', desc: 'Role-based authentication ensuring data privacy for students, drivers, and admins.' },
  { icon: Zap, title: 'Live Updates', desc: 'Socket-powered real-time communication for instant status changes.' },
];

function BusIllustration() {
  return (
    <motion.div
      animate={{ x: [0, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <div className="w-72 h-40 md:w-96 md:h-48 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl shadow-2xl shadow-brand-500/40 flex items-center justify-center">
          <Bus className="w-24 h-24 text-white" strokeWidth={1.5} />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-16">
          <div className="w-10 h-10 bg-slate-800 rounded-full border-4 border-slate-600" />
          <div className="w-10 h-10 bg-slate-800 rounded-full border-4 border-slate-600" />
        </div>
      </div>
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-8 left-0 right-0 h-2 bg-brand-300/30 rounded-full blur-sm"
      />
    </motion.div>
  );
}

export default function LandingPage() {
  const [stats, setStats] = useState({ activeBuses: 4, totalRoutes: 4, registeredStudents: 500, liveTrips: 2 });

  useEffect(() => {
    busAPI.getPublicStats()
      .then(({ data }) => setStats(data.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg">CTMS</span>
              <span className="hidden sm:block text-xs text-slate-500">University of Kashmir North Campus</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login/student" className="btn-secondary text-sm py-2 px-4 hidden sm:inline-flex">Login</Link>
            <Link to="/login/student" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTIwIDBoLTJ2MmgxdjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-100 text-sm font-medium mb-6 border border-white/20"
            >
              University of Kashmir · North Campus Transport
            </motion.span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Track Your Campus Bus in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                Real Time
              </span>
            </h1>
            <p className="text-lg text-brand-100 mb-8 max-w-lg leading-relaxed">
              Know exactly where your bus is, estimated arrival time, route details and important transport updates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login/student" className="btn-primary bg-white text-brand-700 hover:bg-brand-50 shadow-white/20">
                Get Started <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/login/student" className="btn-secondary border-white/30 text-white hover:bg-white/10">
                Track Bus <MapPin className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <BusIllustration />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-20 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Buses', value: stats.activeBuses, icon: Bus, color: 'text-brand-600' },
            { label: 'Routes', value: stats.totalRoutes, icon: Route, color: 'text-campus-green' },
            { label: 'Students', value: stats.registeredStudents, icon: Users, color: 'text-purple-600' },
            { label: 'Live Trips', value: stats.liveTrips, icon: Zap, color: 'text-amber-600' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-card text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <p className="text-3xl font-bold font-display">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need for Campus Transport
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A comprehensive platform designed for the University of Kashmir North Campus community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login portals */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-600 to-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-8">Access Your Portal</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { to: '/login/student', label: 'Student Login', desc: 'Track buses & get ETAs' },
              { to: '/login/driver', label: 'Driver Login', desc: 'Share live location' },
              { to: '/login/admin', label: 'Admin Login', desc: 'Manage transport system' },
            ].map((portal) => (
              <Link
                key={portal.to}
                to={portal.to}
                className="glass px-8 py-6 rounded-2xl hover:scale-105 transition-transform text-left min-w-[200px]"
              >
                <p className="font-semibold text-brand-700 dark:text-brand-300">{portal.label}</p>
                <p className="text-sm text-slate-500 mt-1">{portal.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">CTMS</span>
            </div>
            <p className="text-sm leading-relaxed">
              Campus Transport Management System for University of Kashmir North Campus, Baramulla.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> transport@uoknorth.edu.in</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91-1954-XXX-XXX</p>
              <p className="flex items-center gap-2"><MapPinned className="w-4 h-4" /> North Campus, Baramulla, J&K</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Emergency</h4>
            <p className="text-sm mb-2">Transport Emergency Hotline</p>
            <a href="tel:+919900000000" className="text-brand-400 font-semibold text-lg">+91-9900000000</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          © {new Date().getFullYear()} University of Kashmir North Campus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
