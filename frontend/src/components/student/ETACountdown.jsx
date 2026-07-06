import { useEffect, useState } from 'react';
import { routeAPI } from '../../services/api';

export default function ETACountdown({ stopId, busId }) {
  const [eta, setEta] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!stopId || !busId) return;
    const fetchETA = () => {
      routeAPI.getETA(stopId, busId)
        .then(({ data }) => {
          setEta(data.data);
          setCountdown(data.data.countdown || data.data.etaMinutes);
        })
        .catch(() => {});
    };
    fetchETA();
    const interval = setInterval(fetchETA, 10000);
    return () => clearInterval(interval);
  }, [stopId, busId]);

  useEffect(() => {
    if (countdown == null || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 60000);
    return () => clearInterval(timer);
  }, [countdown]);

  if (!eta) return <p className="text-slate-500 text-sm">Select a stop to see ETA</p>;

  if (eta.message) return <p className="text-amber-600 text-sm">{eta.message}</p>;

  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-500">{eta.stopName}</p>
      <p className="text-3xl font-bold text-brand-600">
        {countdown <= 0 ? 'Arriving now' : `Bus arriving in ${countdown} minute${countdown !== 1 ? 's' : ''}`}
      </p>
      {eta.distanceKm != null && (
        <p className="text-sm text-slate-500">{eta.distanceKm} km away</p>
      )}
      {eta.driverStatus === 'delayed' && (
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
          Delayed
        </span>
      )}
    </div>
  );
}
