import {
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

export const initialPlatformInfo: PlatformInfo = {
  name: 'المنصة الإعلامية للروضة الأولى بالقنفذة 🌸',
  schoolName: 'الروضة الأولى بالقنفذة',
  region: 'إدارة التعليم بمحافظة القنفذة',
  welcomeMessage: 'مرحباً بكم في نافذة الروضة الأولى بالقنفذة الإعلامية للتواصل والتميز التعليمي والتربوي.',
  aboutText: 'تهدف المنصة الإعلامية للروضة الأولى بالقنفذة إلى إبراز المبادرات والأنشطة والفعاليات والبرامج التعليمية والتربوية، وتوثيق إنجازات أطفالنا وكوادرنا التعليمية، وتسهيل التواصل المستمر مع أولياء الأمور والمجتمع المحلي.',
  phone: '0177321450',
  email: 'info@qunfudhah-kg1.edu.sa',
  address: 'المملكة العربية السعودية - منطقة مكة المكرمة - محافظة القنفذة - حي الشاطئ',
  whatsappLink: 'https://wa.me/966177321450',
  callLink: 'tel:0177321450',
  mapLocationUrl: 'https://maps.google.com/?q=19.1278,41.0789',
  heroTitle: 'نزرع القيم ونبني مستقبل براعم القنفذة الواعد',
  heroTag: '🌸 بيئة تعليمية جاذبة ومحفزة',
  heroCardMessage: 'نرحب بجميع أفكار وملاحظات أولياء الأمور للارتقاء بالمسيرة التعليمية.',
  stats: {
    totalStudents: 185,
    totalTeachers: 14,
    totalEvents: 42,
    totalInitiatives: 12
  }
};

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'انطلاق فعاليات أسبوع الطفل الخليجي في الروضة الأولى بالقنفذة',
    content: 'تحت رعاية إدارة التعليم بالقنفذة، دشنت الروضة الأولى بالقنفذة فعاليات أسبوع الطفل الخليجي ببرامج تفاعلية وشاملة ركزت على تطوير مهارات الابتكار واللعب الهادف لدى براعم الروضة وسط أجواء مفعمة بالمرح والحيوية.',
    category: 'خبر هام',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-08-05',
    views: 342,
    featured: true
  },
  {
    id: 'news-2',
    title: 'تدشين مبادرة "براعمنا تقرأ وتفكر" لتعزيز القرائية المبكرة',
    content: 'أطلقت الروضة الأولى مبادرة تربوية جديدة تهدف لتنمية حب القراءة والقصص لدى الأطفال من خلال ركن القراءة التفاعلي والكتب المصورة التفاعلية بالتعاون مع معلمات الروضة وبمشاركة مميزة من أمهات الأطفال.',
    category: 'إعلان',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-08-01',
    views: 215,
    featured: true
  },
  {
    id: 'news-3',
    title: 'افتتاح ركن التعلم الرقمي التفاعلي بالروضة',
    content: 'تم بحمد الله تدشين ركن الذكاء والتقنية الرقمية التفاعلية المزود بشاشات تعمل باللمس وألعاب تعليمية تطور التفكير المنطقي والرياضيات المبكرة لأطفال المرحلة.',
    category: 'خبر هام',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-07-28',
    views: 189
  },
  {
    id: 'news-4',
    title: 'تكريم الأطفال المشاركين في مسابقة التلوين والرسم البيئي',
    content: 'كرّمت إدارة الروضة براعمها الصغار الذين أبدعوا في رسم لوحات يعبرون فيها عن حب الطبيعة ونظافة البيئة البحرية بالقنفذة ضمن الأنشطة اللاصفية.',
    category: 'فعالية',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    publishDate: '2026-07-20',
    views: 270
  }
];

