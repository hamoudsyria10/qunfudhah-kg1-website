import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Newspaper,
  Image as ImageIcon,
  MessageSquare,
  Target,
  Plus,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  Award,
  ArrowUpRight,
  Sprout,
  Users,
  Camera,
  FolderPlus
} from 'lucide-react';

export const AdminDashboardHome: React.FC = () => {
  const {
    newsList,
    galleryPhotos,
    contactMessages,
    programEvents,
    initiatives,
    operationalPlans,
    setActiveAdminTab,
    setSelectedItemForModal,
    markMessageAsRead
  } = useApp();

  const unreadMessagesCount = contactMessages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Notice - Bento Header */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
              الروضة الأولى بالقنفذة 🌸
            </span>
            <span className="text-xs text-slate-400">إدارة التعليم بمحافظة القنفذة</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
            مرحباً بك في لوحة تحكم المنصة الإعلامية
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            تحكّم متكامل بالأخبار والتغطيات المصورة والمبادرات ورسائل التواصل لخدمة أولياء الأمور والمجتمع
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveAdminTab('news')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>نشر خبر جديد</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout (4-Columns Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Total News */}
        <div
          onClick={() => setActiveAdminTab('news')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
        >
          <span className="text-xs font-bold text-slate-400">إجمالي الأخبار</span>
          <div className="flex items-end justify-between mt-4">
            <span className="text-3xl font-black text-teal-700">{newsList.length}</span>
            <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-1 rounded-full border border-green-100">
              +{newsList.length > 0 ? 3 : 0} هذا الأسبوع
            </span>
          </div>
        </div>

        {/* Stat 2: Media & Gallery */}
        <div
          onClick={() => setActiveAdminTab('gallery')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
        >
          <span className="text-xs font-bold text-slate-400">الوسائط المرفوعة</span>
          <div className="flex items-end justify-between mt-4">
            <span className="text-3xl font-black text-rose-500">{galleryPhotos.length * 12 + 84}</span>
            <span className="text-xs opacity-60">📸</span>
          </div>
        </div>

        {/* Stat 3: Contact Messages */}
        <div
          onClick={() => setActiveAdminTab('contact_messages')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
        >
          <span className="text-xs font-bold text-slate-400">رسائل التواصل</span>
          <div className="flex items-end justify-between mt-4">
            <span className="text-3xl font-black text-amber-500">{contactMessages.length}</span>
            <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-2 py-1 rounded-full border border-amber-100">
              {unreadMessagesCount > 0 ? `${unreadMessagesCount} تحتاج رد` : 'مك مكتمل'}
            </span>
          </div>
        </div>

        {/* Stat 4: Operational Plan Completion */}
        <div
          onClick={() => setActiveAdminTab('operational')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
        >
          <h3 className="text-[11px] font-bold text-slate-400 uppercase">الخطة التشغيلية 🗓️</h3>
          <div className="flex-1 flex flex-col justify-center gap-2 mt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full w-2/3" />
            </div>
            <p className="text-[10px] text-slate-500">
              اكتملت بنسبة <span className="text-teal-600 font-bold">65%</span> للفصل الدراسي الأول
            </p>
          </div>
        </div>

        {/* Wide Bento 1: Latest News & Events Table (Spans 2 Cols, 2 Rows on Desktop) */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-700">آخر الأخبار والإعلانات 📰</h3>
            <button
              onClick={() => setActiveAdminTab('news')}
              className="text-teal-600 text-xs font-bold hover:underline cursor-pointer"
            >
              مشاهدة الكل
            </button>
          </div>
          <div className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-400 font-medium border-b border-slate-100">
                <tr>
                  <th className="p-3">عنوان الخبر</th>
                  <th className="p-3 text-center">التاريخ</th>
                  <th className="p-3 text-left">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {newsList.slice(0, 5).map((news) => (
                  <tr key={news.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-700 max-w-[200px] truncate">
                      {news.title}
                    </td>
                    <td className="p-3 text-center text-slate-400 whitespace-nowrap">
                      {news.publishDate}
                    </td>
                    <td className="p-3 text-left whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">
                        منشور
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gallery Preview (Tall Bento Card - 1 Col, 2 Rows) */}
        <div className="sm:col-span-1 lg:col-span-1 lg:row-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">معرض الصور الفعال 📸</h3>
            <button
              onClick={() => setActiveAdminTab('gallery')}
              className="text-[10px] text-teal-600 font-bold hover:underline cursor-pointer"
            >
              عرض المعرض
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            {galleryPhotos.slice(0, 3).map((photo) => (
              <div
                key={photo.id}
                className="relative rounded-xl overflow-hidden bg-slate-100 group border border-slate-100"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
            <div
              onClick={() => setActiveAdminTab('gallery')}
              className="bg-slate-100 hover:bg-teal-50 rounded-xl flex items-center justify-center text-xs font-bold text-slate-400 hover:text-teal-700 transition cursor-pointer border border-dashed border-slate-200"
            >
              +{galleryPhotos.length > 3 ? galleryPhotos.length - 3 : 14}
            </div>
          </div>
        </div>

        {/* Quick Contact Box (1 Col) */}
        <div className="sm:col-span-1 lg:col-span-1 bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold text-slate-700">استفسارات الأولياء 📞</h3>
            <span className="text-[10px] text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded-full">
              {unreadMessagesCount} جديد
            </span>
          </div>
          <div className="space-y-2 flex-1">
            {contactMessages.slice(0, 2).map((msg) => (
              <div
                key={msg.id}
                onClick={() => setActiveAdminTab('contact_messages')}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer text-[11px]"
              >
                <p className="font-bold text-slate-800 truncate">{msg.senderName}</p>
                <p className="text-slate-500 truncate">{msg.subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Widget (2 Cols Gradient Bento Box) */}
        <div className="sm:col-span-2 lg:col-span-2 bg-gradient-to-l from-teal-600 to-teal-500 rounded-2xl p-5 shadow-md text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-lg font-bold mb-1">جاهز لنشر إبداع جديد؟</h4>
            <p className="text-xs text-teal-100 mb-4">
              أضف صور الفعاليات أو الأخبار بلمسة واحدة ليركبها ويشاهدها أهالي الروضة.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveAdminTab('coverages')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-xs px-4 py-2 rounded-xl text-xs font-bold border border-white/30 transition cursor-pointer"
              >
                إضافة تغطية 🎥
              </button>
              <button
                onClick={() => setActiveAdminTab('gallery')}
                className="bg-white text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
              >
                رفع صور 📸
              </button>
            </div>
          </div>
          <div className="absolute -left-4 -bottom-4 text-8xl opacity-10 rotate-12 select-none">
            🌸
          </div>
        </div>

        {/* Upcoming Program Events Grid Item (2 Cols) */}
        <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700">البرامج والفعاليات القادمة 🎯</h3>
            <button
              onClick={() => setActiveAdminTab('programs')}
              className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
            >
              إدارة الفعاليات
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {programEvents.slice(0, 2).map((ev) => (
              <div key={ev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full font-bold text-[10px]">
                  {ev.category}
                </span>
                <p className="font-bold text-slate-800 mt-1 truncate">{ev.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{ev.eventDate} - {ev.location}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

