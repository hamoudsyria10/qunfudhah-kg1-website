import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Newspaper, Calendar, Eye, ArrowLeft, Tag, Sparkles } from 'lucide-react';

export const PublicNewsSection: React.FC = () => {
  const { newsList, setSelectedItemForModal, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = ['الكل', 'خبر هام', 'إعلان', 'عاجل', 'فعالية'];

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="news" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-600 bg-rose-100/80 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>قسم المستجدات والأحداث 📰</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              آخر الأخبار والإعلانات 🌸
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              تابع كافة الأنباء والقرارات والإعلانات الرسمية الخاصة بالروضة الأولى بالقنفذة
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-sm">لا توجد أخبار مطابقة لبحثك</p>
            <p className="text-xs text-slate-400 mt-1">جرب تغيير كلمة البحث أو فئة التصنيف</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* News Image Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm backdrop-blur-md ${
                      news.category === 'عاجل'
                        ? 'bg-rose-600'
                        : news.category === 'خبر هام'
                        ? 'bg-amber-600'
                        : news.category === 'إعلان'
                        ? 'bg-sky-600'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {news.category}
                  </span>

                  {news.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-amber-950 font-extrabold text-[10px] rounded-full flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3" />
                      خبر مميز
                    </span>
                  )}
                </div>

                {/* News Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-medium mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-500" />
                        {news.publishDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" />
                        {news.views} مشاهدة
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {news.content}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedItemForModal({ type: 'news', data: news })}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <span>قراءة الخبر كاملاً</span>
                      <ArrowLeft className="w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
