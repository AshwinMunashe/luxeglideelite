import {
  Car, ShieldCheck, Clock, User, MapPin, Star, Users, Briefcase,
  Award, Gem, Sparkles, HeartHandshake, MessageCircle, CalendarCheck,
  BadgeCheck, Radar, Headset, FileCheck,
} from "lucide-react";

/* ─── CONSTANTS ─────────────────────────────────────────────── */
export const PHONE = "+971562427288";
export const WHATSAPP = "971562427288";
export const EMAIL = "Info@luxeglideelite.ae";
export const ADDRESS = {
  en: "Office 160, Exchange Tower, Al Mustaqbal Street, Business Bay, Dubai",
  ar: "مكتب 160، برج التبادل، شارع المستقبل، الخليج التجاري، دبي",
};
export const MAPS_URL = "https://maps.app.goo.gl/5ArcqpETDTJ6N1sT8";

/* ─── FLEET ──────────────────────────────────────────────────── */
export const FLEET = [
  {
    slug: "mercedes-s-class",
    name: { en: "Mercedes S-Class", ar: "مرسيدس S كلاس" },
    tagline: { en: "Luxury Comfort", ar: "راحة فاخرة" },
    category: { en: "Executive Sedan", ar: "سيدان تنفيذية" },
    image: { src: "/images/cars.png", position: "51% 42%", scale: 2.2 },
    specs: {
      engine: { en: "V8 Biturbo", ar: "محرك V8 توين تيربو" },
      power: { en: "496 HP", ar: "496 حصان" },
      seats: { en: "4 Seats", ar: "4 مقاعد" },
      feature: { en: "Massage Seats", ar: "مقاعد تدليك" },
    },
  },
  {
    slug: "bmw-7-series",
    name: { en: "BMW 7 Series", ar: "بي إم دبليو الفئة السابعة" },
    tagline: { en: "Driven by Excellence", ar: "قيادة بامتياز" },
    category: { en: "Executive Sedan", ar: "سيدان تنفيذية" },
    image: { src: "/images/luxury-sedan.jpg", position: "50% 62%", scale: 1.15 },
    specs: {
      engine: { en: "3.0L TwinPower", ar: "محرك 3.0 لتر توين باور" },
      power: { en: "375 HP", ar: "375 حصان" },
      seats: { en: "5 Seats", ar: "5 مقاعد" },
      feature: { en: "Executive Lounge", ar: "مقصورة تنفيذية" },
    },
  },
  {
    slug: "rolls-royce-ghost",
    name: { en: "Rolls-Royce Ghost", ar: "رولز رويس غوست" },
    tagline: { en: "The Art of Effortless", ar: "فن السفر السلس" },
    category: { en: "Ultra Luxury", ar: "فخامة استثنائية" },
    image: { src: "/images/showroom.png", position: "50% 35%", scale: 1.6 },
    specs: {
      engine: { en: "6.75L V12", ar: "محرك V12 سعة 6.75 لتر" },
      power: { en: "563 HP", ar: "563 حصان" },
      seats: { en: "4 Seats", ar: "4 مقاعد" },
      feature: { en: "Starlight Headliner", ar: "سقف النجوم المضيء" },
    },
  },
  {
    slug: "range-rover-autobiography",
    name: { en: "Range Rover Autobiography", ar: "رنج روفر أوتوبيوغرافي" },
    tagline: { en: "Commanding Presence", ar: "حضور استثنائي" },
    category: { en: "Luxury SUV", ar: "دفع رباعي فاخر" },
    image: { src: "/images/cars.png", position: "83% 42%", scale: 2.2 },
    specs: {
      engine: { en: "4.4L V8", ar: "محرك V8 سعة 4.4 لتر" },
      power: { en: "523 HP", ar: "523 حصان" },
      seats: { en: "5 Seats", ar: "5 مقاعد" },
      feature: { en: "Executive Class Seating", ar: "مقاعد الدرجة التنفيذية" },
    },
  },
  {
    slug: "cadillac-escalade",
    name: { en: "Cadillac Escalade", ar: "كاديلاك إسكاليد" },
    tagline: { en: "Bold Group Travel", ar: "سفر جماعي بأناقة" },
    category: { en: "Luxury SUV / Group", ar: "دفع رباعي فاخر / جماعي" },
    image: { src: "/images/cadillac-escalade.jpg", position: "50% 38%", scale: 1.1 },
    specs: {
      engine: { en: "6.2L V8", ar: "محرك V8 سعة 6.2 لتر" },
      power: { en: "420 HP", ar: "420 حصان" },
      seats: { en: "7 Seats", ar: "7 مقاعد" },
      feature: { en: "Curved OLED Display", ar: "شاشة OLED منحنية" },
    },
  },
  {
    slug: "mercedes-v-class",
    name: { en: "Mercedes V-Class VIP", ar: "مرسيدس V كلاس VIP" },
    tagline: { en: "Boardroom on Wheels", ar: "قاعة اجتماعات متنقلة" },
    category: { en: "Luxury MPV", ar: "فان فاخر" },
    image: { src: "/images/about-interior.webp", position: "50% 45%", scale: 1.1 },
    specs: {
      engine: { en: "2.0L Turbo Diesel", ar: "محرك ديزل توربو 2.0 لتر" },
      power: { en: "237 HP", ar: "237 حصان" },
      seats: { en: "6 Seats", ar: "6 مقاعد" },
      feature: { en: "Conference Seating", ar: "مقاعد اجتماعات" },
    },
  },
];

