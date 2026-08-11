import React from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Globe, Bell, User, PlusCircle, Sparkles, Flower2, LogOut } from 'lucide-react';

export const AdminHeader: React.FC<{ onOpenSidebar: () => void }> = ({ onOpenSidebar }) => {
  const { setViewMode, activeAdminTab, contactMessages, setActiveAdminTab, logout } = useApp();

  const unreadCount = contactMessages.filter((m) => !m.isRead).length;

  return (
    <header className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex justify-between items-center my-2 mx-4 sm:mx-6 lg:mx-8">
      
      {/* Right: Hamburger + Greeting Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
          aria-label="قائمة التحكم"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <span>مرحباً بك في لوحة تحكم الروضة الأولى</span>
            <span className="text-sm">🌸</span>
          </h2>
          <p className="text-[11px] text-slate-400 hidden sm:block">إدارة محتوى المنصة الإعلامية بالحي المدرس الموحد</p>
        </div>
      </div>

      {/* Left: Quick Actions & Profile */}
      <div className="flex items-center gap-2">
        
        <button
          onClick={() => setActiveAdminTab('news')}
          className="bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة محتوى جديد</span>
        </button>

        {/* View Public Website */}
        <button
          onClick={() => setViewMode('public')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl text-xs font-medium border border-slate-200 transition cursor-pointer"
          title="معاينة المنصة للزوار"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span>الواجهة العامة</span>
        </button>

        {/* Bell Notification */}
        <div className="relative">
          <button
            onClick={() => setActiveAdminTab('contact_messages')}
            className="bg-slate-50 text-slate-600 p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition relative cursor-pointer"
            aria-label="الرسائل"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl border border-rose-200 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
          title="تسجيل الخروج"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">خروج</span>
        </button>

      </div>
    </header>
  );
};