export const initialMediaCoverages: MediaCoverageItem[] = [
  {
    id: 'coverage-1',
    title: 'تقرير مصور: جولة صحفية داخل أركان التعلم بالروضة الأولى بالقنفذة',
    type: 'video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    coverageDate: '2026-08-03',
    publisher: 'قناة القنفذة الإعلامية',
    description: 'تغطية مرئية خاصة تسلط الضوء على البيئة الجاذبة وأساليب التعلم الحديثة المطبقة في الروضة الأولى بالقنفذة.'
  },
  {
    id: 'coverage-2',
    title: 'تغطية فوتوغرافية شاملة لليوم العالمي للدفاع المدني والسلامة',
    type: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    coverageDate: '2026-07-25',
    publisher: 'المركز الإعلامي للتعليم بالقنفذة',
    description: 'تغطية مصورة لاستعراض خطة الإخلاء الوهمية وتدريب الأطفال على وسائل السلامة المنزلية والمدرسية.'
  },
  {
    id: 'coverage-3',
    title: 'فيديو توثيقي: مهرجان التراث والأكل الشعبي للطفل القنفذي',
    type: 'video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    coverageDate: '2026-07-15',
    publisher: 'سناب التعليم بقنفذة',
    description: 'استعراض مبهج للزي الشعبي والمأكولات التراثية بمشاركة الأطفال والأمهات لترسيخ الهوية الوطنية الأصيلة.'
  }
];

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'ابتسامات براعم الروضة في ركن المكعبات والبناء',
    album: 'الأنشطة اليومية',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-04',
    likesCount: 88
  },
  {
    id: 'photo-2',
    title: 'تجربة الزراعة الصغيرة في حديقة الروضة',
    album: 'مبادرة روضتي الخضراء',
    imageUrl: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=800&q=80',
    date: '2026-08-02',
    likesCount: 112
  },
  {
    id: 'photo-3',
    title: 'ورشة التشكيل بالصلصال والتلوين باليدين',
    album: 'معرض الفنون والتعبير',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-29',
    likesCount: 95
  },
  {
    id: 'photo-4',
    title: 'احتفال الأطفال بيوم التأسيس السعودي',
    album: 'المناسبات الوطنية',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-22',
    likesCount: 154
  },
  {
    id: 'photo-5',
    title: 'تمارين الرياضة الصباحية والرشاقة للطفل',
    album: 'النشاط البدني والصحة',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-18',
    likesCount: 76
  },
  {
    id: 'photo-6',
    title: 'حفل تخرج براعم الروضة وتوزيع الهدايا',
    album: 'حفلات الختام',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    date: '2026-07-10',
    likesCount: 210
  }
];

