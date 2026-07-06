import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const busIcon = new L.DivIcon({
  html: `<div style="background:#2563eb;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-size:18px;">🚌</div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const stopIcon = new L.DivIcon({
  html: `<div style="background:#059669;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.2);"></div>`,
  className: '',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const userIcon = new L.DivIcon({
  html: `<div style="background:#3b82f6;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 6px rgba(59,130,246,0.3);"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom || map.getZoom());
  }, [center, zoom, map]);
  return null;
}

function AnimatedBusMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true, duration: 1 });
    }
  }, [position, map]);
  if (!position) return null;
  return (
    <Marker position={position} icon={busIcon}>
      <Popup>Live Bus Location</Popup>
    </Marker>
  );
}

export default function LiveMap({
  busPosition,
  userPosition,
  stops = [],
  routePath = [],
  center = [34.235, 74.31],
  zoom = 13,
  height = '400px',
}) {
  const pathCoords = routePath.length > 0
    ? routePath
    : stops.map((s) => [parseFloat(s.latitude), parseFloat(s.longitude)]);

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={busPosition || center} zoom={zoom} />

        {pathCoords.length > 1 && (
          <Polyline positions={pathCoords} color="#2563eb" weight={4} opacity={0.7} dashArray="10, 10" />
        )}

        {stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}
            icon={stopIcon}
          >
            <Popup>
              <strong>{stop.name}</strong>
              {stop.estimated_arrival_offset_min != null && (
                <p className="text-sm mt-1">~{stop.estimated_arrival_offset_min} min from start</p>
              )}
            </Popup>
          </Marker>
        ))}

        <AnimatedBusMarker position={busPosition} />

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
