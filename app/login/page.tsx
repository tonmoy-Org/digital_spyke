'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, AlertCircle, CheckCircle2, Database } from 'lucide-react';
import logo from '@/public/logo/logo3.png';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fillDemoCredentials = () => {
    setEmail('admin@digitalspyke.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Trigger seed endpoint first if needed to ensure admin user exists
      await fetch('/api/auth/seed', { method: 'POST' }).catch(() => {});

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      setSuccessMessage('Login successful! Redirecting to admin dashboard...');

      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 800);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#091021] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0DCCD7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#0D152A]/85 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Digital Spyke Logo"
              width={200}
              height={55}
              priority
              className="h-12 w-auto object-contain drop-shadow-md"
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">
            Admin Portal Sign In
          </h1>
          <p className="text-xs text-gray-400">
            Access your MongoDB database, leads & management hub
          </p>
        </div>

        {/* Demo Quick Fill Banner */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={fillDemoCredentials}
          className="mb-6 p-3 bg-[#0DCCD7]/10 border border-[#0DCCD7]/30 rounded-2xl cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#0DCCD7] group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <p className="text-xs font-semibold text-[#0DCCD7]">Quick Admin Demo Login</p>
              <p className="text-[11px] text-gray-400">Click to autofill credentials</p>
            </div>
          </div>
          <span className="text-xs font-medium text-white/90 bg-[#0DCCD7]/20 px-2.5 py-1 rounded-lg border border-[#0DCCD7]/30">
            Auto Fill
          </span>
        </motion.div>

        {/* Alert Messages */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-400 text-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-xs"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digitalspyke.com"
                className="w-full pl-10 pr-4 py-3 bg-[#091021] border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0DCCD7] focus:ring-1 focus:ring-[#0DCCD7] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#091021] border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0DCCD7] focus:ring-1 focus:ring-[#0DCCD7] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-800 bg-[#091021] text-[#0DCCD7] focus:ring-[#0DCCD7]"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0DCCD7] to-cyan-500 hover:from-cyan-400 hover:to-[#0DCCD7] text-slate-950 font-bold rounded-xl shadow-lg shadow-[#0DCCD7]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Database Status Indicator */}
        <div className="mt-8 pt-6 border-t border-gray-800/80 flex items-center justify-center text-xs text-gray-400 gap-2">
          <Database className="w-4 h-4 text-[#0DCCD7]" />
          <span>MongoDB Database Protected System</span>
        </div>
      </motion.div>
    </div>
  );
}