/* ─── SERVICES (shared: homepage cards + /services detail pages) ─── */
export const SERVICES = [
  {
    slug: "airport-transfers",
    icon: Car,
    image: { src: "/images/airport-jet.jpg", position: "50% 55%", scale: 1.05 },
    title: { en: "Airport Transfers", ar: "تحويلات المطار" },
    desc: {
      en: "Seamless pickup and drop-off with flight tracking and meet & greet service.",
      ar: "خدمة استقبال وتوصيل مع تتبع الرحلات والاستقبال الشخصي.",
    },
    long: {
      en: "Land and go straight to your chauffeur. We track your flight in real time from takeoff, so we're always at the gate — even if you're early, delayed, or rerouted. A personal meet & greet inside the terminal, luggage assistance, and a spotless vehicle waiting curbside turn the most stressful part of travel into the smoothest.\n\nThis applies just as much on the way out: we build in buffer time around Dubai traffic and security queues so you're never rushed to check-in. For connecting flights or tight layovers, tell us your onward schedule and we'll plan the route to match it.",
      ar: "اهبط وتوجّه مباشرة إلى سائقك الخاص. نتابع رحلتك لحظة بلحظة منذ الإقلاع لنكون في انتظارك دائماً، سواء وصلت مبكراً أو تأخرت أو تغيّر مسار رحلتك. استقبال شخصي داخل صالة المطار، مساعدة في الأمتعة، وسيارة نظيفة تنتظرك عند الرصيف تحوّل أكثر أجزاء السفر إرهاقاً إلى الأكثر سلاسة.\n\nينطبق الأمر ذاته عند التوجه إلى المطار: نراعي وقتاً إضافياً لازدحام دبي وإجراءات الأمن حتى لا تشعر بالاستعجال عند تسجيل الوصول. لديك رحلة متابعة أو وقت تحويل ضيق؟ أخبرنا بجدولك وسنخطط المسار وفقاً له.",
    },
    idealFor: {
      en: "Business travellers, families, and first-time visitors who want zero friction from touchdown to hotel.",
      ar: "لمسافري الأعمال والعائلات والزوار لأول مرة الذين يريدون تجربة سلسة تماماً من الهبوط إلى الفندق.",
    },
    highlights: {
      en: ["Real-time flight tracking", "Personal meet & greet at arrivals", "Complimentary waiting time", "Luggage handling included"],
      ar: ["تتبع الرحلات لحظة بلحظة", "استقبال شخصي عند الوصول", "وقت انتظار مجاني", "مساعدة في نقل الأمتعة"],
    },
  },
  {
    slug: "hourly-chauffeur",
    icon: Clock,
    image: { src: "/images/luxury-sedan.jpg", position: "50% 62%", scale: 1.15 },
    title: { en: "Hourly Chauffeur", ar: "سائق بالساعة" },
    desc: {
      en: "Flexible hourly booking for business meetings, city tours, or special occasions.",
      ar: "حجز مرن بالساعة لاجتماعات الأعمال أو جولات المدينة أو المناسبات الخاصة.",
    },
    long: {
      en: "Keep a dedicated chauffeur and vehicle on standby for as long as your day requires. Move between meetings, appointments, or errands without ever waiting for a ride — your car simply follows your schedule, parked and ready at every stop.\n\nThere's no re-booking friction between stops and no explaining your day twice to a new driver: the same chauffeur stays with you throughout, learning your pace and preferences as the hours go on. It's the closest thing to having a car and driver on your own payroll, without the overhead.",
      ar: "احتفظ بسائق وسيارة مخصصة تحت الطلب طوال يومك. تنقّل بين الاجتماعات والمواعيد والمهام دون انتظار — سيارتك تسير وفق جدولك أنت، وتكون جاهزة عند كل توقف.\n\nلا حاجة لإعادة الحجز بين المحطات، ولا لشرح يومك من جديد لسائق مختلف: يبقى معك السائق نفسه طوال الوقت، متعرفاً على إيقاعك وتفضيلاتك مع تقدم الساعات. إنها أقرب ما يكون لامتلاك سيارة وسائق خاصين بك دون أعباء التوظيف.",
    },
    idealFor: {
      en: "Executives with back-to-back meetings, visiting delegations, and anyone who hates waiting for a ride.",
      ar: "للمديرين التنفيذيين ذوي الاجتماعات المتتالية، والوفود الزائرة، وكل من يكره انتظار وسيلة نقل.",
    },
    highlights: {
      en: ["Minimum 3-hour booking", "Multiple stops, one booking", "Dedicated chauffeur throughout", "Ideal for business days"],
      ar: ["حجز لمدة 3 ساعات على الأقل", "محطات متعددة في حجز واحد", "سائق مخصص طوال الوقت", "مثالي لأيام العمل"],
    },
  },
  {
    slug: "city-tours",
    icon: MapPin,
    image: { src: "/images/dubai-skyline.jpg", position: "50% 40%", scale: 1.1 },
    title: { en: "City Tours", ar: "جولات المدينة" },
    desc: {
      en: "Explore Dubai in ultimate comfort with curated luxury city tour experiences.",
      ar: "استكشف دبي بأقصى راحة مع جولاتنا الفاخرة المصممة خصيصاً.",
    },
    long: {
      en: "See Dubai's landmarks the way they're meant to be seen — from a reclined leather seat, with a chauffeur who knows the city's best routes, viewpoints, and timing to avoid the crowds. Burj Khalifa at golden hour, Old Dubai's souks, the Palm, or a custom route built around what you actually want to see.\n\nRoutes are entirely flexible: tell us your interests — architecture, shopping, food, photography — and we'll shape the itinerary around them, with your chauffeur pacing stops so you're never rushed out of a moment worth lingering in.",
      ar: "شاهد معالم دبي كما يجب أن تُرى — من مقعد جلدي مريح، مع سائق يعرف أفضل الطرق والمواقع والتوقيت المثالي لتجنب الازدحام. برج خليفة عند الغروب، أسواق دبي القديمة، النخلة، أو مسار مخصص حول ما ترغب برؤيته فعلاً.\n\nالمسارات مرنة تماماً: أخبرنا باهتماماتك — عمارة، تسوق، طعام، تصوير — وسنُشكّل البرنامج حولها، مع سائق يضبط وتيرة التوقفات حتى لا تُستعجل في لحظة تستحق التمهّل.",
    },
    idealFor: {
      en: "First-time visitors, photographers, and anyone who wants Dubai without the tour-bus crowds.",
      ar: "للزوار لأول مرة، والمصورين، وكل من يريد اكتشاف دبي بعيداً عن ازدحام الحافلات السياحية.",
    },
    highlights: {
      en: ["Custom or curated routes", "Local chauffeur knowledge", "Half-day & full-day options", "Photo-stop friendly pacing"],
      ar: ["مسارات مخصصة أو مُعدّة مسبقاً", "خبرة سائق محلي", "خيارات نصف يوم أو يوم كامل", "توقيت مرن لالتقاط الصور"],
    },
  },
  {
    slug: "corporate-travel",
    icon: Briefcase,
    image: { src: "/images/about-interior.webp", position: "45% 45%", scale: 1.25 },
    title: { en: "Corporate Travel", ar: "السفر المؤسسي" },
    desc: {
      en: "Professional chauffeur services for executives and corporate events.",
      ar: "خدمات احترافية للمديرين التنفيذيين والفعاليات المؤسسية.",
    },
    long: {
      en: "From single-executive transfers to coordinated multi-vehicle logistics for conferences and roadshows, we handle corporate travel with the discretion, punctuality, and polish your business demands. Chauffeurs arrive briefed, dressed to your standard, and ready to blend into the background.\n\nFor recurring needs, we set up a corporate account with consolidated monthly invoicing, so your finance team isn't chasing individual receipts. Larger engagements — conferences, board visits, investor roadshows — get a dedicated coordinator managing every vehicle in the convoy.",
      ar: "من تنقلات المدير التنفيذي الفردية إلى تنسيق أسطول متعدد للمؤتمرات والفعاليات، ندير السفر المؤسسي بكل تكتم ودقة في المواعيد واحترافية تليق بأعمالكم. يصل السائقون مطلعين على التفاصيل، بالمظهر المناسب، وجاهزين للاندماج دون لفت الانتباه.\n\nللاحتياجات المتكررة، نُنشئ حساباً مؤسسياً بفوترة شهرية موحدة، حتى لا يضطر فريقكم المالي لملاحقة إيصالات منفردة. المشاريع الأكبر — المؤتمرات وزيارات مجلس الإدارة وجولات المستثمرين — تحصل على منسق مخصص يدير كل سيارة في القافلة.",
    },
    idealFor: {
      en: "Companies with recurring travel needs, conference organizers, and executive teams that value discretion.",
      ar: "للشركات ذات احتياجات السفر المتكررة، ومنظمي المؤتمرات، والفرق التنفيذية التي تقدّر التكتم.",
    },
    highlights: {
      en: ["Corporate accounts & invoicing", "Multi-vehicle event logistics", "NDA-level discretion", "Priority scheduling"],
      ar: ["حسابات مؤسسية وفوترة", "تنسيق أسطول للفعاليات", "سرية تامة", "جدولة ذات أولوية"],
    },
  },
  {
    slug: "vip-services",
    icon: Star,
    image: { src: "/images/mercedes-night.jpg", position: "50% 55%", scale: 1.15 },
    title: { en: "VIP Services", ar: "خدمات VIP" },
    desc: {
      en: "Exclusive transportation for special events, weddings, and high-profile occasions.",
      ar: "نقل حصري لكبار الشخصيات والأعراس والفعاليات الرفيعة.",
    },
    long: {
      en: "For weddings, red-carpet arrivals, or moments that call for something extraordinary, our VIP service pairs our finest vehicles with meticulous planning — decor, timing, and routing worked out in advance so the day unfolds exactly as pictured.\n\nWe coordinate directly with your wedding planner or event team on arrival timing, photo-stop locations, and even ribbon or floral dressing for the vehicle. A backup car is placed on standby for every VIP booking as standard, at no extra charge — because the one day it matters most is not the day to leave anything to chance.",
      ar: "للأعراس، والوصول على السجادة الحمراء، واللحظات التي تستحق ما هو استثنائي، تجمع خدمة VIP لدينا بين أفخم سياراتنا وتخطيط دقيق للديكور والتوقيت والمسار حتى يسير اليوم تماماً كما تخيلته.\n\nننسّق مباشرة مع منظم حفل زفافك أو فريق الفعالية بشأن توقيت الوصول ومواقع التصوير، بل وحتى تزيين السيارة بالشرائط أو الورود. توضع سيارة احتياطية جاهزة لكل حجز VIP كإجراء معتاد ودون أي رسوم إضافية — لأن اليوم الأكثر أهمية ليس اليوم المناسب لترك أي شيء للصدفة.",
    },
    idealFor: {
      en: "Weddings, red-carpet events, milestone celebrations, and anyone whose day can't afford a hiccup.",
      ar: "للأعراس، وفعاليات السجادة الحمراء، والمناسبات الكبرى، ولكل من لا يحتمل يومه أي خلل.",
    },
    highlights: {
      en: ["Bridal car dressing available", "Red-carpet arrival coordination", "Dedicated event chauffeur", "Bespoke routing & timing"],
      ar: ["تزيين سيارة العروس متاح", "تنسيق وصول على السجادة الحمراء", "سائق مخصص للفعالية", "توقيت ومسار مصمم خصيصاً"],
    },
  },
  {
    slug: "group-transport",
    icon: Users,
    image: { src: "/images/cars.png", position: "50% 42%", scale: 1.15 },
    title: { en: "Group Transport", ar: "النقل الجماعي" },
    desc: {
      en: "Premium fleet options for group travel with comfort and style.",
      ar: "خيارات أسطول متميزة للسفر الجماعي براحة وأناقة.",
    },
    long: {
      en: "Moving a group shouldn't mean compromising on comfort. Our luxury MPVs and SUVs keep families, delegations, and wedding parties together — with the same standard of service as our sedans, right down to the detailing and the chauffeur's manner.\n\nFor larger parties, we coordinate a multi-car convoy departing and arriving in sync, with a single point of contact managing the whole group so you're not juggling separate bookings or drivers.",
      ar: "نقل مجموعة لا يعني التنازل عن الراحة. سياراتنا الفاخرة متعددة الاستخدامات تُبقي العائلات والوفود وأطراف الأعراس معاً، بنفس مستوى الخدمة في سياراتنا الفردية، وصولاً إلى تفاصيل العناية بالسيارة وأسلوب السائق.\n\nللمجموعات الأكبر، ننسّق قافلة من عدة سيارات تنطلق وتصل معاً، مع نقطة تواصل واحدة تدير المجموعة بأكملها حتى لا تضطر لإدارة حجوزات أو سائقين منفصلين.",
    },
    idealFor: {
      en: "Families, wedding parties, and delegations of 6+ who want to travel together without splitting up.",
      ar: "للعائلات، وأطراف الأعراس، والوفود التي يزيد عددها عن 6 أشخاص ويريدون السفر معاً دون تفرّق.",
    },
    highlights: {
      en: ["Fits 6–7 passengers", "Coordinated multi-car convoys", "Same-driver consistency", "Luggage-friendly configurations"],
      ar: ["تتسع لـ 6-7 ركاب", "تنسيق قوافل متعددة السيارات", "نفس السائق طوال الرحلة", "تجهيزات مناسبة للأمتعة"],
    },
  },
];

