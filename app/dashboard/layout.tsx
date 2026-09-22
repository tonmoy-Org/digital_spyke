'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Home,
  ChevronDown,
  Menu,
  LogOut,
  Sliders,
  Workflow,
  Sparkles,
  Compass,
  Building2,
  FolderKanban,
  MessageSquareQuote,
  Briefcase,
} from 'lucide-react';
import logo from '@/public/logo/logo3.png';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHomeSubmenuOpen, setIsHomeSubmenuOpen] = useState(true);

  // Check Authentication
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (!res.ok || !data.authenticated) {
        router.push('/login');
        return;
      }

      setUser(data.user);
    } catch {
      router.push('/login');
    } finally {
      setIsAuthLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      router.push('/login');
      router.refresh();
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading Digital Spyke Admin Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-800 flex font-sans">
      {/* Left Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0a0e1a] text-gray-300 transition-all duration-300 flex flex-col shrink-0 min-h-screen shadow-xl z-20`}
      >
        {/* Brand Header with Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800/80">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <Image
              src={logo}
              alt="Digital Spyke Logo"
              width={160}
              height={42}
              priority
              className="h-8 w-auto object-contain shrink-0"
            />
          </Link>
        </div>

        {/* Sidebar Menu Navigation */}
        <nav className="p-4 space-y-2 flex-1 text-sm font-medium">
          {/* Dashboard Main Link */}
          <Link
            href="/dashboard"
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
              pathname === '/dashboard'
                ? 'bg-[#1868df] text-white font-bold shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* Home Landing Page Dropdown */}
          <div>
            <button
              onClick={() => setIsHomeSubmenuOpen(!isHomeSubmenuOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                pathname?.startsWith('/dashboard/hero-banner') ||
                pathname?.startsWith('/dashboard/our-concerns') ||
                pathname?.startsWith('/dashboard/process-steps') ||
                pathname?.startsWith('/dashboard/what-we-deliver') ||
                pathname?.startsWith('/dashboard/projects-industries') ||
                pathname?.startsWith('/dashboard/skillerszone-method') ||
                pathname?.startsWith('/dashboard/testimonials') ||
                pathname?.startsWith('/dashboard/portfolio-showcase')
                  ? 'text-white font-semibold bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Home className="w-5 h-5 shrink-0" />
                {isSidebarOpen && <span>Home Landing Page</span>}
              </div>
              {isSidebarOpen && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isHomeSubmenuOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {isSidebarOpen && isHomeSubmenuOpen && (
              <div className="pl-12 pr-4 py-2 space-y-2 text-xs">
                {/* Hero Banner Settings */}
                <Link
                  href="/dashboard/hero-banner"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/hero-banner'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Hero Banner</span>
                </Link>

                {/* Our Concerns Settings */}
                <Link
                  href="/dashboard/our-concerns"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/our-concerns'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Our Concerns</span>
                </Link>

                {/* Process Steps Settings */}
                <Link
                  href="/dashboard/process-steps"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/process-steps'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Process Steps</span>
                </Link>

                {/* What We Deliver Settings */}
                <Link
                  href="/dashboard/what-we-deliver"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/what-we-deliver'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What We Deliver</span>
                </Link>

                {/* Projects & Industries Settings */}
                <Link
                  href="/dashboard/projects-industries"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/projects-industries'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Projects & Industries</span>
                </Link>

                {/* The SkillersZone Method Settings */}
                <Link
                  href="/dashboard/skillerszone-method"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/skillerszone-method'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>SkillersZone Method</span>
                </Link>

                {/* Testimonials Settings */}
                <Link
                  href="/dashboard/testimonials"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/testimonials'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  <span>Testimonials</span>
                </Link>

                {/* Portfolio Showcase Settings */}
                <Link
                  href="/dashboard/portfolio-showcase"
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
                    pathname === '/dashboard/portfolio-showcase'
                      ? 'text-blue-400 font-bold bg-blue-500/10'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Portfolio Showcase</span>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 hover:text-slate-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-5">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {user?.name ? user.name.charAt(0) : 'A'}
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden sm:inline-block">
                  {user?.name || 'Admin User'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-xs"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-slate-800">{user?.name || 'Admin User'}</p>
                      <p className="text-gray-400 truncate">{user?.email || 'admin@digitalspyke.com'}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Child View */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
