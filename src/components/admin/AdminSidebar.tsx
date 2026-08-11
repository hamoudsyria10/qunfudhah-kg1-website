import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab } from '../../types';
import {
  LayoutDashboard,
  Newspaper,
  Camera,
  Image as ImageIcon,
  Sprout,
  Target,
  Award,
  Star,
  FileText,
  Calendar,
  MessageSquare,
  Globe,
  Flower2,
  ChevronLeft,
  Settings,
  LogOut,
  Phone,
  Sparkles
} from 'lucide-react';

export const AdminSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activeAdminTab, setActiveAdminTab, setViewMode, contactMessages, newsList, logout, adminCreds } = useApp();

  const unreadMessagesCount = contactMessages.filter((m) => !m.isRead).length;

  const menuItems: { id: AdminTab; label: string; icon: any; badge?: number; color: string }[] = [
    { id: 'overview', label: 'لوحة التحكم الرئيسية', icon: LayoutDashboard, color: 'text-teal-600' },
    { id: 'hero_settings', label: 'إدارة الواجهة والإحصائيات 🎨', icon: Sparkles, color: 'text-amber-500' },
    { id: 'news', label: 'الأخبار والإعلانات 📰', icon: Newspaper, badge: newsList.length, color: 'text-teal-600' },
    { id: 'coverages', label: 'التغطيات الإعلامية 📸', icon: Camera, color: 'text-amber-500' },
    { id: 'gallery', label: 'معرض الصور 📸', icon: ImageIcon, color: 'text-indigo-500' },
    { id: 'initiatives', label: 'المبادرات 🌱', icon: Sprout, color: 'text-emerald-500' },
    { id: 'programs', label: 'البرامج والفعاليات 🎯', icon: Target, color: 'text-sky-500' },
    { id: 'achievements', label: 'إنجازات الروضة 👩‍🏫', icon: Award, color: 'text-amber-600' },
    { id: 'appreciation', label: 'الشكر والتقدير ⭐', icon: Star, color: 'text-pink-500' },
    { id: 'reports', label: 'ملفات وتقارير إعلامية 📚', icon: FileText, color: 'text-teal-600' },
    { id: 'operational', label: 'الخطة التشغيلية 🗓️', icon: Calendar, color: 'text-blue-600' },
    { id: 'contact_messages', label: 'تواصل معنا (الرسائل) 📞', icon: MessageSquare, badge: unreadMessagesCount, color: 'text-rose-500' },
    { id: 'contact_settings', label: 'إدارة معلومات التواصل 📞', icon: Phone, color: 'text-emerald-600' },
    { id: 'settings', label: 'إعدادات الحساب والأمان 🔐', icon: Settings, color: 'text-slate-600' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer - Bento Grid Style */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-64 bg-white border-l border-slate-200 text-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-sm ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white text-xl shadow-xs">
              🌸
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-tight">المنصة الإعلامية</h2>
              <p className="text-[10px] text-teal-600 font-bold">الروضة الأولى بالقنفذة</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            الرئيسية
          </div>

          {menuItems.slice(0, 1).map((item) => {
            const Icon = item.icon;
            const isActive = activeAdminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveAdminTab(item.id);
                  onClose();
                }}
                className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-teal-600'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
              </button>
            );
          })}

          <div className="mt-4 px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            إدارة الأقسام
          </div>

          <div className="grid grid-cols-1 gap-1">
            {menuItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminTab(item.id);
                    onClose();
                  }}
                  className={`w-full px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-teal-600 text-white' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer / Public Link */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => setViewMode('public')}
            className="w-full py-2 bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>معاينة الواجهة العامة 🌸</span>
          </button>

          <div className="flex items-center justify-between gap-2 mt-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 truncate">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs shrink-0">
                🌸
              </div>
              <div className="text-xs truncate">
                <p className="font-bold text-slate-800 truncate">{adminCreds.username}</p>
                <p className="text-[10px] text-teal-600 font-bold truncate">مشرف النظام</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition cursor-pointer shrink-0"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

