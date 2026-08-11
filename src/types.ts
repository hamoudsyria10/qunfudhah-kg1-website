export type ViewMode = 'public' | 'admin';

export type AdminTab = 
  | 'overview'
  | 'hero_settings'
  | 'news'
  | 'coverages'
  | 'gallery'
  | 'initiatives'
  | 'programs'
  | 'achievements'
  | 'appreciation'
  | 'reports'
  | 'operational'
  | 'contact_messages'
  | 'contact_settings'
  | 'settings';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'عاجل' | 'إعلان' | 'خبر هام' | 'فعالية';
  image: string;
  publishDate: string;
  views: number;
  featured?: boolean;
}

export interface MediaCoverageItem {
  id: string;
  title: string;
  type: 'video' | 'photo';
  mediaUrl: string;
  thumbnail: string;
  coverageDate: string;
  publisher: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  album: string;
  imageUrl: string;
  date: string;
  likesCount: number;
  description?: string;
  mediaType?: 'image' | 'video';
}

export interface InitiativeItem {
  id: string;
  title: string;
  description: string;
  targetGroup: string;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  status: 'قيد التنفيذ' | 'مكتملة' | 'مخطط لها';
  image: string;
}

export interface ProgramEventItem {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  category: 'تعليمي' | 'ترفيهي' | 'وطني' | 'صحي';
  attendeesCount: number;
  image: string;
  status: 'قادمة' | 'مستمرة' | 'منتهية';
}

export interface AchievementItem {
  id: string;
  title: string;
  recipient: string;
  awardLevel: 'على مستوى القنفذة' | 'على مستوى المنطقة' | 'على مستوى المملكة' | 'تكريم داخلي';
  date: string;
  description: string;
  icon: string;
}

export interface AppreciationItem {
  id: string;
  recipientName: string;
  role: 'معلمة' | 'ولي أمر' | 'إدارية' | 'جهة داعمة';
  message: string;
  date: string;
  badge: string;
}

export interface MediaReportFile {
  id: string;
  title: string;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'XLSX';
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  category: 'تقرير إعلامي' | 'خطة عمل' | 'نشرة توعوية' | 'ملف ختامي';
}

export interface OperationalPlanItem {
  id: string;
  goalTitle: string;
  term: 'الفصل الأول' | 'الفصل الثاني' | 'الفصل الثالث';
  responsibleParty: string;
  executionPeriod: string;
  status: 'تم الإنجاز' | 'جاري العمل' | 'مؤجل';
  completionRate: number;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sentDate: string;
  isRead: boolean;
  replied?: boolean;
}

export interface PlatformInfo {
  name: string;
  schoolName: string;
  region: string;
  welcomeMessage: string;
  aboutText: string;
  phone: string;
  email: string;
  address: string;
  whatsappLink?: string;
  callLink?: string;
  mapLocationUrl?: string;
  heroTitle?: string;
  heroTag?: string;
  heroCardMessage?: string;
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalEvents: number;
    totalInitiatives: number;
  };
}
