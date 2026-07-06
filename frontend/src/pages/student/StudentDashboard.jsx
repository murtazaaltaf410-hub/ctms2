import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bus, Clock, MapPin, Bell, LogOut, User, Star, Phone, Search, QrCode, Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { busAPI, routeAPI, announcementAPI } from '../../services/api';
import { subscribeToBus, onAnnouncement } from '../../services/socket';
import LiveMap from '../../components/map/LiveMap';
import ETACountdown from '../../components/student/ETACountdown';
import NotificationBell from '../../components/ui/NotificationBell';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { CardSkeleton } from '../../components/ui/LoadingSkeleton';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [busDetail, setBusDetail] = useState(null);
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [latestNotice, setLatestNotice] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [busPosition, setBusPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Promise.all([
      busAPI.getAll(),
      announcementAPI.getLatest(),
      announcementAPI.getAll(),
    ]).then(([busesRes, noticeRes, annRes]) => {
      setBuses(busesRes.data.data);
      setLatestNotice(noticeRes.data.data);
      setAnnouncements(annRes.data.data.slice(0, 5));
    }).finally(() => setLoading(false));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
        () => {}
      );
    }

    const unsub = onAnnouncement((ann) => {
      setAnnouncements((prev) => [ann, ...prev.slice(0, 4)]);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!selectedBus) return;
    busAPI.getById(selectedBus).then(({ data }) => {
      setBusDetail(data.data);
      setStops(data.data.stops || []);
      if (data.data.latitude && data.data.longitude) {
        setBusPosition([parseFloat(data.data.latitude), parseFloat(data.data.longitude)]);
      }
    });

    const unsub = subscribeToBus(selectedBus, (data) => {
      if (data.latitude && data.longitude) {
        setBusPosition([parseFloat(data.latitude), parseFloat(data.longitude)]);
      }
    });
    return unsub;
  }, [selectedBus]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleFavorite = async () => {
    if (selectedBus) {
      await busAPI.setFavorite(selectedBus);
    }
  };

  const filteredBuses = searchQuery
    ? buses.filter((b) => b.bus_number.toLowerCase().includes(searchQuery.toLowerCase()))
    : buses;

  const statusColor = {
    on_time: 'text-green-600 bg-green-100',
    delayed: 'text-amber-600 bg-amber-100',
    breakdown: 'text-red-600 bg-red-100',
    completed: 'text-slate-600 bg-slate-100',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 glass border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold hidden sm:block">CTMS Student</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-brand-600" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{user?.fullName}</span>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Dashboard Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg"><Bus className="w-5 h-5 text-brand-600" /></div>
                  <span className="text-sm text-slate-500">Current Bus Status</span>
                </div>
                <p className="text-xl font-bold capitalize">{busDetail?.driver_status || busDetail?.status || 'Select a bus'}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg"><Clock className="w-5 h-5 text-amber-600" /></div>
                  <span className="text-sm text-slate-500">ETA To Campus</span>
                </div>
                {selectedStop && selectedBus ? (
                  <ETACountdown stopId={selectedStop} busId={selectedBus} />
                ) : (
                  <p className="text-xl font-bold text-slate-400">--</p>
                )}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg"><MapPin className="w-5 h-5 text-green-600" /></div>
                  <span className="text-sm text-slate-500">Route Information</span>
                </div>
                <p className="text-lg font-bold">{busDetail?.route_name || 'No route selected'}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg"><Bell className="w-5 h-5 text-purple-600" /></div>
                  <span className="text-sm text-slate-500">Latest Notice</span>
                </div>
                <p className="text-sm font-medium line-clamp-2">{latestNotice?.title || 'No notices'}</p>
              </motion.div>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bus Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Search className="w-5 h-5" /> Select Bus</h2>
              <input
                type="text"
                placeholder="Search bus number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field mb-4"
              />
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredBuses.map((bus) => (
                  <motion.button
                    key={bus.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBus(bus.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedBus === bus.id
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{bus.bus_number}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColor[bus.driver_status] || 'bg-slate-100'}`}>
                        {bus.driver_status || bus.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{bus.route_name || 'No route'}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {busDetail && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Bus Details</h3>
                  <button onClick={handleFavorite} className="p-2 hover:bg-red-50 rounded-lg"><Heart className="w-4 h-4 text-red-500" /></button>
                </div>
                {[
                  ['Bus Number', busDetail.bus_number],
                  ['Driver', busDetail.driver_name || 'Unassigned'],
                  ['Route', busDetail.route_name || 'N/A'],
                  ['Status', busDetail.driver_status || busDetail.status],
                  ['Occupancy', busDetail.occupancy || 'N/A'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium capitalize">{value}</span>
                  </div>
                ))}
                {busDetail.qr_code && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t">
                    <QrCode className="w-4 h-4" /> {busDetail.qr_code}
                  </div>
                )}
              </motion.div>
            )}

            {stops.length > 0 && (
              <div className="glass-card">
                <h3 className="font-semibold mb-3">Select Your Stop</h3>
                <select
                  value={selectedStop || ''}
                  onChange={(e) => setSelectedStop(e.target.value)}
                  className="input-field"
                >
                  <option value="">Choose a stop...</option>
                  {stops.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}

            <a href="tel:+919900000000" className="glass-card flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <Phone className="w-5 h-5" />
              <div>
                <p className="font-semibold text-sm">Emergency Contact</p>
                <p className="text-xs text-slate-500">Transport Hotline</p>
              </div>
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-600" /> Live Map Tracking</h2>
              <LiveMap
                busPosition={busPosition}
                userPosition={userPosition}
                stops={stops}
                height="450px"
              />
            </div>

            {/* Announcements */}
            <div className="glass-card">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" /> Announcements
                {announcements.length > 0 && (
                  <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{announcements.length}</span>
                )}
              </h2>
              <div className="space-y-3">
                {announcements.map((ann, i) => (
                  <motion.div
                    key={ann.id || i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      ann.priority === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/10' :
                      ann.priority === 'high' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10' :
                      'border-brand-500 bg-brand-50 dark:bg-brand-900/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{ann.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{ann.message}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 capitalize">{ann.type || 'general'}</span>
                    </div>
                  </motion.div>
                ))}
                {announcements.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No announcements</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
