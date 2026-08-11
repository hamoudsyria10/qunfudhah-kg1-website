import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Phone, Flower2, Sparkles, Search, Newspaper, Image, Compass, Award, FileText, Calendar, Target } from 'lucide-react';

export const Header: React.FC = () => {
  const { viewMode, setViewMode, platformInfo, searchQuery, setSearchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'news', label: 'الأخبار الإعلانات', href: '#news', icon: Newspaper },
    { id: 'coverages', label: 'التغطيات والمعرض', href: '#coverages', icon: Image },
    { id: 'initiatives', label: 'المبادرات والبرامج', href: '#initiatives', icon: Compass },
    { id: 'achievements', label: 'الإنجازات والشكر', href: '#achievements', icon: Award },
    { id: 'reports', label: 'التقارير والخطة', href: '#reports', icon: FileText },
    { id: 'contact', label: 'تواصل معنا', href: '#contact', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white text-xs py-1.5 px-4 text-center font-medium">
        <div className="container mx-auto flex items-center justify-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-0.5 bg-white/20 rounded-full text-[11px] font-bold">
              إدارة التعليم بمحافظة القنفذة
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">أهلاً بكم في المنصة الإعلامية الرسمية للروضة الأولى بالقنفذة 🌸</span>
          </div>
          <span className="text-[11px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full hidden md:inline-block">
            الروضة الأولى بالقنفذة ✨
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Right Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl shadow-xs">
              🌸
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                  المنصة الإعلامية <span className="text-teal-600 font-bold">🌸</span>
                </h1>
              </div>
              <p className="text-[11px] font-bold text-teal-600">
                الروضة الأولى بالقنفذة
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث في الأخبار والفعاليات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-rose-400 focus:outline-none rounded-xl transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition flex items-center gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-teal-600" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2 pb-2">
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث بالمنصة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-9 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl"
              />
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-rose-500" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
