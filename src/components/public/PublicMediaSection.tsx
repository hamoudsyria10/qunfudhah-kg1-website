import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Video, Image as ImageIcon, Heart, Play, Calendar, ExternalLink, Sparkles, Layers } from 'lucide-react';

export const PublicMediaSection: React.FC = () => {
  const { mediaCoverages, galleryPhotos, likePhoto, setSelectedItemForModal } = useApp();
  const [activeMediaTab, setActiveMediaTab] = useState<'coverages' | 'gallery'>('coverages');

  return (
    <section id="coverages" className="py-12 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>التوثيق المرئي والإعلامي 📸</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            التغطيات الإعلامية ومعرض الصور 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            شاهد بالصورة والفيديو أجمل لحظات وفعاليات الروضة الأولى بالقنفذة بدقة عالية
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveMediaTab('coverages')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeMediaTab === 'coverages'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>التغطيات الإعلامية المصورة (كاميرا وفيديو) 📸📹</span>
            </button>
            <button
              onClick={() => setActiveMediaTab('gallery')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeMediaTab === 'gallery'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>ألبوم معرض الصور 🖼️</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Media Coverages (Videos & Photography) */}
        {activeMediaTab === 'coverages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaCoverages.map((cov) => (
              <div
                key={cov.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col group"
              >
                {/* Thumbnail & Video Play Icon */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  {cov.type === 'video' || cov.mediaUrl?.startsWith('data:video') || cov.mediaUrl?.endsWith('.mp4') || cov.thumbnail?.startsWith('data:video') ? (
                    <video
                      src={cov.mediaUrl || cov.thumbnail}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 pointer-events-none"
                    />
                  ) : (
                    <img
                      src={cov.thumbnail || cov.mediaUrl}
                      alt={cov.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                    {cov.type === 'video' ? (
                      <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Icon Indicator for Video vs Photo */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-white text-[11px] font-bold">
                    {cov.type === 'video' ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-rose-400" />
                        <span>فيديو مرئي 📹</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>تغطية فوتوغرافية 📷</span>
                      </>
                    )}
                  </div>

                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-slate-900/80 text-slate-200 text-[10px] font-medium rounded-md backdrop-blur-xs">
                    {cov.publisher}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium mb-1.5">
                      <Calendar className="w-3 h-3 text-rose-500" />
                      {cov.coverageDate}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-rose-600 transition">
                      {cov.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {cov.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedItemForModal({ type: 'coverage', data: cov })}
                    className="mt-4 w-full py-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-600 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>عرض التغطية كاملة</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: Photo Gallery */}
        {activeMediaTab === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  {photo.mediaType === 'video' || photo.imageUrl.startsWith('data:video') || photo.imageUrl.endsWith('.mp4') || photo.imageUrl.endsWith('.webm') ? (
                    <video
                      src={photo.imageUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                  <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-slate-800 text-[11px] font-bold rounded-full shadow-xs backdrop-blur-md flex items-center gap-1 pointer-events-none">
                    <Layers className="w-3 h-3 text-rose-500" />
                    {photo.album}
                  </span>

                  <div className="absolute bottom-3 right-3 left-3 text-white pointer-events-none">
                    <p className="text-xs font-bold line-clamp-1">{photo.title}</p>
                    <p className="text-[10px] text-slate-200 mt-0.5">{photo.date}</p>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2">
                  {photo.description && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-xl leading-relaxed text-right border border-slate-100">
                      {photo.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => likePhoto(photo.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 transition cursor-pointer"
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-100 group-hover:fill-rose-500" />
                      <span>{photo.likesCount} إعجاب</span>
                    </button>

                    <button
                      onClick={() => setSelectedItemForModal({ type: 'photo', data: photo })}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      تكبير الصورة 🔍
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
