import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bus, Play, Pause, Square, MapPin, LogOut, User, Navigation,
  Clock, AlertTriangle, Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { driverAPI } from '../../services/api';
import ThemeToggle from '../../components/ui/ThemeToggle';
import LiveMap from '../../components/map/LiveMap';

const statusOptions = [
  { value: 'on_time', label: 'On Time', color: 'bg-green-500' },
  { value: 'delayed', label: 'Delayed', color: 'bg-amber-500' },
  { value: 'breakdown', label: 'Breakdown', color: 'bg-red-500' },
  { value: 'completed', label: 'Completed', color: 'bg-slate-500' },
];

const occupancyOptions = [
  { value: 'available', label: 'Seats Available' },
  { value: 'moderate', label: 'Moderate Occupancy' },
  { value: 'full', label: 'Full' },
];

export default function DriverDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [journeyActive, setJourneyActive] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const watchIdRef = useRef(null);

  const loadDashboard = () => {
    driverAPI.getDashboard().then(({ data }) => {
      setDashboard(data.data);
      setJourneyActive(data.data.journey_status === 'in_progress');
      setSharing(data.data.is_sharing);
      if (data.data.latitude) {
        setCurrentPosition([parseFloat(data.data.latitude), parseFloat(data.data.longitude)]);
      }
    }).catch(() => {});
  };

  useEffect(() => { loadDashboard(); }, []);

  useEffect(() => {
    if (!sharing) {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, speed, heading } = pos.coords;
        setCurrentPosition([latitude, longitude]);
        driverAPI.shareLocation({
          latitude,
          longitude,
          speed: speed ? speed * 3.6 : 30,
          heading: heading || 0,
        }).catch(() => {});
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [sharing]);

  const handleStart = async () => {
    await driverAPI.startJourney();
    setJourneyActive(true);
    loadDashboard();
  };

  const handlePause = async () => {
    await driverAPI.pauseJourney();
    setSharing(false);
    setJourneyActive(false);
    loadDashboard();
  };

  const handleEnd = async () => {
    await driverAPI.endJourney();
    setSharing(false);
    setJourneyActive(false);
    loadDashboard();
  };

  const handleToggleSharing = async () => {
    const newState = !sharing;
    await driverAPI.toggleSharing(newState);
    setSharing(newState);
  };

  const handleStatusUpdate = async (driverStatus) => {
    await driverAPI.updateStatus({ driverStatus });
    loadDashboard();
  };

  const handleOccupancy = async (occupancy) => {
    await driverAPI.updateStatus({ occupancy });
    loadDashboard();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <nav className="sticky top-0 z-40 glass border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold">Driver Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-sm hidden sm:block">{user?.fullName}</span>
            <button onClick={handleLogout} className="p-2 text-red-500"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-slate-500">Driver Details</span>
            </div>
            <p className="font-bold">{dashboard.full_name}</p>
            <p className="text-sm text-slate-500">License: {dashboard.license_number}</p>
            <p className="text-sm text-slate-500">Rating: ⭐ {dashboard.rating}</p>
          </div>
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-3">
              <Bus className="w-5 h-5 text-brand-600" />
              <span className="text-sm text-slate-500">Assigned Bus</span>
            </div>
            <p className="font-bold text-xl">{dashboard.bus_number || 'None'}</p>
            <p className="text-sm text-slate-500">Capacity: {dashboard.capacity || 'N/A'}</p>
          </div>
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-500">Route</span>
            </div>
            <p className="font-bold">{dashboard.route_name || 'No route'}</p>
            <p className="text-sm text-slate-500">{dashboard.distance_km} km · {dashboard.estimated_time_min} min</p>
          </div>
        </div>

        {/* Journey Controls */}
        <div className="glass-card">
          <h2 className="font-semibold mb-4">Journey Controls</h2>
          <div className="flex flex-wrap gap-3">
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleStart} disabled={journeyActive}
              className="btn-primary bg-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50">
              <Play className="w-5 h-5" /> Start Journey
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleToggleSharing} disabled={!journeyActive}
              className={`btn-primary ${sharing ? 'bg-amber-600' : 'bg-brand-600'} disabled:opacity-50`}>
              <Navigation className="w-5 h-5" /> {sharing ? 'Sharing Location' : 'Share Live Location'}
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handlePause} disabled={!journeyActive}
              className="btn-secondary disabled:opacity-50">
              <Pause className="w-5 h-5" /> Pause Journey
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleEnd}
              className="btn-secondary text-red-600 border-red-200">
              <Square className="w-5 h-5" /> End Journey
            </motion.button>
          </div>
        </div>

        {/* Status Updates */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="w-5 h-5" /> Update Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleStatusUpdate(s.value)}
                  className={`p-3 rounded-xl text-white text-sm font-medium ${s.color} hover:opacity-90 transition-opacity`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-5 h-5" /> Occupancy</h3>
            <div className="space-y-2">
              {occupancyOptions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => handleOccupancy(o.value)}
                  className={`w-full p-3 rounded-xl text-sm font-medium border transition-all ${
                    dashboard.occupancy === o.value
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-4">Your Location</h2>
          <LiveMap
            busPosition={currentPosition}
            stops={dashboard.stops || []}
            height="350px"
          />
          {sharing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center gap-2 text-sm text-green-600"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live location sharing active
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