export const initialInitiatives: InitiativeItem[] = [
  {
    id: 'init-1',
    title: 'مبادرة "روضتي الخضراء 🌱"',
    description: 'مشروع بيئي يهدف لتعليم الأطفال مفاهيم التشجير ورعاية النباتات الصغيرة داخل حديقة الروضة بمشاركة أسرهم.',
    targetGroup: 'أطفال الروضة وأولياء الأمور',
    progressPercentage: 85,
    startDate: '2026-06-01',
    endDate: '2026-09-30',
    status: 'قيد التنفيذ',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'init-2',
    title: 'مبادرة "جسمي السليم ووجبتي الصحية 🥗"',
    description: 'توعية الأطفال بأهمية الوجبة التغذوية المتكاملة وتجنب المشروبات الغازية والأطعمة الضارة من خلال أنشطة تفاعلية أسبوعية.',
    targetGroup: 'جميع الفصول والأسر',
    progressPercentage: 100,
    startDate: '2026-05-10',
    endDate: '2026-07-30',
    status: 'مكتملة',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'init-3',
    title: 'مبادرة "المصمم الصغير والذكاء الرقمي 💻"',
    description: 'برنامج تدريبي مبسط يكتشف موهوبي الرسم التقني والتركيب الإلكتروني الآمن من عمر 4 إلى 6 سنوات.',
    targetGroup: 'الموهوبون بالروضة',
    progressPercentage: 40,
    startDate: '2026-08-01',
    endDate: '2026-11-15',
    status: 'قيد التنفيذ',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialProgramEvents: ProgramEventItem[] = [
  {
    id: 'prog-1',
    title: 'برنامج "تاجر المستقبل والبيع التفاعلي 🎯"',
    description: 'فعالية تحاكي سوقاً صغيراً يمارس فيه الطفل البيع والشراء بالنقود التخيلية لتعزيز الثقة بالنفس والعمليات الحسابية المبكرة.',
    eventDate: '2026-08-18',
    location: 'الصالة الرياضية بالروضة',
    category: 'تعليمي',
    attendeesCount: 150,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    status: 'قادمة'
  },
  {
    id: 'prog-2',
    title: 'ملتقى "طبيبي الصغير والإسعافات الأولى 🩺"',
    description: 'برنامج توعوي صحي بالتعاون مع صحة القنفذة لتدريب الأطفال على النظافة الشخصية والإسعار الأولي البسيط.',
    eventDate: '2026-08-10',
    location: 'مسرح الروضة الأولى',
    category: 'صحي',
    attendeesCount: 120,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    status: 'مستمرة'
  },
  {
    id: 'prog-3',
    title: 'المهرجان الثقافي للتراث البحري بساحل القنفذة 🏖️',
    description: 'فعالية تربوية تستحضر تاريخ القنفذة البحري وصيد اللؤلؤ من خلال أنشطة فنية وأهازيج شعبية شائقة.',
    eventDate: '2026-07-12',
    location: 'الساحة الخارجية للروضة',
    category: 'وطني',
    attendeesCount: 200,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    status: 'منتهية'
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'المركز الأول في تميز البيئات الجاذبة برياض الأطفال',
    recipient: 'إدارة الروضة الأولى بالقنفذة',
    awardLevel: 'على مستوى القنفذة',
    date: '2026-06-15',
    description: 'حصول الروضة على الوسام الذهبي في تقييم البيئات الصفية واللاصفية المحفزة للتعلم من قسم رياض الأطفال بإدارة التعليم.',
    icon: 'Trophy'
  },
  {
    id: 'ach-2',
    title: 'درع التميز للإعلام المدرسي الرقمي 🌸',
    recipient: 'الفريق الإعلامي بالروضة',
    awardLevel: 'على مستوى المنطقة',
    date: '2026-05-20',
    description: 'تكريم المنصة الإعلامية للروضة الأولى كأفضل بيئة توثيقية إلكترونية نشطة وموثقة للفعاليات التربوية.',
    icon: 'Award'
  },
  {
    id: 'ach-3',
    title: 'جائزة المعلمة المبدعة في تطبيق استراتيجيات التعلم باللعب',
    recipient: 'أ. نورة القحطاني (معلمة بالروضة)',
    awardLevel: 'على مستوى القنفذة',
    date: '2026-04-10',
    description: 'تقديراً لإبتكارها استراتيجيات تفاعلية ساهمت فيرفع الجاهزية القرائية واللغوية لأطفال الروضة.',
    icon: 'Star'
  }
];

export const initialAppreciations: AppreciationItem[] = [
  {
    id: 'app-1',
    recipientName: 'أ. صالحة العمري',
    role: 'معلمة',
    message: 'جزيل الشكر والتقدير لجهودك المخلصة في تنظيم معرض الفنون والتعبير وإبراز مواهب أطفال الفصل الأول.',
    date: '2026-08-02',
    badge: 'وسام العطاء والمبادرة ⭐'
  },
  {
    id: 'app-2',
    recipientName: 'أسر أطفال الروضة الأولى',
    role: 'ولي أمر',
    message: 'نثمن عالياً شراكتكم الفاعلة وحضوركم القوي في مبادرة روضتي الخضراء ودعمكم المستمر لبرامجنا.',
    date: '2026-07-28',
    badge: 'شريك النجاح التربوي 🤝'
  },
  {
    id: 'app-3',
    recipientName: 'مستشفى القنفذة العام - قسم التوعية',
    role: 'جهة داعمة',
    message: 'كل الشكر والامتنان لمشاركتكم القيمة في ملتقى طبيبي الصغير وتقديم الهدايا التوعوية للأطفال.',
    date: '2026-07-15',
    badge: 'شهادة شكر وتقدير 📜'
  }
];

export const initialMediaReports: MediaReportFile[] = [
  {
    id: 'rep-1',
    title: 'التقرير الإعلامي السنوي لمنجزات الروضة الأولى 1447-1448هـ',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    uploadDate: '2026-08-01',
    downloadCount: 142,
    category: 'تقرير إعلامي'
  },
  {
    id: 'rep-2',
    title: 'الدليل التنفيذي لشراكة الروضة مع الأسرة والمجتمع',
    fileType: 'PDF',
    fileSize: '2.8 MB',
    uploadDate: '2026-07-20',
    downloadCount: 98,
    category: 'نشرة توعوية'
  },
  {
    id: 'rep-3',
    title: 'ملف التغطيات المصورة والتوثيق المرئي للفصل الدراسي الأول',
    fileType: 'PPTX',
    fileSize: '12.5 MB',
    uploadDate: '2026-07-10',
    downloadCount: 210,
    category: 'ملف ختامي'
  }
];

export const initialOperationalPlans: OperationalPlanItem[] = [
  {
    id: 'plan-1',
    goalTitle: 'تهيئة وتطوير البيئة الصفية وأركان التعلم بالتقنيات الحديثة',
    term: 'الفصل الأول',
    responsibleParty: 'لجنة التطوير والجودة بالروضة',
    executionPeriod: 'من الأسبوع 1 إلى الأسبوع 4',
    status: 'تم الإنجاز',
    completionRate: 100
  },
  {
    id: 'plan-2',
    goalTitle: 'تنفيذ 6 مبادرات مجتمعية وتربوية بمشاركة أولياء الأمور',
    term: 'الفصل الأول',
    responsibleParty: 'فريق الشراكة المجتمعية',
    executionPeriod: 'طوال الفصل الدراسي',
    status: 'جاري العمل',
    completionRate: 75
  },
  {
    id: 'plan-3',
    goalTitle: 'توثيق جميع الأنشطة والبرامج عبر المنصة الإعلامية يومياً',
    term: 'الفصل الثاني',
    responsibleParty: 'المنسقة الإعلامية بالروضة',
    executionPeriod: 'أسبوعياً',
    status: 'جاري العمل',
    completionRate: 90
  },
  {
    id: 'plan-4',
    goalTitle: 'إقامة معرض الختام وتكريم الموهوبين والأمهات الداعمات',
    term: 'الفصل الثالث',
    responsibleParty: 'إدارة الروضة والكادر التدريسي',
    executionPeriod: 'نهاية العام الدراسي',
    status: 'مؤجل',
    completionRate: 15
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    senderName: 'فاطمة محمد الزهراني',
    email: 'fatimah.z@gmail.com',
    phone: '0501234567',
    subject: 'استفسار عن التسجيل في الروضة الأولى للعام الجديد',
    message: 'السلام عليكم ورحمة الله وبركاته، أود الاستفسار عن المواعيد والشروط المطلوبة لتسجيل طفلي في الروضة الأولى بالقنفذة، شاكرة لكم جهودكم المباركة.',
    sentDate: '2026-08-08 10:30',
    isRead: false
  },
  {
    id: 'msg-2',
    senderName: 'عبدالله السيد (مركز الأحياء بساحل القنفذة)',
    email: 'abdullah@neighborhood.sa',
    phone: '0559876543',
    subject: 'طلب مقترح شراكة في مبادرة روضتي الخضراء',
    message: 'تحية طيبة، يسعدنا في مركز الأحياء التعاون معكم بتقديم 100 شتلة منزلية لأطفال الروضة لتفعيل المبادرة البيئية نأمل التواصل لتنسيق الموعد.',
    sentDate: '2026-08-06 14:15',
    isRead: true,
    replied: true
  },
  {
    id: 'msg-3',
    senderName: 'أم الطفل خالد الشهري',
    email: 'om.khaled@outlook.com',
    phone: '0543218765',
    subject: 'رسالة شكر وامتنان لكادر الروضة المتميز',
    message: 'أتقدم بخالص الشكر والتقدير لمعلمة فصل الأمل على حسن التعامل والرعاية الفائقة مع طفلي خالد، بارك الله في جهودكم.',
    sentDate: '2026-08-02 09:00',
    isRead: true
  }
];
