import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { notificationAPI } from '../../services/api';
import { onAnnouncement } from '../../services/socket';

export default function NotificationBell() {
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationAPI.getUnread().then(({ data }) => setUnread(data.data.count)).catch(() => {});
    notificationAPI.getAll().then(({ data }) => setNotifications(data.data.slice(0, 10))).catch(() => {});

    const unsub = onAnnouncement(() => {
      setUnread((u) => u + 1);
      notificationAPI.getAll().then(({ data }) => setNotifications(data.data.slice(0, 10))).catch(() => {});
    });
    return unsub;
  }, []);

  const markAllRead = async () => {
    await notificationAPI.markAllRead();
    setUnread(0);
    setNotifications((n) => n.map((x) => ({ ...x, is_read: true })));
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl glass"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </motion.button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute right-0 mt-2 w-80 glass rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-700/50">
            <h3 className="font-semibold">Notifications</h3>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-brand-600 hover:underline">Mark all read</button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-slate-500 text-center">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 border-b border-slate-100 dark:border-slate-800 ${!n.is_read ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''}`}
                >
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
