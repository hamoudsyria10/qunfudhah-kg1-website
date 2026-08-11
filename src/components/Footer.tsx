import React from 'react';
import { useApp } from '../context/AppContext';
import { Flower2, Phone, Heart, Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { platformInfo } = useApp();

  const sectionsList = [
    { title: 'الأخبار والإعلانات 📰', href: '#news' },
    { title: 'التغطيات الإعلامية 📸', href: '#coverages' },
    { title: 'معرض الصور 📸', href: '#coverages' },
    { title: 'المبادرات 🌱', href: '#initiatives' },
    { title: 'البرامج والفعاليات 🎯', href: '#initiatives' },
    { title: 'إنجازات الروضة 👩‍🏫', href: '#achievements' },
    { title: 'الشكر والتقدير ⭐', href: '#achievements' },
    { title: 'ملفات وتقارير إعلامية 📚', href: '#reports' },
    { title: 'الخطة التشغيلية 🗓️', href: '#reports' },
    { title: 'تواصل معنا 📞', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Top Callout Card */}
        <div className="bg-gradient-to-r from-rose-900/60 via-pink-900/40 to-slate-900 p-6 sm:p-8 rounded-3xl border border-rose-500/20 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0">
              <Flower2 className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">المنصة الإعلامية للروضة الأولى بالقنفذة 🌸</h3>
              <p className="text-xs text-slate-300 mt-1">تواصلكم يسعدنا ومشاركتكم تفتح آفاق التميز لأطفالنا</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="#contact"
              className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>تواصل معنا الآن</span>
            </a>
          </div>
        </div>

        {/* 10 Sections Quick Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-6 border-y border-slate-800 text-xs">
          {sectionsList.map((sec, idx) => (
            <a
              key={idx}
              href={sec.href}
              className="p-3 bg-slate-900/60 hover:bg-rose-900/30 hover:text-rose-300 text-slate-300 rounded-2xl border border-slate-800 transition font-medium flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span className="truncate">{sec.title}</span>
            </a>
          ))}
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>جميع الحقوق محفوظة © 2026</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">{platformInfo.schoolName}</span>
            <span>•</span>
            <span className="text-rose-400 font-bold">{platformInfo.region}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-800 hover:bg-rose-600 text-white rounded-xl transition flex items-center gap-1.5 text-[11px] font-bold cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>أعلى الصفحة</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
