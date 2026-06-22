'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  LayoutDashboard,
  Globe,
  Trophy,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

import XPBar from '@/components/gamification/XPBar';
import StreakCounter from '@/components/gamification/StreakCounter';
import CoinDisplay from '@/components/gamification/CoinDisplay';

// ── Nav links ────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/explore', label: 'Explore', icon: Globe },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
] as const;

// ── Theme Toggle ─────────────────────────────────────────────
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('learnverse-theme', next ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggle}
      className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ── Navbar ───────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for shadow intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center px-4 lg:px-6 transition-shadow duration-300 ${
          scrolled
            ? 'shadow-lg shadow-black/20'
            : 'shadow-sm shadow-black/5'
        } backdrop-blur-xl bg-white/10 dark:bg-gray-900/40 border-b border-white/10`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* ── Left: Logo ──────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-6">
          <motion.div
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-purple-500/25"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          >
            <Compass className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:block tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            LearnVerse
          </span>
        </Link>

        {/* ── Center: Nav Links (Desktop) ─────────────────── */}
        <div className="hidden md:flex items-center gap-1 mx-auto">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>

                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                      layoutId="navbar-active-underline"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* ── Right: Gamification Widgets + Theme (Desktop) ─ */}
        <div className="hidden lg:flex items-center gap-3 ml-auto shrink-0">
          <XPBar compact />
          <div className="w-px h-6 bg-white/10" />
          <StreakCounter compact />
          <div className="w-px h-6 bg-white/10" />
          <CoinDisplay compact />
          <div className="w-px h-6 bg-white/10" />
          <ThemeToggle />
        </div>

        {/* ── Right: Theme + Hamburger (Mobile / Tablet) ──── */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <ThemeToggle />
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5 text-gray-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5 text-gray-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-16 right-0 bottom-0 z-30 w-72 lg:hidden backdrop-blur-xl bg-gray-900/90 border-l border-white/10 shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col p-4 gap-2">
                {/* Nav links */}
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/20'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divider */}
                <div className="h-px bg-white/10 my-2" />

                {/* Gamification widgets (mobile) */}
                <motion.div
                  className="flex flex-col gap-3 px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-gray-500 font-medium">XP</span>
                    <XPBar compact />
                  </div>
                  <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-gray-500 font-medium">Streak</span>
                    <StreakCounter compact />
                  </div>
                  <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-gray-500 font-medium">Coins</span>
                    <CoinDisplay compact />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content going under fixed navbar */}
      <div className="h-16" />
    </>
  );
}