/* ─── TESTIMONIALS ───────────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    name: { en: "Amira K.", ar: "أميرة ك." },
    role: { en: "Business Traveller", ar: "مسافرة أعمال" },
    quote: {
      en: "Flawless from the airport gate to the hotel lobby. The chauffeur was waiting despite my flight landing 40 minutes early.",
      ar: "تجربة لا تشوبها شائبة من بوابة المطار إلى ردهة الفندق. كان السائق بانتظاري رغم هبوط رحلتي مبكراً بـ40 دقيقة.",
    },
  },
  {
    name: { en: "James O.", ar: "جيمس أو." },
    role: { en: "Corporate Client", ar: "عميل مؤسسي" },
    quote: {
      en: "We run our entire roadshow logistics through LuxeGlide now. Punctual, discreet, and the vehicles always look showroom-fresh.",
      ar: "أصبحنا نعتمد على لكس غلايد لكامل لوجستيات فعالياتنا. دقة في المواعيد، تكتم تام، وسيارات تبدو دائماً وكأنها خرجت للتو من المعرض.",
    },
  },
  {
    name: { en: "Farah S.", ar: "فرح س." },
    role: { en: "Wedding Client", ar: "عميلة زفاف" },
    quote: {
      en: "They dressed the Rolls-Royce exactly as we pictured it and had a backup car on standby without us even asking. That's real attention to detail.",
      ar: "زيّنوا الرولز رويس تماماً كما تخيلناها، وجهّزوا سيارة احتياطية دون أن نطلب ذلك. هذا هو الاهتمام الحقيقي بالتفاصيل.",
    },
  },
  {
    name: { en: "David L.", ar: "ديفيد ل." },
    role: { en: "Repeat Guest", ar: "عميل دائم" },
    quote: {
      en: "Booked hourly for a week of meetings across the city. Never once had to wait — the car was always exactly where and when I needed it.",
      ar: "حجزت بالساعة لأسبوع كامل من الاجتماعات في أنحاء المدينة. لم أنتظر ولو لمرة واحدة — كانت السيارة دائماً في المكان والوقت المطلوبين.",
    },
  },
];

/* ─── ABOUT PAGE — extended content ─────────────────────────── */
export const ABOUT_EXTRA = {
  en: {
    heroTag: "OUR STORY",
    heroTitle: "Crafted for the Discerning",
    heroSub: "Founded in 2026, LuxeGlide is Dubai's newest standard for chauffeur-driven luxury — built on precision, discretion, and an obsession with detail from day one.",
    storyTitle: "Where It Began",
    storyP1: "LuxeGlide Elite was founded on a simple observation: Dubai had no shortage of luxury cars, but very few services treated the journey itself as part of the luxury. We set out to change that.",
    storyP2: "We launched with a curated fleet and a small team of trusted chauffeurs trained to anticipate needs before they're spoken. We stayed intentionally small in ambition and large in standards — building slowly, on purpose.",
    valuesTag: "WHAT WE STAND FOR",
    valuesTitle: "Principles, Not Promises",
    values: [
      { icon: ShieldCheck, title: "Discretion", desc: "What happens in the car, stays in the car. Confidentiality is non-negotiable." },
      { icon: Clock, title: "Precision", desc: "On time is the minimum. We plan around traffic, flights, and the unexpected." },
      { icon: Gem, title: "Craft", desc: "Every vehicle is detailed before every trip — no exceptions, no shortcuts." },
      { icon: HeartHandshake, title: "Care", desc: "Chauffeurs trained in hospitality, not just driving." },
    ],
    standardsTag: "OUR STANDARDS",
    standardsTitle: "Trust, Built Into Every Trip",
    standards: [
      { icon: FileCheck, title: "Licensed & Insured", desc: "Every vehicle and chauffeur is fully licensed and insured under UAE regulations." },
      { icon: BadgeCheck, title: "Vetted Chauffeurs", desc: "Background-checked, professionally trained, and held to a strict dress and conduct code." },
      { icon: Radar, title: "GPS-Tracked Fleet", desc: "Every journey is tracked in real time for safety, routing, and accountability." },
      { icon: Headset, title: "24/7 Support", desc: "A real person answers, day or night — before, during, and after your trip." },
    ],
    milestonesTag: "2026 MILESTONES",
    milestones: [
      { year: "Q1 2026", label: "LuxeGlide Elite founded in Business Bay, Dubai" },
      { year: "Q2 2026", label: "Fleet curated across 6 vehicle classes" },
      { year: "Q3 2026", label: "Corporate & VIP client base growing steadily" },
      { year: "Today", label: "Ready to arrange your journey" },
    ],
  },
  ar: {
    heroTag: "قصتنا",
    heroTitle: "صُنعت لذوي الذائقة الرفيعة",
    heroSub: "تأسست لكس غلايد عام 2026 لتكون المعيار الأحدث للفخامة في دبي بسائق خاص — مبنية على الدقة والتكتم والشغف بالتفاصيل منذ اليوم الأول.",
    storyTitle: "من أين بدأنا",
    storyP1: "تأسست لكس غلايد إيليت على ملاحظة بسيطة: لا تنقص دبي السيارات الفاخرة، لكن خدمات قليلة تتعامل مع الرحلة نفسها كجزء من الفخامة. قررنا أن نغيّر ذلك.",
    storyP2: "انطلقنا بأسطول منتقى بعناية وفريق صغير من السائقين الموثوقين المدربين على تلبية الاحتياجات قبل أن تُذكر. بقينا متعمّدين في طموحنا الصغير ومعاييرنا الكبيرة — نبني بثبات وعن قصد.",
    valuesTag: "ما نؤمن به",
    valuesTitle: "مبادئ، لا وعود",
    values: [
      { icon: ShieldCheck, title: "التكتم", desc: "ما يحدث في السيارة يبقى في السيارة. السرية غير قابلة للتفاوض." },
      { icon: Clock, title: "الدقة", desc: "الوصول في الموعد هو الحد الأدنى. نخطط للازدحام والرحلات والمفاجآت." },
      { icon: Gem, title: "الحرفية", desc: "كل سيارة تُجهّز بعناية قبل كل رحلة — دون استثناءات." },
      { icon: HeartHandshake, title: "الاهتمام", desc: "سائقون مدربون على الضيافة، لا القيادة فقط." },
    ],
    standardsTag: "معاييرنا",
    standardsTitle: "الثقة في كل رحلة",
    standards: [
      { icon: FileCheck, title: "مرخّصون ومؤمّنون", desc: "كل سيارة وسائق مرخصان ومؤمّنان بالكامل وفق أنظمة دولة الإمارات." },
      { icon: BadgeCheck, title: "سائقون موثوقون", desc: "خضعوا للتحقق من الخلفية وتدريب احترافي، ويلتزمون بمعايير صارمة في المظهر والسلوك." },
      { icon: Radar, title: "أسطول متتبَّع بنظام GPS", desc: "كل رحلة تُتابَع لحظياً لضمان السلامة والمسار والمساءلة." },
      { icon: Headset, title: "دعم على مدار الساعة", desc: "شخص حقيقي يرد على اتصالك، ليلاً أو نهاراً، قبل رحلتك وأثناءها وبعدها." },
    ],
    milestonesTag: "محطات 2026",
    milestones: [
      { year: "الربع الأول 2026", label: "تأسست لكس غلايد إيليت في الخليج التجاري، دبي" },
      { year: "الربع الثاني 2026", label: "أسطول منتقى عبر 6 فئات من المركبات" },
      { year: "الربع الثالث 2026", label: "قاعدة عملاء مؤسسيين و VIP في نمو مستمر" },
      { year: "اليوم", label: "جاهزون لترتيب رحلتك" },
    ],
  },
};

