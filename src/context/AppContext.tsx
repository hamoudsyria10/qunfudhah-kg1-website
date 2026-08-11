import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ViewMode,
  AdminTab,
  NewsItem,
  MediaCoverageItem,
  GalleryPhoto,
  InitiativeItem,
  ProgramEventItem,
  AchievementItem,
  AppreciationItem,
  MediaReportFile,
  OperationalPlanItem,
  ContactMessage,
  PlatformInfo
} from '../types';

import {
  initialPlatformInfo,
  initialNews,
  initialMediaCoverages,
  initialGalleryPhotos,
  initialInitiatives,
  initialProgramEvents,
  initialAchievements,
  initialAppreciations,
  initialMediaReports,
  initialOperationalPlans,
  initialContactMessages
} from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  
  platformInfo: PlatformInfo;
  setPlatformInfo: React.Dispatch<React.SetStateAction<PlatformInfo>>;
  
  newsList: NewsItem[];
  addNews: (news: Omit<NewsItem, 'id' | 'views'>) => void;
  updateNews: (id: string, updated: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  
  mediaCoverages: MediaCoverageItem[];
  addMediaCoverage: (coverage: Omit<MediaCoverageItem, 'id'>) => void;
  deleteMediaCoverage: (id: string) => void;
  
  galleryPhotos: GalleryPhoto[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id' | 'likesCount'>) => void;
  deleteGalleryPhoto: (id: string) => void;
  likePhoto: (id: string) => void;
  
  initiatives: InitiativeItem[];
  addInitiative: (init: Omit<InitiativeItem, 'id'>) => void;
  updateInitiative: (id: string, updated: Partial<InitiativeItem>) => void;
  deleteInitiative: (id: string) => void;
  
  programEvents: ProgramEventItem[];
  addProgramEvent: (event: Omit<ProgramEventItem, 'id'>) => void;
  updateProgramEvent: (id: string, updated: Partial<ProgramEventItem>) => void;
  deleteProgramEvent: (id: string) => void;
  
  achievements: AchievementItem[];
  addAchievement: (ach: Omit<AchievementItem, 'id'>) => void;
  deleteAchievement: (id: string) => void;
  
  appreciations: AppreciationItem[];
  addAppreciation: (app: Omit<AppreciationItem, 'id'>) => void;
  deleteAppreciation: (id: string) => void;
  
  mediaReports: MediaReportFile[];
  addMediaReport: (rep: Omit<MediaReportFile, 'id' | 'downloadCount'>) => void;
  deleteMediaReport: (id: string) => void;
  incrementReportDownload: (id: string) => void;
  
  operationalPlans: OperationalPlanItem[];
  addOperationalPlan: (plan: Omit<OperationalPlanItem, 'id'>) => void;
  updateOperationalPlan: (id: string, updated: Partial<OperationalPlanItem>) => void;
  deleteOperationalPlan: (id: string) => void;
  
  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'sentDate' | 'isRead'>) => void;
  markMessageAsRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  selectedItemForModal: { type: string; data: any } | null;
  setSelectedItemForModal: (item: { type: string; data: any } | null) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isAuthenticated: boolean;
  adminCreds: { username: string; password: string };
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateAdminCredentials: (currentPass: string, newUsername: string, newPass: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');
  
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>(() => {
    const saved = localStorage.getItem('kg1_platform_info');
    return saved ? JSON.parse(saved) : initialPlatformInfo;
  });

  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('kg1_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [mediaCoverages, setMediaCoverages] = useState<MediaCoverageItem[]>(() => {
    const saved = localStorage.getItem('kg1_coverages');
    return saved ? JSON.parse(saved) : initialMediaCoverages;
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('kg1_photos');
    return saved ? JSON.parse(saved) : initialGalleryPhotos;
  });

  const [initiatives, setInitiatives] = useState<InitiativeItem[]>(() => {
    const saved = localStorage.getItem('kg1_initiatives');
    return saved ? JSON.parse(saved) : initialInitiatives;
  });

  const [programEvents, setProgramEvents] = useState<ProgramEventItem[]>(() => {
    const saved = localStorage.getItem('kg1_events');
    return saved ? JSON.parse(saved) : initialProgramEvents;
  });

  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    const saved = localStorage.getItem('kg1_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [appreciations, setAppreciations] = useState<AppreciationItem[]>(() => {
    const saved = localStorage.getItem('kg1_appreciations');
    return saved ? JSON.parse(saved) : initialAppreciations;
  });

  const [mediaReports, setMediaReports] = useState<MediaReportFile[]>(() => {
    const saved = localStorage.getItem('kg1_reports');
    return saved ? JSON.parse(saved) : initialMediaReports;
  });

  const [operationalPlans, setOperationalPlans] = useState<OperationalPlanItem[]>(() => {
    const saved = localStorage.getItem('kg1_operational');
    return saved ? JSON.parse(saved) : initialOperationalPlans;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('kg1_messages');
    return saved ? JSON.parse(saved) : initialContactMessages;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedItemForModal, setSelectedItemForModal] = useState<{ type: string; data: any } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication State & Dynamic Admin Credentials
  const [adminCreds, setAdminCreds] = useState<{ username: string; password: string }>(() => {
    const saved = localStorage.getItem('kg1_admin_creds');
    return saved ? JSON.parse(saved) : { username: 'Hamoud.Syria', password: '1q2w3eASD' };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('kg1_admin_auth') === 'true';
  });

  const login = (u: string, p: string): boolean => {
    if (u.trim().toLowerCase() === adminCreds.username.trim().toLowerCase() && p === adminCreds.password) {
      setIsAuthenticated(true);
      localStorage.setItem('kg1_admin_auth', 'true');
      showToast('تم تسجيل الدخول بنجاح! أهلاً بك 🌸');
      return true;
    } else {
      showToast('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kg1_admin_auth');
    showToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const updateAdminCredentials = (currentPass: string, newUsername: string, newPass: string): boolean => {
    if (currentPass !== adminCreds.password) {
      showToast('كلمة المرور الحالية غير صحيحة! يرجى التأكد وإعادة المحاولة', 'error');
      return false;
    }
    if (!newUsername.trim() || !newPass.trim()) {
      showToast('يرجى ملء كافة الحقول باسم مستخدم وكلمة مرور صحيحة', 'error');
      return false;
    }
    const updated = { username: newUsername.trim(), password: newPass.trim() };
    setAdminCreds(updated);
    localStorage.setItem('kg1_admin_creds', JSON.stringify(updated));
    showToast('تم تحديث اسم المستخدم وكلمة المرور بنجاح! 🔑');
    return true;
  };

  // LocalStorage synchronizations
  useEffect(() => { localStorage.setItem('kg1_platform_info', JSON.stringify(platformInfo)); }, [platformInfo]);
  useEffect(() => { localStorage.setItem('kg1_news', JSON.stringify(newsList)); }, [newsList]);
  useEffect(() => { localStorage.setItem('kg1_coverages', JSON.stringify(mediaCoverages)); }, [mediaCoverages]);
  useEffect(() => { localStorage.setItem('kg1_photos', JSON.stringify(galleryPhotos)); }, [galleryPhotos]);
  useEffect(() => { localStorage.setItem('kg1_initiatives', JSON.stringify(initiatives)); }, [initiatives]);
  useEffect(() => { localStorage.setItem('kg1_events', JSON.stringify(programEvents)); }, [programEvents]);
  useEffect(() => { localStorage.setItem('kg1_achievements', JSON.stringify(achievements)); }, [achievements]);
  useEffect(() => { localStorage.setItem('kg1_appreciations', JSON.stringify(appreciations)); }, [appreciations]);
  useEffect(() => { localStorage.setItem('kg1_reports', JSON.stringify(mediaReports)); }, [mediaReports]);
  useEffect(() => { localStorage.setItem('kg1_operational', JSON.stringify(operationalPlans)); }, [operationalPlans]);
  useEffect(() => { localStorage.setItem('kg1_messages', JSON.stringify(contactMessages)); }, [contactMessages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const addNews = (newsData: Omit<NewsItem, 'id' | 'views'>) => {
    const newItem: NewsItem = {
      ...newsData,
      id: `news-${Date.now()}`,
      views: 1
    };
    setNewsList((prev) => [newItem, ...prev]);
    showToast('تم نشر الخبر بنجاح 📰');
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    setNewsList((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
    showToast('تم تحديث الخبر بنجاح');
  };

  const deleteNews = (id: string) => {
    setNewsList((prev) => prev.filter((n) => n.id !== id));
    showToast('تم حذف الخبر', 'info');
  };

  const addMediaCoverage = (coverageData: Omit<MediaCoverageItem, 'id'>) => {
    const newItem: MediaCoverageItem = {
      ...coverageData,
      id: `cov-${Date.now()}`
    };
    setMediaCoverages((prev) => [newItem, ...prev]);
    showToast('تمت إضافة التغطية الإعلامية بنجاح 📸');
  };

  const deleteMediaCoverage = (id: string) => {
    setMediaCoverages((prev) => prev.filter((c) => c.id !== id));
    showToast('تم حذف التغطية الإعلامية', 'info');
  };

  const addGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id' | 'likesCount'>) => {
    const newItem: GalleryPhoto = {
      ...photoData,
      id: `photo-${Date.now()}`,
      likesCount: 0
    };
    setGalleryPhotos((prev) => [newItem, ...prev]);
    showToast('تمت إضافة الصورة إلى معرض الصور 🌸');
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
    showToast('تمت إزالة الصورة من المعرض', 'info');
  };

  const likePhoto = (id: string) => {
    setGalleryPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p))
    );
    showToast('شكراً لإعجابك بالصورة ❤️', 'info');
  };

  const addInitiative = (initData: Omit<InitiativeItem, 'id'>) => {
    const newItem: InitiativeItem = {
      ...initData,
      id: `init-${Date.now()}`
    };
    setInitiatives((prev) => [newItem, ...prev]);
    showToast('تم تسجيل المبادرة الجديدة 🌱');
  };

  const updateInitiative = (id: string, updated: Partial<InitiativeItem>) => {
    setInitiatives((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    showToast('تم تحديث بيانات المبادرة');
  };

  const deleteInitiative = (id: string) => {
    setInitiatives((prev) => prev.filter((i) => i.id !== id));
    showToast('تم حذف المبادرة', 'info');
  };

  const addProgramEvent = (eventData: Omit<ProgramEventItem, 'id'>) => {
    const newItem: ProgramEventItem = {
      ...eventData,
      id: `event-${Date.now()}`
    };
    setProgramEvents((prev) => [newItem, ...prev]);
    showToast('تم إدراج البرنامج/الفعالية بنجاح 🎯');
  };

  const updateProgramEvent = (id: string, updated: Partial<ProgramEventItem>) => {
    setProgramEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
    showToast('تم تحديث تفاصيل الفعالية');
  };

  const deleteProgramEvent = (id: string) => {
    setProgramEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('تم حذف الفعالية', 'info');
  };

  const addAchievement = (achData: Omit<AchievementItem, 'id'>) => {
    const newItem: AchievementItem = {
      ...achData,
      id: `ach-${Date.now()}`
    };
    setAchievements((prev) => [newItem, ...prev]);
    showToast('تمت إضافة الإنجاز بنجاح 👩‍🏫');
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
    showToast('تم حذف الإنجاز', 'info');
  };

  const addAppreciation = (appData: Omit<AppreciationItem, 'id'>) => {
    const newItem: AppreciationItem = {
      ...appData,
      id: `app-${Date.now()}`
    };
    setAppreciations((prev) => [newItem, ...prev]);
    showToast('تم نشر بطاقة الشكر والتقدير ⭐');
  };

  const deleteAppreciation = (id: string) => {
    setAppreciations((prev) => prev.filter((a) => a.id !== id));
    showToast('تمت إزالة بطاقة التقدير', 'info');
  };

  const addMediaReport = (repData: Omit<MediaReportFile, 'id' | 'downloadCount'>) => {
    const newItem: MediaReportFile = {
      ...repData,
      id: `rep-${Date.now()}`,
      downloadCount: 0
    };
    setMediaReports((prev) => [newItem, ...prev]);
    showToast('تم رفع الملف والتقرير الإعلامي 📚');
  };

  const deleteMediaReport = (id: string) => {
    setMediaReports((prev) => prev.filter((r) => r.id !== id));
    showToast('تم حذف الملف', 'info');
  };

  const incrementReportDownload = (id: string) => {
    setMediaReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    showToast('جاري تحميل الملف...', 'info');
  };

  const addOperationalPlan = (planData: Omit<OperationalPlanItem, 'id'>) => {
    const newItem: OperationalPlanItem = {
      ...planData,
      id: `plan-${Date.now()}`
    };
    setOperationalPlans((prev) => [newItem, ...prev]);
    showToast('تم إدراج هدف في الخطة التشغيلية 🗓️');
  };

  const updateOperationalPlan = (id: string, updated: Partial<OperationalPlanItem>) => {
    setOperationalPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('تم تحديث الخطة التشغيلية');
  };

  const deleteOperationalPlan = (id: string) => {
    setOperationalPlans((prev) => prev.filter((p) => p.id !== id));
    showToast('تم حذف البند من الخطة', 'info');
  };

  const addContactMessage = (msgData: Omit<ContactMessage, 'id' | 'sentDate' | 'isRead'>) => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newItem: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      sentDate: dateStr,
      isRead: false
    };
    setContactMessages((prev) => [newItem, ...prev]);
    showToast('تم إرسال رسالتك بنجاح! يسعدنا تواصلكم 📞');
  };

  const markMessageAsRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    showToast('تم حذف الرسالة', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeAdminTab,
        setActiveAdminTab,
        platformInfo,
        setPlatformInfo,
        newsList,
        addNews,
        updateNews,
        deleteNews,
        mediaCoverages,
        addMediaCoverage,
        deleteMediaCoverage,
        galleryPhotos,
        addGalleryPhoto,
        deleteGalleryPhoto,
        likePhoto,
        initiatives,
        addInitiative,
        updateInitiative,
        deleteInitiative,
        programEvents,
        addProgramEvent,
        updateProgramEvent,
        deleteProgramEvent,
        achievements,
        addAchievement,
        deleteAchievement,
        appreciations,
        addAppreciation,
        deleteAppreciation,
        mediaReports,
        addMediaReport,
        deleteMediaReport,
        incrementReportDownload,
        operationalPlans,
        addOperationalPlan,
        updateOperationalPlan,
        deleteOperationalPlan,
        contactMessages,
        addContactMessage,
        markMessageAsRead,
        deleteContactMessage,
        toasts,
        showToast,
        removeToast,
        selectedItemForModal,
        setSelectedItemForModal,
        searchQuery,
        setSearchQuery,
        isAuthenticated,
        adminCreds,
        login,
        logout,
        updateAdminCredentials
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
