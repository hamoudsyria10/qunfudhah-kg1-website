/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/public/HeroSection';
import { PublicNewsSection } from './components/public/PublicNewsSection';
import { PublicMediaSection } from './components/public/PublicMediaSection';
import { PublicInitiativesEvents } from './components/public/PublicInitiativesEvents';
import { PublicAchievementsAppreciation } from './components/public/PublicAchievementsAppreciation';
import { PublicReportsOperational } from './components/public/PublicReportsOperational';
import { PublicContact } from './components/public/PublicContact';
import { Footer } from './components/Footer';
import { PublicItemDetailModal } from './components/public/PublicItemDetailModal';

import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminDashboardHome } from './components/admin/AdminDashboardHome';
import { AdminCMSManager } from './components/admin/AdminCMSManager';
import { AdminLoginScreen } from './components/admin/AdminLoginScreen';
import { ToastNotification } from './components/ToastNotification';

const AppContent: React.FC = () => {
  const { viewMode, activeAdminTab, isAuthenticated } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-rose-100 selection:text-rose-700">
      
      {viewMode === 'public' ? (
        /* FRONT-END PUBLIC PORTAL (الواجهة العامة للزوار) */
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <HeroSection />
            <PublicNewsSection />
            <PublicMediaSection />
            <PublicInitiativesEvents />
            <PublicAchievementsAppreciation />
            <PublicReportsOperational />
            <PublicContact />
          </main>
          <Footer />
        </div>
      ) : !isAuthenticated ? (
        /* ADMIN LOGIN SCREEN (صفحة تسجيل الدخول) */
        <AdminLoginScreen />
      ) : (
        /* ADMIN DASHBOARD (لوحة تحكم المشرف الإدارية) */
        <div className="flex-1 flex min-h-screen bg-slate-100">
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 flex flex-col lg:mr-72 transition-all">
            <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {activeAdminTab === 'overview' ? (
                <AdminDashboardHome />
              ) : (
                <AdminCMSManager />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global Modals & Notifications */}
      <PublicItemDetailModal />
      <ToastNotification />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