/* ─── GALLERY PAGE ───────────────────────────────────────────── */
export const GALLERY_ITEMS = [
  { icon: Car, label: { en: "The Fleet", ar: "الأسطول" }, image: { src: "/images/cars.png", position: "50% 42%", scale: 1.15 } },
  { icon: Sparkles, label: { en: "VIP Events", ar: "فعاليات VIP" }, image: { src: "/images/cars.png", position: "51% 40%", scale: 2.0 } },
  { icon: MapPin, label: { en: "City Drives", ar: "جولات المدينة" }, image: { src: "/images/dubai-skyline.jpg", position: "50% 45%", scale: 1.1 } },
  { icon: Briefcase, label: { en: "Corporate", ar: "مؤسسي" }, image: { src: "/images/about-interior.webp", position: "35% 45%", scale: 1.4 } },
  { icon: Award, label: { en: "Weddings", ar: "الأعراس" }, image: { src: "/images/mercedes-night.jpg", position: "50% 55%", scale: 1.2 } },
  { icon: Gem, label: { en: "Interiors", ar: "التصميم الداخلي" }, image: { src: "/images/about-interior.webp", position: "60% 50%", scale: 1.1 } },
];

/* ─── HOW BOOKING WORKS ──────────────────────────────────────── */
export const HOW_IT_WORKS = [
  {
    icon: MessageCircle,
    title: { en: "Enquire", ar: "استفسر" },
    desc: {
      en: "Call, WhatsApp, or send an enquiry with your pickup details and preferred vehicle.",
      ar: "اتصل، راسلنا عبر واتساب، أو أرسل استفساراً بتفاصيل رحلتك والسيارة المفضلة.",
    },
  },
  {
    icon: CalendarCheck,
    title: { en: "Confirm", ar: "أكّد" },
    desc: {
      en: "We confirm your chauffeur, vehicle, and timing — usually within minutes.",
      ar: "نؤكد لك السائق والسيارة والتوقيت — عادةً خلال دقائق.",
    },
  },
  {
    icon: Sparkles,
    title: { en: "Enjoy the Ride", ar: "استمتع برحلتك" },
    desc: {
      en: "Your chauffeur arrives on time, and the rest of the journey is effortless.",
      ar: "يصل سائقك في الموعد، وتبقى بقية الرحلة سهلة وسلسة تماماً.",
    },
  },
];

