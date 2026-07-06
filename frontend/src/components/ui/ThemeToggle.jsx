import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const { dark, toggle } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className={`p-2.5 rounded-xl glass hover:bg-white/90 dark:hover:bg-slate-800/90 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
    </motion.button>
  );
}
