import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Bus, Route, MapPin, Bell, BarChart3, Settings,
  LogOut, Menu, X, Plus, Trash2, Edit, Download, AlertTriangle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI, announcementAPI, busAPI, routeAPI } from '../../services/api';
import ThemeToggle from '../../components/ui/ThemeToggle';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import LiveMap from '../../components/map/LiveMap';
import { TableSkeleton } from '../../components/ui/LoadingSkeleton';

const sidebarLinks = [
  { to: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: 'students', icon: Users, label: 'Manage Students' },
  { to: 'drivers', icon: Users, label: 'Manage Drivers' },
  { to: 'buses', icon: Bus, label: 'Manage Buses' },
  { to: 'routes', icon: Route, label: 'Manage Routes' },
  { to: 'tracking', icon: MapPin, label: 'Live Tracking' },
  { to: 'announcements', icon: Bell, label: 'Announcements' },
  { to: 'reports', icon: BarChart3, label: 'Reports' },
  { to: 'settings', icon: Settings, label: 'Settings' },
];

const COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626'];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [liveBuses, setLiveBuses] = useState([]);
  const [reports, setReports] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadDashboard();
  }, [activeTab]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const { data } = await adminAPI.getStats();
        setStats(data.data);
      } else if (activeTab === 'students') {
        const { data } = await adminAPI.getStudents();
        setStudents(data.data);
      } else if (activeTab === 'drivers') {
        const { data } = await adminAPI.getDrivers();
        setDrivers(data.data);
      } else if (activeTab === 'buses') {
        const { data } = await busAPI.getAll();
        setBuses(data.data);
      } else if (activeTab === 'routes') {
        const { data } = await routeAPI.getAll();
        setRoutes(data.data);
      } else if (activeTab === 'announcements') {
        const { data } = await announcementAPI.getAll();
        setAnnouncements(data.data);
      } else if (activeTab === 'tracking') {
        const { data } = await adminAPI.getLive();
        setLiveBuses(data.data);
      } else if (activeTab === 'reports') {
        const { data } = await adminAPI.getReports({ type: 'audit' });
        setReports(data.data);
      } else if (activeTab === 'settings') {
        const { data } = await adminAPI.getSettings();
        setSettings(data.data);
      }
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleCreate = async () => {
    try {
      if (modal === 'bus') {
        await adminAPI.createBus({
          busNumber: formData.busNumber,
          capacity: parseInt(formData.capacity),
          routeId: formData.routeId ? parseInt(formData.routeId) : null,
          driverId: formData.driverId ? parseInt(formData.driverId) : null,
        });
      } else if (modal === 'route') {
        await adminAPI.createRoute({
          name: formData.name,
          distanceKm: parseFloat(formData.distanceKm),
          estimatedTimeMin: parseInt(formData.estimatedTimeMin),
          startPoint: formData.startPoint,
          endPoint: formData.endPoint,
        });
      } else if (modal === 'announcement') {
        await announcementAPI.create({
          title: formData.title,
          message: formData.message,
          type: formData.type || 'general',
          priority: formData.priority || 'medium',
        });
      } else if (modal === 'student') {
        await adminAPI.createStudent(formData);
      } else if (modal === 'driver') {
        await adminAPI.createDriver(formData);
      }
      setModal(null);
      setFormData({});
      loadDashboard();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure?')) return;
    try {
      if (type === 'bus') await adminAPI.deleteBus(id);
      else if (type === 'route') await adminAPI.deleteRoute(id);
      else if (type === 'announcement') await announcementAPI.delete(id);
      else if (type === 'student') await adminAPI.deleteStudent(id);
      else if (type === 'driver') await adminAPI.deleteDriver(id);
      loadDashboard();
    } catch { alert('Delete failed'); }
  };

  const downloadReport = () => {
    const csv = reports.map((r) =>
      `${r.created_at},${r.admin_name || ''},${r.action},${r.table_name},${r.record_id}`
    ).join('\n');
    const blob = new Blob([`Date,Admin,Action,Table,Record\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ctms-audit-report.csv';
    a.click();
  };

  const renderContent = () => {
    if (loading) return <TableSkeleton rows={6} />;

    switch (activeTab) {
      case 'dashboard':
        return stats && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: stats.totalStudents, color: 'text-brand-600' },
                { label: 'Total Drivers', value: stats.totalDrivers, color: 'text-emerald-600' },
                { label: 'Active Buses', value: stats.activeBuses, color: 'text-purple-600' },
                { label: 'Delayed Buses', value: stats.delayedBuses, color: 'text-amber-600' },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <p className="text-sm text-slate-500">{s.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${s.color}`}>
                    <AnimatedCounter value={s.value} />
                  </p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-card">
                <h3 className="font-semibold mb-4">Daily Usage</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={stats.dailyUsage?.length ? stats.dailyUsage : [{ date: 'Mon', logins: 0 }]}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="logins" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="glass-card">
                <h3 className="font-semibold mb-4">Route Statistics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stats.routeStats || []}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="bus_count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card">
              <h3 className="font-semibold mb-4">Bus Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.busPerformance?.slice(0, 5) || []}
                    dataKey="total_trips"
                    nameKey="bus_number"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ bus_number }) => bus_number}
                  >
                    {(stats.busPerformance || []).slice(0, 5).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'students':
        return (
          <DataTable
            title="Students"
            onAdd={() => { setModal('student'); setFormData({}); }}
            columns={['Name', 'Email', 'Student ID', 'Department', 'Status', 'Actions']}
            rows={students.map((s) => [
              s.full_name, s.email, s.student_id, s.department,
              s.is_active ? 'Active' : 'Inactive',
              <button key={s.id} onClick={() => handleDelete('student', s.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>,
            ])}
          />
        );

      case 'drivers':
        return (
          <DataTable
            title="Drivers"
            onAdd={() => { setModal('driver'); setFormData({}); }}
            columns={['Name', 'Email', 'License', 'Rating', 'Bus', 'Actions']}
            rows={drivers.map((d) => [
              d.full_name, d.email, d.license_number, d.rating, d.bus_number || 'None',
              <button key={d.id} onClick={() => handleDelete('driver', d.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>,
            ])}
          />
        );

      case 'buses':
        return (
          <DataTable
            title="Buses"
            onAdd={() => { setModal('bus'); setFormData({}); }}
            columns={['Number', 'Capacity', 'Route', 'Driver', 'Status', 'Actions']}
            rows={buses.map((b) => [
              b.bus_number, b.capacity, b.route_name || '-', b.driver_name || '-', b.status,
              <button key={b.id} onClick={() => handleDelete('bus', b.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>,
            ])}
          />
        );

      case 'routes':
        return (
          <DataTable
            title="Routes"
            onAdd={() => { setModal('route'); setFormData({}); }}
            columns={['Name', 'Distance', 'Time', 'Stops', 'Actions']}
            rows={routes.map((r) => [
              r.name, `${r.distance_km} km`, `${r.estimated_time_min} min`, r.stop_count,
              <button key={r.id} onClick={() => handleDelete('route', r.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>,
            ])}
          />
        );

      case 'tracking':
        return (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Live Bus Tracking</h2>
            <LiveMap
              busPosition={liveBuses.find((b) => b.latitude)?.latitude ? [
                parseFloat(liveBuses.find((b) => b.latitude).latitude),
                parseFloat(liveBuses.find((b) => b.latitude).longitude),
              ] : null}
              height="400px"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {liveBuses.map((b) => (
                <div key={b.id} className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{b.bus_number}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${b.is_sharing ? 'bg-green-100 text-green-700' : 'bg-slate-100'}`}>
                      {b.is_sharing ? 'Live' : 'Offline'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{b.driver_name} · {b.route_name}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'announcements':
        return (
          <DataTable
            title="Announcements"
            onAdd={() => { setModal('announcement'); setFormData({}); }}
            columns={['Title', 'Type', 'Priority', 'Date', 'Actions']}
            rows={announcements.map((a) => [
              a.title, a.type, a.priority, new Date(a.created_at).toLocaleDateString(),
              <button key={a.id} onClick={() => handleDelete('announcement', a.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>,
            ])}
          />
        );

      case 'reports':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Audit Trail</h2>
              <button onClick={downloadReport} className="btn-secondary text-sm py-2">
                <Download className="w-4 h-4" /> Download CSV
              </button>
            </div>
            <div className="glass-card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    {['Date', 'Admin', 'Action', 'Table', 'Record'].map((h) => (
                      <th key={h} className="text-left p-3 font-medium text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
                      <td className="p-3">{r.admin_name}</td>
                      <td className="p-3">{r.action}</td>
                      <td className="p-3">{r.table_name}</td>
                      <td className="p-3">{r.record_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'settings':
        return settings && (
          <div className="glass-card max-w-lg space-y-4">
            <h2 className="font-semibold text-lg">System Settings</h2>
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const modalFields = {
    bus: [
      { key: 'busNumber', label: 'Bus Number', type: 'text' },
      { key: 'capacity', label: 'Capacity', type: 'number' },
      { key: 'routeId', label: 'Route ID', type: 'number' },
      { key: 'driverId', label: 'Driver ID', type: 'number' },
    ],
    route: [
      { key: 'name', label: 'Route Name', type: 'text' },
      { key: 'distanceKm', label: 'Distance (km)', type: 'number' },
      { key: 'estimatedTimeMin', label: 'Est. Time (min)', type: 'number' },
      { key: 'startPoint', label: 'Start Point', type: 'text' },
      { key: 'endPoint', label: 'End Point', type: 'text' },
    ],
    announcement: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
      { key: 'type', label: 'Type', type: 'select', options: ['general', 'delay', 'route_change', 'driver_change', 'holiday', 'emergency'] },
      { key: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high', 'critical'] },
    ],
    student: [
      { key: 'fullName', label: 'Full Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'password', label: 'Password', type: 'password' },
      { key: 'studentId', label: 'Student ID', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'semester', label: 'Semester', type: 'number' },
    ],
    driver: [
      { key: 'fullName', label: 'Full Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'password', label: 'Password', type: 'password' },
      { key: 'licenseNumber', label: 'License Number', type: 'text' },
      { key: 'experienceYears', label: 'Experience (years)', type: 'number' },
    ],
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 glass border-r transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <Bus className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-sm">CTMS Admin</span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.to}
              onClick={() => { setActiveTab(link.to); setSidebarOpen(false); }}
              className={`sidebar-link w-full ${activeTab === link.to ? 'sidebar-link-active' : ''}`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <button onClick={handleLogout} className="sidebar-link w-full text-red-500">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            <h1 className="font-semibold capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-sm hidden sm:block">{user?.fullName}</span>
          </div>
        </header>
        <main className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-lg mb-4 capitalize">Create {modal}</h3>
            <div className="space-y-3">
              {(modalFields[modal] || []).map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-1">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="input-field"
                      rows={3}
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      className="input-field"
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    >
                      <option value="">Select...</option>
                      {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="input-field"
                      value={formData[field.key] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleCreate} className="btn-primary flex-1">Create</button>
              <button onClick={() => setModal(null)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function DataTable({ title, columns, rows, onAdd }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{title}</h2>
        <button onClick={onAdd} className="btn-primary text-sm py-2">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              {columns.map((c) => (
                <th key={c} className="text-left p-3 font-medium text-slate-500">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="p-8 text-center text-slate-500">No data</td></tr>
            ) : rows.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                {row.map((cell, j) => (
                  <td key={j} className="p-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