/* ─── CONTACT PAGE ───────────────────────────────────────────── */
export const CONTACT_PAGE = {
  en: {
    heroTag: "GET IN TOUCH",
    heroTitle: "Let's Plan Your Journey",
    heroSub: "Tell us what you need and we'll arrange your chauffeur — usually within minutes during business hours.",
    formTitle: "Send an Enquiry",
    formName: "Full Name",
    formPhone: "Phone / WhatsApp",
    formService: "Service",
    formServicePlaceholder: "Select a service",
    formDate: "Preferred Date",
    formMessage: "Message",
    formMessagePlaceholder: "Pickup location, drop-off, number of passengers, or anything else we should know.",
    formSubmit: "Send via WhatsApp",
    formNote: "This opens WhatsApp with your details pre-filled — nothing is stored on our servers.",
    detailsTitle: "Contact Details",
    officeHoursLabel: "Office Hours",
    officeHoursValue: "Available 24/7 — book any time, day or night",
    directions: "Get Directions",
    faqTag: "FAQ",
    faqTitle: "Common Questions",
    faq: [
      { q: "How far in advance should I book?", a: "For airport transfers and hourly bookings, a few hours' notice is usually enough. For weddings, VIP events, or multi-vehicle bookings, we recommend at least 48 hours." },
      { q: "Do you charge for waiting time at the airport?", a: "No — flight tracking and a reasonable meet & greet waiting window are included at no extra charge." },
      { q: "Can I book a chauffeur for multiple days?", a: "Yes, hourly and daily packages are available for extended bookings, corporate roadshows, and events." },
      { q: "Do you operate outside Dubai?", a: "Yes, we can arrange inter-emirate transfers across the UAE — just let us know your route when you enquire." },
    ],
  },
  ar: {
    heroTag: "تواصل معنا",
    heroTitle: "لنخطط لرحلتك",
    heroSub: "أخبرنا باحتياجاتك وسنرتب لك سائقاً خاصاً — عادةً خلال دقائق أثناء ساعات العمل.",
    formTitle: "أرسل استفساراً",
    formName: "الاسم الكامل",
    formPhone: "الهاتف / واتساب",
    formService: "الخدمة",
    formServicePlaceholder: "اختر خدمة",
    formDate: "التاريخ المفضل",
    formMessage: "الرسالة",
    formMessagePlaceholder: "موقع الانطلاق، الوجهة، عدد الركاب، أو أي تفاصيل أخرى.",
    formSubmit: "إرسال عبر واتساب",
    formNote: "سيتم فتح واتساب مع تعبئة بياناتك مسبقاً — لا يتم حفظ أي بيانات على خوادمنا.",
    detailsTitle: "معلومات التواصل",
    officeHoursLabel: "ساعات العمل",
    officeHoursValue: "متاحون على مدار الساعة — احجز في أي وقت",
    directions: "احصل على الاتجاهات",
    faqTag: "الأسئلة الشائعة",
    faqTitle: "أسئلة متكررة",
    faq: [
      { q: "كم يجب أن أحجز مسبقاً؟", a: "لتحويلات المطار والحجز بالساعة، عادة تكفي بضع ساعات. للأعراس وفعاليات VIP أو الحجوزات متعددة السيارات، ننصح بالحجز قبل 48 ساعة على الأقل." },
      { q: "هل هناك رسوم على وقت الانتظار في المطار؟", a: "لا — تتبع الرحلات ووقت انتظار معقول للاستقبال مشمولان دون أي رسوم إضافية." },
      { q: "هل يمكنني حجز سائق لعدة أيام؟", a: "نعم، تتوفر باقات بالساعة واليوم للحجوزات الممتدة والفعاليات المؤسسية." },
      { q: "هل تعملون خارج دبي؟", a: "نعم، يمكننا ترتيب تنقلات بين الإمارات — فقط أخبرنا بمسارك عند الاستفسار." },
    ],
  },
};

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
export const LANG = {
  en: {
    dir: "ltr" as const,
    nav: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Fleet", href: "/fleet" },
      { label: "Services", href: "/services" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
    tagline: "PREMIUM CHAUFFEUR SERVICES",
    headline1: "Seamless Journeys,",
    headline2: "Unmatched Comfort",
    sub: "Dubai's premier luxury chauffeur service — redefining travel with sophistication and reliability.",
    call: "Call Now",
    whatsapp: "Chat on WhatsApp",
    features: [
      { icon: Car,         title: "Premium Fleet",        desc: "Top of the line vehicles for ultimate comfort." },
      { icon: User,        title: "Professional Drivers", desc: "Experienced, courteous, and always on time." },
      { icon: ShieldCheck, title: "Safety First",         desc: "Your safety is our top priority." },
      { icon: Clock,       title: "24/7 Availability",    desc: "Always here when you need us." },
    ],
    aboutTag: "ABOUT US",
    aboutTitle1: "Dubai's Premier Luxury",
    aboutTitle2: "Chauffeur Service",
    aboutP1: "LuxeGlide Elite is Dubai's premier luxury chauffeur service, redefining travel with sophistication, comfort, and reliability. Whether for business or leisure, we ensure seamless, stylish, and stress-free transportation.",
    aboutP2: "What sets us apart is our commitment to detail and passion for excellence. With a meticulously maintained fleet and professionally trained chauffeurs, we offer more than transportation — we create a calm, luxurious experience.",
    learnMore: "Learn More",
    stats: [{ val: "100+", label: "Happy Clients" }, { val: "24/7", label: "Availability" }, { val: "100%", label: "Satisfaction" }],
    servicesTag: "OUR SERVICES",
    servicesTitle: "Every Journey, Perfected",
    servicesIntro: "From airport transfers to VIP events, a comprehensive range of luxury chauffeur services tailored to your needs.",
    viewAll: "View All Services",
    viewDetails: "View Details",
    idealForLabel: "Ideal For",
    howTag: "HOW IT WORKS",
    howTitle: "Booking Made Effortless",
    ctaTitle: "Ready to experience luxury travel? Contact us and we'll arrange your perfect journey.",
    fleetPreviewTag: "OUR FLEET",
    fleetPreviewTitle: "A Vehicle for Every Occasion",
    viewFleet: "View Full Fleet",
    visitTag: "VISIT US",
    visitTitle: "Find Us in Business Bay",
    whyTag: "WHY CHOOSE US",
    whyTitle: "More Than Just a Ride",
    whyDesc: "We create a calm, luxurious experience with premium amenities and discreet, attentive service. From business meetings to weddings, every journey is handled with precision.",
    whyPoints: ["Flight tracking & personal meet and greet", "Meticulously maintained luxury fleet", "Professionally trained chauffeurs", "Premium amenities, discreet service"],
    fleetTag: "OUR FLEET",
    fleetTitle: "A Fleet Fit for Every Occasion",
    fleetSub: "Six vehicle classes, one uncompromising standard of care and presentation.",
    enquire: "Enquire",
    galleryTag: "GALLERY & CLIENTS",
    galleryTitle: "Moments, Curated",
    gallerySub: "A glimpse into the fleet, the events, and the journeys we're trusted with.",
    testimonialsTag: "CLIENT WORDS",
    testimonialsTitle: "Trusted by Those Who Expect More",
  },
  ar: {
    dir: "rtl" as const,
    nav: [
      { label: "الرئيسية", href: "/" },
      { label: "من نحن", href: "/about" },
      { label: "الأسطول", href: "/fleet" },
      { label: "خدماتنا", href: "/services" },
      { label: "المعرض", href: "/gallery" },
      { label: "تواصل معنا", href: "/contact" },
    ],
    tagline: "خدمات السائق الفاخرة",
    headline1: "رحلات سلسة،",
    headline2: "راحة لا مثيل لها",
    sub: "خدمة السائق الفاخرة الأولى في دبي — تُعيد تعريف السفر بالرقي والراحة والموثوقية.",
    call: "اتصل الآن",
    whatsapp: "تواصل معنا عبر واتساب",
    features: [
      { icon: Car,         title: "أسطول فاخر",      desc: "أفضل السيارات لأقصى درجات الراحة." },
      { icon: User,        title: "سائقون محترفون",  desc: "متمرسون، مهذبون، دائماً في الموعد." },
      { icon: ShieldCheck, title: "السلامة أولاً",   desc: "سلامتك هي أولويتنا القصوى." },
      { icon: Clock,       title: "متوفرون ٢٤/٧",    desc: "في خدمتك دائماً وفي أي وقت." },
    ],
    aboutTag: "من نحن",
    aboutTitle1: "خدمة السائق الفاخرة",
    aboutTitle2: "الأولى في دبي",
    aboutP1: "لكس غلايد إيليت هي خدمة السائق الفاخرة الأولى في دبي، تُعيد تعريف السفر بالرقي والراحة والموثوقية.",
    aboutP2: "ما يميزنا هو التزامنا بالتفاصيل وشغفنا بالتميز. بأسطول مُصان بعناية وسائقين مدربين احترافياً، نقدم أكثر من مجرد نقل — نخلق تجربة هادئة وفاخرة.",
    learnMore: "اعرف المزيد",
    stats: [{ val: "100+", label: "عميل سعيد" }, { val: "٢٤/٧", label: "متوفرون دائماً" }, { val: "100%", label: "رضا تام" }],
    servicesTag: "خدماتنا",
    servicesTitle: "كل رحلة، مثالية",
    servicesIntro: "من خدمات المطار إلى فعاليات كبار الشخصيات، نقدم مجموعة شاملة من خدمات السائق الفاخرة.",
    viewAll: "عرض كل الخدمات",
    viewDetails: "التفاصيل",
    idealForLabel: "مثالي لـ",
    howTag: "كيف يعمل الحجز",
    howTitle: "حجز سهل وسلس",
    ctaTitle: "هل أنت مستعد لتجربة السفر الفاخر؟ تواصل معنا وسنرتب لك الرحلة المثالية.",
    fleetPreviewTag: "أسطولنا",
    fleetPreviewTitle: "سيارة تناسب كل مناسبة",
    viewFleet: "عرض الأسطول الكامل",
    visitTag: "زورونا",
    visitTitle: "تجدنا في الخليج التجاري",
    whyTag: "لماذا تختارنا",
    whyTitle: "أكثر من مجرد رحلة",
    whyDesc: "نخلق تجربة هادئة وفاخرة مع وسائل راحة متميزة وخدمة متحفظة ومنتبهة. من اجتماعات الأعمال إلى حفلات الزفاف.",
    whyPoints: ["تتبع الرحلات والاستقبال الشخصي", "أسطول فاخر مُصان بعناية فائقة", "سائقون مدربون احترافياً", "وسائل راحة متميزة وخدمة متحفظة"],
    fleetTag: "أسطولنا",
    fleetTitle: "أسطول يليق بكل مناسبة",
    fleetSub: "ست فئات من المركبات، بمعيار واحد لا يساوم على العناية والتقديم.",
    enquire: "استفسر الآن",
    galleryTag: "المعرض والعملاء",
    galleryTitle: "لحظات منتقاة بعناية",
    gallerySub: "لمحة عن الأسطول والفعاليات والرحلات التي وثق بنا عملاؤنا لأجلها.",
    testimonialsTag: "آراء العملاء",
    testimonialsTitle: "موثوقون من قبل من يتوقعون الأفضل",
  },
};
