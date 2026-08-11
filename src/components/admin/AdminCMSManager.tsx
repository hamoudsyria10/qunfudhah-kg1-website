import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTab, InitiativeItem, OperationalPlanItem } from '../../types';
import { FileUploadBox } from './FileUploadBox';
import {
  Newspaper,
  Plus,
  Trash2,
  Edit,
  Edit3,
  Pencil,
  Eye,
  Search,
  Camera,
  Image as ImageIcon,
  Sprout,
  Target,
  Award,
  Star,
  FileText,
  Calendar,
  MessageSquare,
  X,
  Upload,
  CheckCircle2,
  Download,
  Video,
  Heart,
  FolderOutput,
  ShieldCheck,
  KeyRound,
  Lock,
  User,
  Phone,
  Mail,
  MapPin,
  Save,
  PhoneCall,
  ExternalLink,
  Percent,
  TrendingUp,
  Sparkles,
  Flower2
} from 'lucide-react';

type TargetPublishSection = 'gallery' | 'coverages' | 'initiatives' | 'news' | 'programs' | 'achievements';

export const AdminCMSManager: React.FC = () => {
  const {
    activeAdminTab,
    platformInfo,
    setPlatformInfo,
    newsList,
    addNews,
    deleteNews,
    mediaCoverages,
    addMediaCoverage,
    deleteMediaCoverage,
    galleryPhotos,
    addGalleryPhoto,
    deleteGalleryPhoto,
    initiatives,
    addInitiative,
    updateInitiative,
    deleteInitiative,
    programEvents,
    addProgramEvent,
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
    operationalPlans,
    addOperationalPlan,
    updateOperationalPlan,
    deleteOperationalPlan,
    contactMessages,
    deleteContactMessage,
    markMessageAsRead,
    setSelectedItemForModal,
    adminCreds,
    updateAdminCredentials,
    showToast
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // States for Editing Items
  const [editingInitiative, setEditingInitiative] = useState<InitiativeItem | null>(null);
  const [editingPlan, setEditingPlan] = useState<OperationalPlanItem | null>(null);

  // States for Hero Section & Stats Settings Form
  const [editHeroTitle, setEditHeroTitle] = useState(platformInfo.heroTitle || 'نزرع القيم ونبني مستقبل براعم القنفذة الواعد');
  const [editHeroTag, setEditHeroTag] = useState(platformInfo.heroTag || '🌸 بيئة تعليمية جاذبة ومحفزة');
  const [editWelcomeMessage, setEditWelcomeMessage] = useState(platformInfo.welcomeMessage || 'المنصة الإعلامية الموحدة لتوثيق إبداعات ومبادرات أطفال الروضة الأولى بالقنفذة');
  const [editHeroCardMessage, setEditHeroCardMessage] = useState(platformInfo.heroCardMessage || 'نرحب بجميع أفكار وملاحظات أولياء الأمور للارتقاء بالمسيرة التعليمية.');
  const [editTotalStudents, setEditTotalStudents] = useState<number>(platformInfo.stats?.totalStudents ?? 185);
  const [editTotalTeachers, setEditTotalTeachers] = useState<number>(platformInfo.stats?.totalTeachers ?? 14);
  const [editTotalEvents, setEditTotalEvents] = useState<number>(platformInfo.stats?.totalEvents ?? 42);
  const [editTotalInitiatives, setEditTotalInitiatives] = useState<number>(platformInfo.stats?.totalInitiatives ?? 12);

  // States for Contact Settings Form
  const [editEmail, setEditEmail] = useState(platformInfo.email || '');
  const [editPhone, setEditPhone] = useState(platformInfo.phone || '');
  const [editAddress, setEditAddress] = useState(platformInfo.address || '');
  const [editWhatsapp, setEditWhatsapp] = useState(platformInfo.whatsappLink || `https://wa.me/966${platformInfo.phone.replace(/[^0-9]/g, '')}`);
  const [editCallLink, setEditCallLink] = useState(platformInfo.callLink || `tel:${platformInfo.phone}`);
  const [editMapUrl, setEditMapUrl] = useState(platformInfo.mapLocationUrl || 'https://maps.google.com/?q=19.1278,41.0789');

  useEffect(() => {
    setEditHeroTitle(platformInfo.heroTitle || 'نزرع القيم ونبني مستقبل براعم القنفذة الواعد');
    setEditHeroTag(platformInfo.heroTag || '🌸 بيئة تعليمية جاذبة ومحفزة');
    setEditWelcomeMessage(platformInfo.welcomeMessage || 'المنصة الإعلامية الموحدة لتوثيق إبداعات ومبادرات أطفال الروضة الأولى بالقنفذة');
    setEditHeroCardMessage(platformInfo.heroCardMessage || 'نرحب بجميع أفكار وملاحظات أولياء الأمور للارتقاء بالمسيرة التعليمية.');
    setEditTotalStudents(platformInfo.stats?.totalStudents ?? 185);
    setEditTotalTeachers(platformInfo.stats?.totalTeachers ?? 14);
    setEditTotalEvents(platformInfo.stats?.totalEvents ?? 42);
    setEditTotalInitiatives(platformInfo.stats?.totalInitiatives ?? 12);

    setEditEmail(platformInfo.email || '');
    setEditPhone(platformInfo.phone || '');
    setEditAddress(platformInfo.address || '');
    setEditWhatsapp(platformInfo.whatsappLink || `https://wa.me/966${platformInfo.phone.replace(/[^0-9]/g, '')}`);
    setEditCallLink(platformInfo.callLink || `tel:${platformInfo.phone}`);
    setEditMapUrl(platformInfo.mapLocationUrl || 'https://maps.google.com/?q=19.1278,41.0789');
  }, [platformInfo]);

  // Explicit Content Type Selection (صورة أم مقطع فيديو)
  const [uploadContentType, setUploadContentType] = useState<'image' | 'video'>('image');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');

  // Target Publishing Section & Optional Caption
  const [targetPublishSection, setTargetPublishSection] = useState<TargetPublishSection>('gallery');
  const [photoCaption, setPhotoCaption] = useState('');

  // Account & Password Settings Form State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');

  // Form States for News
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState<'عاجل' | 'إعلان' | 'خبر هام' | 'فعالية'>('خبر هام');
  const [newsImage, setNewsImage] = useState('');

  // Form States for Media Coverage
  const [covTitle, setCovTitle] = useState('');
  const [covType, setCovType] = useState<'video' | 'photo'>('video');
  const [covUrl, setCovUrl] = useState('');
  const [covDesc, setCovDesc] = useState('');
  const [covPublisher, setCovPublisher] = useState('فريق الإعلام بالروضة الأولى');

  // Form States for Gallery
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoAlbum, setPhotoAlbum] = useState('أنشطة الفصول');
  const [photoUrl, setPhotoUrl] = useState('');

  // Form States for Initiative
  const [initTitle, setInitTitle] = useState('');
  const [initDesc, setInitDesc] = useState('');
  const [initTarget, setInitTarget] = useState('أطفال الروضة');
  const [initProgress, setInitProgress] = useState(50);
  const [initImage, setInitImage] = useState('');

  // Form States for Program/Event
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('2026-08-25');
  const [eventLocation, setEventLocation] = useState('مسرح الروضة الأولى');
  const [eventCategory, setEventCategory] = useState<'تعليمي' | 'ترفيهي' | 'وطني' | 'صحي'>('تعليمي');
  const [eventImage, setEventImage] = useState('');

  // Form States for Achievement
  const [achTitle, setAchTitle] = useState('');
  const [achRecipient, setAchRecipient] = useState('الروضة الأولى بالقنفذة');
  const [achLevel, setAchLevel] = useState<'على مستوى القنفذة' | 'على مستوى المنطقة' | 'على مستوى المملكة' | 'تكريم داخلي'>('على مستوى القنفذة');
  const [achDesc, setAchDesc] = useState('');

  // Form States for Appreciation
  const [appRecipient, setAppRecipient] = useState('');
  const [appRole, setAppRole] = useState<'معلمة' | 'ولي أمر' | 'إدارية' | 'جهة داعمة'>('معلمة');
  const [appMessage, setAppMessage] = useState('');
  const [appBadge, setAppBadge] = useState('وسام التميز ⭐');

  // Form States for Report File
  const [repTitle, setRepTitle] = useState('');
  const [repType, setRepType] = useState<'PDF' | 'DOCX' | 'PPTX' | 'XLSX'>('PDF');
  const [repSize, setRepSize] = useState('3.5 MB');
  const [repCategory, setRepCategory] = useState<'تقرير إعلامي' | 'خطة عمل' | 'نشرة توعوية' | 'ملف ختامي'>('تقرير إعلامي');
  const [repUrl, setRepUrl] = useState('');

  // Form States for Operational Plan
  const [planGoal, setPlanGoal] = useState('');
  const [planTerm, setPlanTerm] = useState<'الفصل الأول' | 'الفصل الثاني' | 'الفصل الثالث'>('الفصل الأول');
  const [planParty, setPlanParty] = useState('لجنة التطوير بالروضة');
  const [planRate, setPlanRate] = useState(50);

  const handleOpenModal = () => {
    if (activeAdminTab === 'coverages') {
      setTargetPublishSection('coverages');
      setUploadContentType('video');
      setCovType('video');
    } else {
      setTargetPublishSection(activeAdminTab as TargetPublishSection || 'gallery');
      setUploadContentType('image');
      setCovType('photo');
    }
    setUploadedFileUrl('');
    setPhotoCaption('');
    setNewsTitle('');
    setNewsContent('');
    setNewsImage('');
    setCovTitle('');
    setCovUrl('');
    setCovDesc('');
    setPhotoTitle('');
    setPhotoUrl('');
    setInitTitle('');
    setInitDesc('');
    setInitProgress(75);
    setInitImage('');
    setEventTitle('');
    setEventDesc('');
    setEventImage('');
    setAchTitle('');
    setAchDesc('');
    setAppRecipient('');
    setAppMessage('');
    setRepTitle('');
    setRepUrl('');
    setIsModalOpen(true);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeAdminTab === 'reports') {
      if (!repTitle) return;
      addMediaReport({
        title: repTitle,
        fileType: repType,
        fileSize: repSize,
        uploadDate: new Date().toISOString().substring(0, 10),
        category: repCategory
      });
      setRepTitle('');
    } else if (activeAdminTab === 'appreciation') {
      if (!appRecipient || !appMessage) return;
      addAppreciation({
        recipientName: appRecipient,
        role: appRole,
        message: appMessage,
        date: new Date().toISOString().substring(0, 10),
        badge: appBadge
      });
      setAppRecipient('');
      setAppMessage('');
    } else if (activeAdminTab === 'operational') {
      if (!planGoal) return;
      addOperationalPlan({
        goalTitle: planGoal,
        term: planTerm,
        responsibleParty: planParty,
        executionPeriod: 'الفصل الأول',
        status: 'جاري العمل',
        completionRate: planRate
      });
      setPlanGoal('');
    } else {
      // BIND REAL UPLOADED FILE URL DYNAMICALLY
      const primaryMediaUrl = uploadedFileUrl || photoUrl || covUrl || newsImage || initImage || eventImage;

      // PUBLISH ACCORDING TO SELECTED TARGET PUBLISH SECTION
      if (targetPublishSection === 'gallery') {
        const finalTitle = photoTitle || covTitle || newsTitle || initTitle || eventTitle || achTitle || 'صورة جديدة بالمعرض';
        const finalUrl = primaryMediaUrl || 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80';
        const isVideo = uploadContentType === 'video' || covType === 'video' || finalUrl.startsWith('data:video') || finalUrl.startsWith('blob:') || finalUrl.endsWith('.mp4') || finalUrl.endsWith('.webm');
        addGalleryPhoto({
          title: finalTitle,
          album: photoAlbum || 'أنشطة الروضة',
          imageUrl: finalUrl,
          mediaType: isVideo ? 'video' : 'image',
          date: new Date().toISOString().substring(0, 10),
          description: photoCaption || covDesc || undefined
        });
      } else if (targetPublishSection === 'coverages') {
        const finalTitle = covTitle || photoTitle || newsTitle || initTitle || eventTitle || 'تغطية إعلامية جديدة';
        const finalUrl = primaryMediaUrl || 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80';
        const isVid = uploadContentType === 'video' || covType === 'video' || finalUrl.startsWith('data:video') || finalUrl.startsWith('blob:') || finalUrl.includes('youtube') || finalUrl.includes('vimeo') || finalUrl.endsWith('.mp4');
        addMediaCoverage({
          title: finalTitle,
          type: isVid ? 'video' : 'photo',
          mediaUrl: finalUrl,
          thumbnail: finalUrl,
          coverageDate: new Date().toISOString().substring(0, 10),
          publisher: covPublisher || 'فريق الإعلام بالروضة الأولى',
          description: photoCaption || covDesc || 'تغطية إعلامية موثقة للروضة الأولى بالقنفذة'
        });
      } else if (targetPublishSection === 'initiatives') {
        const finalTitle = initTitle || photoTitle || covTitle || newsTitle || 'مبادرة تربوية جديدة';
        const finalImg = primaryMediaUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';
        addInitiative({
          title: finalTitle,
          description: photoCaption || initDesc || 'وصف المبادرة التربوية بالروضة الأولى',
          targetGroup: initTarget || 'أطفال الروضة',
          progressPercentage: Number(initProgress) || 50,
          startDate: new Date().toISOString().substring(0, 10),
          endDate: '2026-12-31',
          status: Number(initProgress) >= 100 ? 'مكتملة' : 'قيد التنفيذ',
          image: finalImg
        });
      } else if (targetPublishSection === 'news') {
        const finalTitle = newsTitle || photoTitle || covTitle || initTitle || 'خبر جديد بالروضة';
        const finalImg = primaryMediaUrl || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';
        addNews({
          title: finalTitle,
          content: newsContent || photoCaption || covDesc || 'تفاصيل الخبر والمعلومات المرفقة بالروضة.',
          category: newsCategory || 'خبر هام',
          image: finalImg,
          publishDate: new Date().toISOString().substring(0, 10),
          views: 0,
          featured: true
        });
      } else if (targetPublishSection === 'programs') {
        const finalTitle = eventTitle || photoTitle || covTitle || newsTitle || 'برنامج وفعالية جديدة';
        const finalImg = primaryMediaUrl || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
        addProgramEvent({
          title: finalTitle,
          description: photoCaption || eventDesc || 'برنامج تفاعلي لأطفال الروضة والمجتمع',
          eventDate: eventDate || new Date().toISOString().substring(0, 10),
          location: eventLocation || 'مسرح الروضة الأولى',
          category: eventCategory || 'تعليمي',
          attendeesCount: 100,
          image: finalImg,
          status: 'قادمة'
        });
      } else if (targetPublishSection === 'achievements') {
        const finalTitle = achTitle || photoTitle || covTitle || newsTitle || 'إنجاز وتكريم جديد';
        addAchievement({
          title: finalTitle,
          recipient: achRecipient || 'الروضة الأولى بالقنفذة',
          awardLevel: achLevel || 'على مستوى القنفذة',
          date: new Date().toISOString().substring(0, 10),
          description: photoCaption || achDesc || 'إنجاز وتكريم متميز للمنشأة',
          icon: 'Trophy'
        });
      }
    }

    setUploadedFileUrl('');
    setNewsTitle('');
    setNewsContent('');
    setCovTitle('');
    setCovUrl('');
    setCovDesc('');
    setPhotoTitle('');
    setPhotoUrl('');
    setPhotoCaption('');
    setInitTitle('');
    setEventTitle('');
    setAchTitle('');
    setIsModalOpen(false);
  };

  const handleUpdateAccountSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput !== confirmNewPasswordInput) {
      showToast('كلمتا السر الجديدتان غير متطابقتين! يرجى إعادة التأكد', 'error');
      return;
    }
    const success = updateAdminCredentials(currentPasswordInput, newUsernameInput, newPasswordInput);
    if (success) {
      setCurrentPasswordInput('');
      setNewUsernameInput('');
      setNewPasswordInput('');
      setConfirmNewPasswordInput('');
    }
  };

  const renderSectionHeader = () => {
    switch (activeAdminTab) {
      case 'hero_settings':
        return {
          title: 'إدارة الواجهة الرئيسية والإحصائيات 🎨',
          subtitle: 'تعديل نصوص الشاشة الرئيسية، الشعار العائم، ونسب وأرقام الإحصائيات الأربعة',
          addBtnLabel: ''
        };
      case 'settings':
        return {
          title: 'إعدادات الحساب وكلمة المرور 🔐',
          subtitle: 'تعديل اسم المستخدم وتغيير كلمة السر الخاصة بالمدير المعتمد',
          addBtnLabel: ''
        };
      case 'news':
        return {
          title: 'إدارة قسم الأخبار والإعلانات 📰',
          subtitle: 'عرض وتعديل وحذف ونشر الأخبار اليومية بالمنصة',
          addBtnLabel: 'إضافة خبر جديد'
        };
      case 'coverages':
        return {
          title: 'إدارة التغطيات الإعلامية 📸',
          subtitle: 'إضافة الفيديوهات والتغطيات المصورة بالدقة المطلوبة',
          addBtnLabel: 'إضافة تغطية جديدة'
        };
      case 'gallery':
        return {
          title: 'إدارة ألبوم ومعرض الصور 📸',
          subtitle: 'رفع الصور الجديدة وتنظيم الألبومات بالمعرض',
          addBtnLabel: 'إضافة صورة للمعرض'
        };
      case 'initiatives':
        return {
          title: 'إدارة قسم المبادرات 🌱',
          subtitle: 'إدراج وتحديث نسب الإنجاز للمبادرات التربوية',
          addBtnLabel: 'إضافة مبادرة جديدة'
        };
      case 'programs':
        return {
          title: 'إدارة البرامج والفعاليات 🎯',
          subtitle: 'جدولة الأنشطة المدرسية والبرامج المدرسية',
          addBtnLabel: 'إضافة برنامج/فعالية'
        };
      case 'achievements':
        return {
          title: 'إدارة إنجازات الروضة 👩‍🏫',
          subtitle: 'توثيق الأوسمة والجوائز التي حققتها المنسوبات',
          addBtnLabel: 'إضافة إنجاز جديد'
        };
      case 'appreciation':
        return {
          title: 'إدارة الشكر والتقدير ⭐',
          subtitle: 'إصدار ونشر بطاقات الشكر للمعلمات والأمهات',
          addBtnLabel: 'إضافة بطاقة شكر'
        };
      case 'reports':
        return {
          title: 'إدارة الملفات والتقارير الإعلامية 📚',
          subtitle: 'رفع التقارير الموثقة والأدلة القابلة للتحميل',
          addBtnLabel: 'رفع ملف/تقرير جديد'
        };
      case 'operational':
        return {
          title: 'إدارة الخطة التشغيلية 🗓️',
          subtitle: 'متابعة وتحديث أهداف الخطة ونسب إنجازها',
          addBtnLabel: 'إضافة بند خطة'
        };
      case 'contact_messages':
        return {
          title: 'صندوق رسائل "تواصل معنا" 📞',
          subtitle: 'مراجعة وقراءة رسائل واستفسارات أولياء الأمور والمجتمع',
          addBtnLabel: ''
        };
      case 'contact_settings':
        return {
          title: 'إدارة معلومات التواصل والروابط المباشرة 📞',
          subtitle: 'تعديل البريد الإلكتروني، رقم الهاتف، الموقع، ورابط الواتساب والاتصال المباشر',
          addBtnLabel: ''
        };
      default:
        return { title: 'إدارة المحتوى', subtitle: '', addBtnLabel: '' };
    }
  };

  const header = renderSectionHeader();

  return (
    <div className="space-y-6">
      
      {/* Top Section Controls Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{header.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{header.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {header.addBtnLabel && (
            <button
              onClick={handleOpenModal}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{header.addBtnLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Rendering By Tab */}

      {/* TAB 1: News Management (قسم الأخبار والإعلانات) */}
      {activeAdminTab === 'news' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">جدول الأخبار والإعلانات المنشورة ({newsList.length})</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">الصورة</th>
                  <th className="p-3.5">عنوان الخبر</th>
                  <th className="p-3.5">التصنيف</th>
                  <th className="p-3.5">تاريخ النشر</th>
                  <th className="p-3.5">المشاهدات</th>
                  <th className="p-3.5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <img src={item.image} alt={item.title} className="w-12 h-10 object-cover rounded-xl" />
                    </td>
                    <td className="p-3 font-bold text-slate-800 max-w-sm">{item.title}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 whitespace-nowrap">{item.publishDate}</td>
                    <td className="p-3 text-slate-600 font-bold">{item.views}</td>
                    <td className="p-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedItemForModal({ type: 'news', data: item })}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title="معاينة"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNews(item.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Media Coverage Management */}
      {activeAdminTab === 'coverages' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs">
            قائمة التغطيات الإعلامية المرئية والمصورة ({mediaCoverages.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">نوع التغطية</th>
                  <th className="p-3.5">عنوان التغطية</th>
                  <th className="p-3.5">الجهة الناشرة</th>
                  <th className="p-3.5">التاريخ</th>
                  <th className="p-3.5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mediaCoverages.map((cov) => (
                  <tr key={cov.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-[10px]">
                        {cov.type === 'video' ? 'فيديو 📹' : 'تصوير 📷'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800">{cov.title}</td>
                    <td className="p-3 text-slate-600">{cov.publisher}</td>
                    <td className="p-3 text-slate-500">{cov.coverageDate}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteMediaCoverage(cov.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Photo Gallery Management */}
      {activeAdminTab === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {galleryPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative group">
              <img src={photo.imageUrl} alt={photo.title} className="w-full h-36 object-cover" />
              <button
                onClick={() => deleteGalleryPhoto(photo.id)}
                className="absolute top-2 left-2 p-1.5 bg-rose-600 text-white rounded-lg shadow-md hover:bg-rose-700 transition"
                title="حذف الصورة"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="p-3">
                <p className="font-bold text-xs text-slate-800 line-clamp-1">{photo.title}</p>
                <p className="text-[10px] text-slate-400 mt-1">{photo.album} • {photo.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Initiatives Management */}
      {activeAdminTab === 'initiatives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initiatives.map((init) => (
            <div key={init.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={init.image} alt={init.title} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        init.status === 'مكتملة' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {init.status}
                      </span>
                      <span className="text-xs font-black text-emerald-700">{init.progressPercentage}%</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm mt-1">{init.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingInitiative(init)}
                    className="p-2 text-teal-700 hover:bg-teal-50 rounded-xl transition flex items-center gap-1 text-xs font-bold border border-teal-200/60"
                    title="تعديل المبادرة وزيادة نسبة الإنجاز"
                  >
                    <Edit3 className="w-4 h-4 text-teal-600" />
                    <span className="hidden sm:inline">تعديل</span>
                  </button>
                  <button
                    onClick={() => deleteInitiative(init.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="حذف المبادرة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{init.description}</p>

              {/* Progress Bar Display */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    نسبة الإنجاز الفعالية:
                  </span>
                  <span className="text-emerald-700 font-extrabold">{init.progressPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${init.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: Programs/Events Management */}
      {activeAdminTab === 'programs' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">الفعالية</th>
                  <th className="p-3.5">التصنيف</th>
                  <th className="p-3.5">التاريخ والموقع</th>
                  <th className="p-3.5">الحالة</th>
                  <th className="p-3.5 text-center">حذف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-800">{ev.title}</td>
                    <td className="p-3 text-slate-600">{ev.category}</td>
                    <td className="p-3 text-slate-500">{ev.eventDate} - {ev.location}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full font-bold text-[10px]">
                        {ev.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => deleteProgramEvent(ev.id)} className="p-1.5 text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Achievements Management */}
      {activeAdminTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div key={ach.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full font-bold text-[10px]">
                  {ach.awardLevel}
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-2">{ach.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{ach.recipient}</p>
              </div>
              <button onClick={() => deleteAchievement(ach.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: Appreciation Management */}
      {activeAdminTab === 'appreciation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appreciations.map((app) => (
            <div key={app.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 bg-pink-100 text-pink-800 rounded-full font-bold text-[10px]">
                  {app.role} • {app.badge}
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-2">{app.recipientName}</h3>
                <p className="text-xs text-slate-500 mt-1 italic font-sans">"{app.message}"</p>
              </div>
              <button onClick={() => deleteAppreciation(app.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 8: Reports Management */}
      {activeAdminTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">عنوان الملف</th>
                <th className="p-3.5">الصيغة والحجم</th>
                <th className="p-3.5">التحميلات</th>
                <th className="p-3.5 text-center">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mediaReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{rep.title}</td>
                  <td className="p-3 text-slate-500">{rep.fileType} • {rep.fileSize}</td>
                  <td className="p-3 text-slate-600 font-bold">{rep.downloadCount} مرات</td>
                  <td className="p-3 text-center">
                    <button onClick={() => deleteMediaReport(rep.id)} className="p-1.5 text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 9: Operational Plan Management */}
      {activeAdminTab === 'operational' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100 font-bold border-b border-slate-200 text-slate-700">
              <tr>
                <th className="p-3.5">هدف الخطة</th>
                <th className="p-3.5">الفصل الدراسي</th>
                <th className="p-3.5">الجهة المنفذة</th>
                <th className="p-3.5">نسبة الإنجاز والحالة</th>
                <th className="p-3.5 text-center">الإجراءات والتعديل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {operationalPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-800 max-w-xs">{plan.goalTitle}</td>
                  <td className="p-3 text-slate-600">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md font-bold text-[11px]">
                      {plan.term}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{plan.responsibleParty}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${plan.completionRate}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-emerald-700">{plan.completionRate}%</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        plan.status === 'تم الإنجاز' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {plan.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setEditingPlan(plan)}
                        className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-bold text-xs transition flex items-center gap-1 border border-teal-200"
                        title="تعديل نسبة الإنجاز والهدف"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                        <span>تعديل نسبة الإنجاز</span>
                      </button>
                      <button
                        onClick={() => deleteOperationalPlan(plan.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                        title="حذف البند"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 10: Contact Messages Inbox */}
      {activeAdminTab === 'contact_messages' && (
        <div className="space-y-4">
          {contactMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-3xl border shadow-xs transition space-y-2 ${
                msg.isRead ? 'bg-white border-slate-200' : 'bg-rose-50/70 border-rose-300 font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{msg.senderName}</span>
                  <span className="text-xs text-slate-500">({msg.phone})</span>
                </div>
                <span className="text-xs text-slate-400">{msg.sentDate}</span>
              </div>

              <p className="text-xs font-bold text-rose-700">الموضوع: {msg.subject}</p>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {msg.message}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                {!msg.isRead ? (
                  <button
                    onClick={() => markMessageAsRead(msg.id)}
                    className="px-3 py-1 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition"
                  >
                    تحديد كمقروء ✔️
                  </button>
                ) : (
                  <span className="text-emerald-600 font-bold text-[11px]">تمت القراءة ✔️</span>
                )}

                <button
                  onClick={() => deleteContactMessage(msg.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: Hero Section & Statistics Management */}
      {activeAdminTab === 'hero_settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-3xl mx-auto my-4 text-right">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full mb-2 border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>تعديل الواجهة الرئيسية والإحصائيات الأربعة</span>
            </div>
            <h3 className="text-xl font-black text-slate-800">إدارة نصوص الشاشة الرئيسية وأرقام الإحصائيات</h3>
            <p className="text-xs text-slate-500 mt-1">
              تحديث العناوين الترحيبية والشعار العائم وأعداد الأطفال والمعلمات والفعاليات والبطاقة السفلية فوراً
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPlatformInfo((prev) => ({
                ...prev,
                heroTitle: editHeroTitle,
                heroTag: editHeroTag,
                welcomeMessage: editWelcomeMessage,
                heroCardMessage: editHeroCardMessage,
                stats: {
                  totalStudents: Number(editTotalStudents) || 0,
                  totalTeachers: Number(editTotalTeachers) || 0,
                  totalEvents: Number(editTotalEvents) || 0,
                  totalInitiatives: Number(editTotalInitiatives) || 0,
                }
              }));
              showToast('تم حفظ وتحديث بيانات الواجهة الرئيسية والإحصائيات بنجاح! 🎨✨');
            }}
            className="space-y-5"
          >
            {/* Hero Main Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>العنوان الرئيسي للشاشة الرئيسية (Hero Main Title):</span>
              </label>
              <input
                type="text"
                required
                value={editHeroTitle}
                onChange={(e) => setEditHeroTitle(e.target.value)}
                placeholder="نزرع القيم ونبني مستقبل براعم القنفذة الواعد"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            {/* Floating Badge Tag */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Flower2 className="w-3.5 h-3.5 text-amber-600" />
                <span>الشعار العائم العلوي (Floating Badge Tag):</span>
              </label>
              <input
                type="text"
                required
                value={editHeroTag}
                onChange={(e) => setEditHeroTag(e.target.value)}
                placeholder="🌸 بيئة تعليمية جاذبة ومحفزة"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            {/* Welcome Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>النص الوصفي الترحيبي (Welcome Subtitle):</span>
              </label>
              <textarea
                rows={2}
                required
                value={editWelcomeMessage}
                onChange={(e) => setEditWelcomeMessage(e.target.value)}
                placeholder="المنصة الإعلامية الموحدة لتوثيق إبداعات ومبادرات أطفال الروضة الأولى بالقنفذة"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            {/* Statistics Counters Grid */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>تعديل الإحصائيات والأرقام (Statistics Counters):</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    👶 عدد الأطفال والطلبة:
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editTotalStudents}
                    onChange={(e) => setEditTotalStudents(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-extrabold text-rose-700 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    👩‍🏫 عدد المعلمات والإداريات:
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editTotalTeachers}
                    onChange={(e) => setEditTotalTeachers(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-extrabold text-amber-700 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    🎯 عدد الفعاليات والبرامج:
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editTotalEvents}
                    onChange={(e) => setEditTotalEvents(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-extrabold text-sky-700 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    🌱 عدد المبادرات التعليمية:
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editTotalInitiatives}
                    onChange={(e) => setEditTotalInitiatives(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-extrabold text-emerald-700 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Card Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>النص المكتوب في البطاقة السفلية (Bottom Welcome Card):</span>
              </label>
              <input
                type="text"
                required
                value={editHeroCardMessage}
                onChange={(e) => setEditHeroCardMessage(e.target.value)}
                placeholder="نرحب بجميع أفكار وملاحظات أولياء الأمور للارتقاء بالمسيرة التعليمية."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وتحديث الواجهة الإدارية والإحصائيات 🎨</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 11: Contact Info & Social Links Settings */}
      {activeAdminTab === 'contact_settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-2xl mx-auto my-4 text-right">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full mb-2 border border-emerald-100">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>بيانات وسائل التواصل والروابط المباشرة</span>
            </div>
            <h3 className="text-xl font-black text-slate-800">إدارة معلومات التواصل ورابط الواتساب</h3>
            <p className="text-xs text-slate-500 mt-1">
              تحديث المعلومات والروابط المباشرة التي تظهر لزوار المنصة وأولياء الأمور
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPlatformInfo((prev) => ({
                ...prev,
                email: editEmail,
                phone: editPhone,
                address: editAddress,
                whatsappLink: editWhatsapp,
                callLink: editCallLink,
                mapLocationUrl: editMapUrl
              }));
              showToast('تم حفظ وتحديث بيانات ومعلومات التواصل والموقع الجغرافي بنجاح! 📞🗺️');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>البريد الإلكتروني الرسمي:</span>
              </label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="info@qunfudhah-kg1.edu.sa"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>رقم الهاتف الرسمي:</span>
              </label>
              <input
                type="text"
                required
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="0177321450"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>العنوان والمكان الجغرافي:</span>
              </label>
              <input
                type="text"
                required
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                placeholder="المملكة العربية السعودية - محافظة القنفذة - حي الشاطئ..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>رابط الواتساب المباشر (WhatsApp Link):</span>
              </label>
              <input
                type="url"
                required
                value={editWhatsapp}
                onChange={(e) => setEditWhatsapp(e.target.value)}
                placeholder="https://wa.me/966177321450"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                dir="ltr"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                عند النقر على زر الواتساب في الواجهة العامة، سيتم توجيه الزائر مباشرة إلى هذا الرابط.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                <span>رابط زر الاتصال المباشر (Direct Call Link):</span>
              </label>
              <input
                type="text"
                required
                value={editCallLink}
                onChange={(e) => setEditCallLink(e.target.value)}
                placeholder="tel:0177321450"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>تعديل موقع الروضة على الخريطة (Google Maps URL):</span>
              </label>
              <input
                type="text"
                required
                value={editMapUrl}
                onChange={(e) => setEditMapUrl(e.target.value)}
                placeholder="https://maps.google.com/?q=19.1278,41.0789"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                dir="ltr"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                يمكنك كتابة رابط خرائط جوجل أو الإحداثيات أو الاسم الجغرافي للروضة، وسيتم تحديث الخريطة التفاعلية بالواجهة مباشرة.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وتحديث معلومات التواصل المباشرة 📞</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ACCOUNT & SECURITY SETTINGS VIEW */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-2xl mx-auto my-4 text-right">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full mb-2 border border-teal-100">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>إعدادات أمان المشرف</span>
            </div>
            <h3 className="text-xl font-black text-slate-800">تغيير اسم المستخدم وكلمة المرور</h3>
            <p className="text-xs text-slate-500 mt-1">
              يلزم إدخال كلمة المرور الحالية أولاً للتحقق (كلمة السر الحالية: <span className="font-mono text-teal-700 font-bold">{adminCreds.password}</span>)، ثم كتابة اسم المستخدم وكلمة السر الجديدة وتأكيدها.
            </p>
          </div>

          <form onSubmit={handleUpdateAccountSettings} className="space-y-4">
            {/* Active User Badge */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">اسم المستخدم المعتمد حالياً:</span>
              <span className="text-xs font-black text-teal-800 bg-white px-3.5 py-1.5 rounded-xl border border-teal-200 font-mono shadow-2xs">
                {adminCreds.username}
              </span>
            </div>

            {/* Current Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                كلمة السر الحالية للتحقق (إجباري) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة السر الحالية للتأكد..."
                  className="w-full px-4 py-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:border-teal-600 focus:bg-white outline-hidden transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            <hr className="border-slate-100 my-2" />

            {/* New Username Field */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                اسم المستخدم الجديد <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  placeholder="أدخل اسم المستخدم الجديد..."
                  className="w-full px-4 py-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-teal-600 focus:bg-white outline-hidden transition"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* New Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  كلمة السر الجديدة <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="كلمة السر الجديدة..."
                    className="w-full px-4 py-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:border-teal-600 focus:bg-white outline-hidden transition"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  تأكيد كلمة السر الجديدة <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmNewPasswordInput}
                    onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                    placeholder="أعد كتابة كلمة السر..."
                    className="w-full px-4 py-2.5 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:border-teal-600 focus:bg-white outline-hidden transition"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>حفظ وتحديث بيانات الحساب 🔑</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL FOR ADDING NEW ITEMS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-800 text-base">
                {header.addBtnLabel}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-4">

              {/* 1. MANDATORY DROPDOWN MENU FOR TARGET PUBLISHING SECTION */}
              {activeAdminTab !== 'reports' && activeAdminTab !== 'appreciation' && activeAdminTab !== 'operational' && (
                <div className="bg-teal-50/80 p-3.5 rounded-2xl border border-teal-200 space-y-1.5 text-right">
                  <label className="block text-xs font-extrabold text-teal-900 flex items-center gap-1.5">
                    <FolderOutput className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>اختر قسم النشر في الموقع (إجباري) <span className="text-rose-500">*</span></span>
                  </label>
                  <select
                    value={targetPublishSection}
                    onChange={(e: any) => setTargetPublishSection(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-teal-300 rounded-xl text-xs font-extrabold text-teal-950 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-hidden shadow-2xs cursor-pointer"
                  >
                    <option value="gallery">🖼️ معرض الصور</option>
                    <option value="coverages">📸📹 التغطيات الإعلامية</option>
                    <option value="initiatives">🌱 المبادرات</option>
                    <option value="news">📰 الأخبار والإعلانات</option>
                    <option value="programs">🎯 البرامج والفعاليات</option>
                    <option value="achievements">🏆 إنجازات الروضة</option>
                  </select>
                  <p className="text-[10px] text-teal-700 font-medium leading-relaxed">
                    سيتم إدراج الصور والفيديوهات مباشرة داخل هذا القسم ليظهر فوراً لزوار الموقع.
                  </p>
                </div>
              )}

              {/* 2. EXPLICIT CONTENT TYPE SELECTION (صورة / مقطع فيديو) */}
              {activeAdminTab !== 'reports' && activeAdminTab !== 'appreciation' && activeAdminTab !== 'operational' && (
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-right">
                  <label className="block text-xs font-extrabold text-slate-800 flex items-center justify-between">
                    <span>تحديد نوع المرفق (صورة أم فيديو) <span className="text-rose-500">*</span></span>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      مطلوب للتغذية والمشغل
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { setUploadContentType('image'); setCovType('photo'); }}
                      className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                        uploadContentType === 'image'
                          ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>🖼️ صورة فوتوغرافية</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setUploadContentType('video'); setCovType('video'); }}
                      className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                        uploadContentType === 'video'
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>🎥 مقطع فيديو مرئي</span>
                    </button>
                  </div>
                </div>
              )}

              {/* MAIN FILE UPLOADER FOR SELECTED CONTENT TYPE */}
              {activeAdminTab !== 'reports' && activeAdminTab !== 'appreciation' && activeAdminTab !== 'operational' && (
                <FileUploadBox
                  label={`رفع / اختيار المرفق الحقيقي (${uploadContentType === 'video' ? 'مقطع فيديو مرئي 🎥' : 'صورة فوتوغرافية 🖼️'}) من الجوال/الكمبيوتر 📁`}
                  acceptTypes={uploadContentType === 'video' ? 'video' : 'image'}
                  valueUrl={uploadedFileUrl || photoUrl || covUrl || newsImage || initImage || eventImage}
                  onChangeUrl={(url) => {
                    setUploadedFileUrl(url);
                    setPhotoUrl(url);
                    setCovUrl(url);
                    setNewsImage(url);
                    setInitImage(url);
                    setEventImage(url);
                  }}
                />
              )}

              {/* 3. OPTIONAL CAPTION / DESCRIPTION FIELD */}
              {activeAdminTab !== 'reports' && activeAdminTab !== 'appreciation' && activeAdminTab !== 'operational' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    شرح الصورة / الفيديو <span className="text-slate-400 font-normal">(اختياري)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="اكتب شرحاً أو وصفاً مختصراً يظهر أسفل الصورة أو الفيديو في الواجهة العامة..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-teal-600 focus:bg-white outline-hidden"
                  />
                </div>
              )}
              
              {/* News Form */}
              {activeAdminTab === 'news' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">عنوان الخبر</label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="عنوان الخبر..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">التصنيف</label>
                    <select
                      value={newsCategory}
                      onChange={(e: any) => setNewsCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="خبر هام">خبر هام</option>
                      <option value="إعلان">إعلان</option>
                      <option value="عاجل">عاجل</option>
                      <option value="فعالية">فعالية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">تفاصيل الخبر</label>
                    <textarea
                      rows={3}
                      required
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="نص الخبر بالتفصيل..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              {/* Coverage Form */}
              {activeAdminTab === 'coverages' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">عنوان التغطية</label>
                    <input
                      type="text"
                      required
                      value={covTitle}
                      onChange={(e) => setCovTitle(e.target.value)}
                      placeholder="عنوان التغطية الإعلامية..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">نوع التغطية</label>
                    <select
                      value={covType}
                      onChange={(e: any) => setCovType(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="video">فيديو 📹</option>
                      <option value="photo">تصوير 📷</option>
                    </select>
                  </div>
                </>
              )}

              {/* Gallery Form */}
              {activeAdminTab === 'gallery' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">عنوان الصورة</label>
                    <input
                      type="text"
                      required
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      placeholder="عنوان الصورة..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">اسم الألبوم</label>
                    <input
                      type="text"
                      value={photoAlbum}
                      onChange={(e) => setPhotoAlbum(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              {/* Initiative Form */}
              {activeAdminTab === 'initiatives' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">اسم المبادرة</label>
                    <input
                      type="text"
                      required
                      value={initTitle}
                      onChange={(e) => setInitTitle(e.target.value)}
                      placeholder="اسم المبادرة 🌱"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span className="text-slate-800">نسبة إنجاز المبادرة (%) <span className="text-rose-500">*</span></span>
                      <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-xs">
                        {initProgress}%
                      </span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={initProgress}
                        onChange={(e) => setInitProgress(Number(e.target.value))}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={initProgress}
                        onChange={(e) => setInitProgress(Math.min(100, Math.max(0, Number(e.target.value))))}
                        className="w-20 px-2 py-1.5 border border-slate-200 rounded-xl text-xs font-extrabold text-center bg-slate-50 text-slate-800"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {[25, 50, 75, 100].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setInitProgress(pct)}
                          className={`px-3 py-1 text-[11px] font-bold rounded-lg border transition cursor-pointer ${
                            initProgress === pct
                              ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Program Form */}
              {activeAdminTab === 'programs' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">اسم الفعالية</label>
                    <input
                      type="text"
                      required
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="اسم الفعالية 🎯"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              {/* Achievement Form */}
              {activeAdminTab === 'achievements' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">عنوان الإنجاز</label>
                    <input
                      type="text"
                      required
                      value={achTitle}
                      onChange={(e) => setAchTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              {/* Appreciation Form */}
              {activeAdminTab === 'appreciation' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">اسم المكرم</label>
                    <input
                      type="text"
                      required
                      value={appRecipient}
                      onChange={(e) => setAppRecipient(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">نص بطاقة الشكر</label>
                    <textarea
                      rows={2}
                      required
                      value={appMessage}
                      onChange={(e) => setAppMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              {/* Report Form */}
              {activeAdminTab === 'reports' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">عنوان التقرير / الملف</label>
                    <input
                      type="text"
                      required
                      value={repTitle}
                      onChange={(e) => setRepTitle(e.target.value)}
                      placeholder="عنوان الملف..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <FileUploadBox
                    label="رفع / اختيار ملف التقرير (PDF / Word / Excel / PowerPoint) 📄"
                    acceptTypes="document"
                    valueUrl={repUrl}
                    onChangeUrl={setRepUrl}
                    onFileMetadataChange={(meta) => {
                      setRepSize(meta.size);
                      if (meta.type === 'DOCX') setRepType('DOCX');
                      else if (meta.type === 'PPTX') setRepType('PPTX');
                      else if (meta.type === 'XLSX') setRepType('XLSX');
                      else setRepType('PDF');
                    }}
                  />
                </>
              )}

              {/* Operational Form */}
              {activeAdminTab === 'operational' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">هدف الخطة التشغيلية</label>
                    <input
                      type="text"
                      required
                      value={planGoal}
                      onChange={(e) => setPlanGoal(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-rose-700 cursor-pointer"
              >
                حفظ وإدراج بالمنصة 🌸
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT INITIATIVE MODAL */}
      {editingInitiative && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto text-right border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-800 text-base">تعديل المبادرة وزيادة نسبة الإنجاز 🌱</h3>
              </div>
              <button
                onClick={() => setEditingInitiative(null)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedPct = Number(editingInitiative.progressPercentage);
                const updatedStatus = updatedPct >= 100 ? 'مكتملة' : editingInitiative.status;
                updateInitiative(editingInitiative.id, {
                  ...editingInitiative,
                  progressPercentage: updatedPct,
                  status: updatedStatus
                });
                showToast('تم تحديث بيانات المبادرة ونسبة الإنجاز بنجاح! 🌱');
                setEditingInitiative(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان المبادرة:</label>
                <input
                  type="text"
                  required
                  value={editingInitiative.title}
                  onChange={(e) => setEditingInitiative({ ...editingInitiative, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">وصف المبادرة:</label>
                <textarea
                  rows={3}
                  required
                  value={editingInitiative.description}
                  onChange={(e) => setEditingInitiative({ ...editingInitiative, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الفئة المستهدفة:</label>
                <input
                  type="text"
                  required
                  value={editingInitiative.targetGroup}
                  onChange={(e) => setEditingInitiative({ ...editingInitiative, targetGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Progress Percentage Adjustment (%) */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-emerald-900 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    نسبة إنجاز المبادرة الحالية:
                  </span>
                  <span className="text-emerald-700 text-sm font-black">{editingInitiative.progressPercentage}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editingInitiative.progressPercentage}
                  onChange={(e) => {
                    const pct = Number(e.target.value);
                    setEditingInitiative({
                      ...editingInitiative,
                      progressPercentage: pct,
                      status: pct >= 100 ? 'مكتملة' : pct > 0 ? 'قيد التنفيذ' : 'مخطط لها'
                    });
                  }}
                  className="w-full accent-emerald-600 cursor-pointer"
                />

                {/* Quick Percentage Presets */}
                <div className="flex items-center justify-between gap-1.5 pt-1">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        setEditingInitiative({
                          ...editingInitiative,
                          progressPercentage: pct,
                          status: pct >= 100 ? 'مكتملة' : 'قيد التنفيذ'
                        });
                      }}
                      className={`flex-1 py-1 px-2 rounded-xl text-[10px] font-extrabold border transition cursor-pointer ${
                        editingInitiative.progressPercentage === pct
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">حالة المبادرة:</label>
                <select
                  value={editingInitiative.status}
                  onChange={(e) => setEditingInitiative({ ...editingInitiative, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-bold text-slate-800"
                >
                  <option value="قيد التنفيذ">قيد التنفيذ</option>
                  <option value="مكتملة">مكتملة</option>
                  <option value="مخطط لها">مخطط لها</option>
                </select>
              </div>

              <FileUploadBox
                label="تعديل/تغيير صورة المبادرة 🌱"
                acceptTypes="image"
                valueUrl={editingInitiative.image}
                onChangeUrl={(url) => setEditingInitiative({ ...editingInitiative, image: url })}
              />

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition text-xs cursor-pointer"
                >
                  حفظ وتحديث المبادرة 🌱
                </button>
                <button
                  type="button"
                  onClick={() => setEditingInitiative(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT OPERATIONAL PLAN MODAL */}
      {editingPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto text-right border border-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-slate-800 text-base">تعديل نسبة إنجاز الخطة التشغيلية 🗓️</h3>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const rate = Number(editingPlan.completionRate);
                const status = rate >= 100 ? 'تم الإنجاز' : editingPlan.status;
                updateOperationalPlan(editingPlan.id, {
                  ...editingPlan,
                  completionRate: rate,
                  status
                });
                showToast('تم تحديث نسبة الإنجاز والهدف بالخطة التشغيلية بنجاح! 🗓️');
                setEditingPlan(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">هدف الخطة التشغيلية:</label>
                <input
                  type="text"
                  required
                  value={editingPlan.goalTitle}
                  onChange={(e) => setEditingPlan({ ...editingPlan, goalTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الفصل الدراسي:</label>
                  <select
                    value={editingPlan.term}
                    onChange={(e) => setEditingPlan({ ...editingPlan, term: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-bold"
                  >
                    <option value="الفصل الأول">الفصل الأول</option>
                    <option value="الفصل الثاني">الفصل الثاني</option>
                    <option value="الفصل الثالث">الفصل الثالث</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الجهة المنفذة:</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.responsibleParty}
                    onChange={(e) => setEditingPlan({ ...editingPlan, responsibleParty: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Completion Rate Slider & Presets */}
              <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-teal-900 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    نسبة الإنجاز المحققة:
                  </span>
                  <span className="text-teal-700 text-sm font-black">{editingPlan.completionRate}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editingPlan.completionRate}
                  onChange={(e) => {
                    const rate = Number(e.target.value);
                    setEditingPlan({
                      ...editingPlan,
                      completionRate: rate,
                      status: rate >= 100 ? 'تم الإنجاز' : 'جاري العمل'
                    });
                  }}
                  className="w-full accent-teal-600 cursor-pointer"
                />

                <div className="flex items-center justify-between gap-1.5 pt-1">
                  {[25, 50, 75, 100].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        setEditingPlan({
                          ...editingPlan,
                          completionRate: rate,
                          status: rate >= 100 ? 'تم الإنجاز' : 'جاري العمل'
                        });
                      }}
                      className={`flex-1 py-1 px-2 rounded-xl text-[10px] font-extrabold border transition cursor-pointer ${
                        editingPlan.completionRate === rate
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-white text-teal-800 border-teal-200 hover:bg-teal-100'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">حالة الإنجاز:</label>
                <select
                  value={editingPlan.status}
                  onChange={(e) => setEditingPlan({ ...editingPlan, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-bold"
                >
                  <option value="جاري العمل">جاري العمل</option>
                  <option value="تم الإنجاز">تم الإنجاز</option>
                  <option value="مؤجل">مؤجل</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition text-xs cursor-pointer"
                >
                  حفظ نسبة الإنجاز والتعديلات 🗓️
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
