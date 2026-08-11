import {
  Car, ShieldCheck, Clock, User, MapPin, Star, Users, Briefcase,
  Award, Gem, Sparkles, HeartHandshake, MessageCircle, CalendarCheck,
  BadgeCheck, Radar, Headset, FileCheck, Building2, PlaneTakeoff,
  Landmark, Waves,
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

// placeholder handles — swap for the real profile URLs when they exist
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/luxeglideelite",
  facebook: "https://facebook.com/luxeglideelite",
  linkedin: "https://linkedin.com/company/luxeglideelite",
  tiktok: "https://tiktok.com/@luxeglideelite",
};

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
    long: {
      en: "The S-Class is the benchmark every other executive sedan is measured against, and it's our most requested vehicle for exactly that reason. Massage seats, rear-seat climate control, and a cabin engineered to stay near-silent at highway speed make it the default choice for clients who spend as much time working in the back seat as they do in the office.\n\nWe run it constantly for airport transfers, board-level corporate travel, and any booking where the vehicle itself needs to make an impression without shouting about it.",
      ar: "سيارة S كلاس هي المعيار الذي تُقاس عليه كل سيارة تنفيذية أخرى، وهذا بالضبط سبب كونها الأكثر طلباً لدينا. مقاعد التدليك، والتحكم بمناخ المقاعد الخلفية، ومقصورة صُممت لتبقى شبه صامتة عند سرعة الطريق السريع، تجعلها الخيار الافتراضي للعملاء الذين يقضون وقتاً في العمل من المقعد الخلفي بقدر ما يقضونه في المكتب.\n\nنستخدمها باستمرار لتحويلات المطار، والسفر المؤسسي على مستوى مجلس الإدارة، وأي حجز تحتاج فيه السيارة نفسها لترك انطباع دون مبالغة.",
    },
    idealFor: {
      en: "Executives, board members, and airport transfers where a quiet, composed ride matters most.",
      ar: "المديرين التنفيذيين وأعضاء مجلس الإدارة وتحويلات المطار حيث تكون الرحلة الهادئة والمتزنة هي الأهم.",
    },
    highlights: {
      en: ["Massage & heated rear seats", "Rear-seat climate zones", "Near-silent cabin insulation", "Ambient lighting suite"],
      ar: ["مقاعد خلفية بتدليك وتدفئة", "مناطق تحكم مناخي خلفية", "عزل شبه صامت للمقصورة", "إضاءة محيطية متعددة"],
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
    long: {
      en: "The 7 Series trades a fraction of the S-Class's hush for a sportier drive and a cabin that feels more like a private lounge than a car — wider rear bench, crystal-effect trim, and an executive lounge seating configuration that reclines further than most business-class flights.\n\nIt's the vehicle we reach for when clients want the S-Class's presence with a slightly more contemporary character, particularly for evening bookings and client entertainment.",
      ar: "تتنازل الفئة السابعة عن جزء بسيط من هدوء S كلاس مقابل قيادة أكثر رياضية ومقصورة تشبه صالة خاصة أكثر من كونها سيارة — مقعد خلفي أعرض، تشطيبات بلورية، وتصميم مقاعد تنفيذية ينحني للخلف أكثر من معظم مقاعد درجة رجال الأعمال في الطائرات.\n\nإنها السيارة التي نلجأ إليها عندما يرغب العملاء بحضور S كلاس مع طابع أكثر عصرية، خصوصاً في حجوزات المساء وضيافة العملاء.",
    },
    idealFor: {
      en: "Client entertainment, evening bookings, and travellers who want presence with a sportier edge.",
      ar: "ضيافة العملاء وحجوزات المساء والمسافرين الراغبين بالحضور مع لمسة رياضية.",
    },
    highlights: {
      en: ["Executive lounge reclining seats", "Crystal-effect interior trim", "Sportier drive character", "Rear entertainment display"],
      ar: ["مقاعد تنفيذية قابلة للانحناء", "تشطيبات داخلية بلورية", "طابع قيادة أكثر رياضية", "شاشة ترفيه خلفية"],
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
    long: {
      en: "There's a reason the Ghost is the car most often requested by name: it's the closest thing to effortless we can put on the road. The starlight headliner, the near-total absence of road noise, and a ride quality Rolls-Royce engineers literally call 'magic carpet' make every journey feel like the occasion, not just the transport to one.\n\nWe reserve it for weddings, red-carpet arrivals, and VIP bookings where the vehicle itself is part of the moment — and a backup car is placed on standby as standard for every Ghost booking, at no extra charge.",
      ar: "هناك سبب لكون الغوست السيارة الأكثر طلباً بالاسم تحديداً: إنها أقرب ما يمكن أن نضعه على الطريق للسلاسة المطلقة. سقف النجوم المضيء، والغياب شبه التام لضوضاء الطريق، وجودة قيادة تصفها رولز رويس حرفياً بـ'السجادة السحرية'، تجعل كل رحلة تشعر وكأنها المناسبة نفسها، لا مجرد وسيلة للوصول إليها.\n\nنخصصها للأعراس، والوصول على السجادة الحمراء، وحجوزات VIP حيث تكون السيارة نفسها جزءاً من اللحظة — وتوضع سيارة احتياطية جاهزة كإجراء معتاد لكل حجز غوست دون أي رسوم إضافية.",
    },
    idealFor: {
      en: "Weddings, red-carpet arrivals, and once-in-a-lifetime occasions.",
      ar: "الأعراس والوصول على السجادة الحمراء والمناسبات التي لا تتكرر.",
    },
    highlights: {
      en: ["Starlight headliner", "Magic carpet ride quality", "Complimentary backup vehicle on VIP bookings", "Bespoke interior detailing"],
      ar: ["سقف النجوم المضيء", "جودة قيادة السجادة السحرية", "سيارة احتياطية مجانية لحجوزات VIP", "تفاصيل داخلية مخصصة"],
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
    long: {
      en: "The Autobiography gives you SUV command of the road — higher seating, effortless visibility over Dubai traffic — without giving up an inch of luxury sedan comfort inside. Executive-class rear seating, a raised ride height that handles speed bumps and villa driveways without complaint, and enough road presence to anchor a wedding convoy or a VIP arrival.\n\nIt's the vehicle most requested by clients staying in villa communities, where a lower sedan can struggle with unpaved sections or steep driveway approaches.",
      ar: "توفر أوتوبيوغرافي سيطرة سيارة الدفع الرباعي على الطريق — جلوس أعلى ورؤية سهلة فوق ازدحام دبي — دون التنازل عن أي قدر من راحة السيدان الفاخرة في الداخل. مقاعد خلفية بمستوى الدرجة التنفيذية، وارتفاع قيادة مرفوع يتعامل مع المطبات الاصطناعية وممرات الفلل دون أي مشكلة، وحضور كافٍ على الطريق ليتصدر قافلة زفاف أو وصول VIP.\n\nإنها السيارة الأكثر طلباً من العملاء المقيمين في المجتمعات السكنية ذات الفلل، حيث قد تواجه سيارة السيدان الأقل ارتفاعاً صعوبة في الأقسام غير المعبدة أو ممرات الدخول شديدة الانحدار.",
    },
    idealFor: {
      en: "Villa pickups, wedding convoys, and clients who want SUV presence without losing rear-seat comfort.",
      ar: "استقبالات الفلل وقوافل الأعراس والعملاء الراغبين بحضور سيارة الدفع الرباعي دون فقدان راحة المقعد الخلفي.",
    },
    highlights: {
      en: ["Executive-class rear seating", "Raised ride height for villa driveways", "Commanding road presence", "Ideal for convoy lead vehicle"],
      ar: ["مقاعد خلفية بمستوى تنفيذي", "ارتفاع قيادة مناسب لممرات الفلل", "حضور طاغٍ على الطريق", "مثالية كسيارة قيادة للقافلة"],
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
    long: {
      en: "The Escalade is the vehicle we bring when a group needs to move together without compromise — seven seats, a curved OLED display that turns the cabin into something closer to a private jet interior, and a bold enough exterior presence to make an entrance on its own.\n\nIt's a regular on airport runs for larger families and delegations, and doubles well as a spacious alternative to the V-Class when the group leans smaller but the luggage load is heavy.",
      ar: "إسكاليد هي السيارة التي نُحضرها عندما تحتاج مجموعة للتنقل معاً دون أي تنازل — سبعة مقاعد، شاشة OLED منحنية تحوّل المقصورة إلى ما يشبه مقصورة طائرة خاصة، وحضور خارجي جريء كافٍ لصنع دخول مميز بحد ذاته.\n\nإنها حاضرة بانتظام في رحلات المطار للعائلات الكبيرة والوفود، وتُعد بديلاً واسعاً جيداً عن V كلاس عندما تكون المجموعة أصغر لكن حمولة الأمتعة كبيرة.",
    },
    idealFor: {
      en: "Large families, delegations, and airport runs with heavy luggage.",
      ar: "العائلات الكبيرة والوفود ورحلات المطار ذات الأمتعة الكثيرة.",
    },
    highlights: {
      en: ["Seats up to 7", "Curved OLED cabin display", "Bold exterior road presence", "Generous luggage capacity"],
      ar: ["تتسع حتى 7 ركاب", "شاشة مقصورة OLED منحنية", "حضور خارجي جريء على الطريق", "سعة أمتعة واسعة"],
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
    long: {
      en: "The V-Class VIP is less a van than a boardroom that happens to move — face-to-face conference seating, a table, and enough cabin space to run an actual meeting between stops rather than just sit through the drive.\n\nIt's the standard choice for multi-executive corporate transfers and small delegations who need to prep, debrief, or simply work as a group between appointments, and it converts easily for airport runs when the group is six or fewer with moderate luggage.",
      ar: "V كلاس VIP أقرب إلى قاعة اجتماعات متنقلة منها إلى فان عادي — مقاعد اجتماعات متقابلة، وطاولة، ومساحة مقصورة كافية لعقد اجتماع فعلي بين المحطات بدلاً من مجرد الجلوس خلال الرحلة.\n\nإنها الخيار المعتاد لتنقلات المديرين التنفيذيين المتعددين والوفود الصغيرة التي تحتاج للتحضير أو المراجعة أو ببساطة العمل كمجموعة بين المواعيد، وتتحول بسهولة لرحلات المطار عندما يكون عدد المجموعة ستة أو أقل مع أمتعة معتدلة.",
    },
    idealFor: {
      en: "Multi-executive delegations who need to work or meet between stops.",
      ar: "الوفود المتعددة التنفيذيين الراغبة بالعمل أو الاجتماع بين المحطات.",
    },
    highlights: {
      en: ["Face-to-face conference seating", "Onboard table", "Seats up to 6", "Quiet cabin for calls or meetings"],
      ar: ["مقاعد اجتماعات متقابلة", "طاولة داخل المقصورة", "تتسع حتى 6 ركاب", "مقصورة هادئة للمكالمات أو الاجتماعات"],
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

/* ─── AREAS WE SERVE (location pages) ───────────────────────── */
export const AREAS = [
  {
    slug: "business-bay",
    icon: Building2,
    image: {
      src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1600&q=80",
      position: "50% 40%",
      scale: 1,
    },
    name: { en: "Business Bay", ar: "الخليج التجاري" },
    tagline: { en: "Our Home District", ar: "حينا الرئيسي" },
    intro: {
      en: "Business Bay is where LuxeGlide Elite is based, and it's the district we know best — the canal-side towers, the Exchange Tower service entrances, the fastest way onto Sheikh Zayed Road at any hour. As Dubai's central business corridor, it's a constant flow of morning meetings, late finance calls, and evening dinners along the waterfront promenade.\n\nBecause our office sits inside it, Business Bay bookings get our shortest response times — a chauffeur can usually be at your tower's lobby within minutes, not hours. It's the natural starting point for hourly bookings, corporate accounts, and same-day requests.",
      ar: "الخليج التجاري هو مقر لكس غلايد إيليت، وهو الحي الذي نعرفه الأفضل — الأبراج المطلة على القناة، مداخل خدمة برج التبادل، وأسرع طريق للوصول إلى شارع الشيخ زايد في أي وقت. بصفته الممر التجاري المركزي في دبي، يشهد الحي تدفقاً مستمراً من اجتماعات الصباح ومكالمات المال المسائية وعشاءات على الممشى المطل على القناة.\n\nولأن مكتبنا يقع داخله، تحظى حجوزات الخليج التجاري بأسرع وقت استجابة لدينا — يمكن لسائقنا الوصول إلى ردهة برجك خلال دقائق لا ساعات. إنه نقطة الانطلاق الطبيعية للحجوزات بالساعة والحسابات المؤسسية والطلبات في نفس اليوم.",
    },
    landmarks: {
      en: ["Bay Avenue", "Dubai Water Canal promenade", "Exchange Tower", "JW Marriott Marquis"],
      ar: ["باي أفينيو", "ممشى قناة دبي المائية", "برج التبادل", "فندق جي دبليو ماريوت ماركيز"],
    },
    relatedServices: ["hourly-chauffeur", "corporate-travel"],
  },
  {
    slug: "downtown-dubai",
    icon: Landmark,
    image: {
      src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600&q=80",
      position: "50% 45%",
      scale: 1,
    },
    name: { en: "Downtown Dubai", ar: "وسط مدينة دبي" },
    tagline: { en: "Burj Khalifa & Dubai Mall", ar: "برج خليفة ودبي مول" },
    intro: {
      en: "Downtown Dubai is the address most visitors picture when they imagine the city — the Burj Khalifa, the Dubai Fountain, the Opera District, and the endless valet lines outside Dubai Mall. It's dense, dramatic, and often gridlocked around fountain-show hours, which is exactly where a chauffeur who knows the service roads and timing earns their keep.\n\nWe run city tours, dinner transfers, and event pickups through Downtown constantly, timing arrivals around the fountain shows and avoiding the worst of the valet queues. For a first visit to Dubai, this is usually the district clients ask to be based near.",
      ar: "وسط مدينة دبي هو العنوان الذي يتخيله معظم الزوار عند التفكير بالمدينة — برج خليفة، نافورة دبي، حي الأوبرا، وطوابير صف السيارات التي لا تنتهي أمام دبي مول. إنه حي كثيف ومبهر وغالباً ما يشهد ازدحاماً حول أوقات عروض النافورة، وهنا بالتحديد يُثبت السائق الذي يعرف طرق الخدمة والتوقيت قيمته.\n\nننظم جولات المدينة وتوصيلات العشاء واستقبال الفعاليات عبر وسط المدينة باستمرار، مع ضبط أوقات الوصول حول عروض النافورة وتجنب أسوأ طوابير صف السيارات. لأول زيارة إلى دبي، هذا عادة هو الحي الذي يطلب العملاء الإقامة بالقرب منه.",
    },
    landmarks: {
      en: ["Burj Khalifa", "The Dubai Fountain", "Dubai Mall", "Dubai Opera"],
      ar: ["برج خليفة", "نافورة دبي", "دبي مول", "دار أوبرا دبي"],
    },
    relatedServices: ["city-tours", "vip-services"],
  },
  {
    slug: "difc",
    icon: Building2,
    image: {
      src: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=1600&q=80",
      position: "50% 40%",
      scale: 1,
    },
    name: { en: "DIFC", ar: "مركز دبي المالي العالمي" },
    tagline: { en: "Dubai International Financial Centre", ar: "الوجهة المالية الأولى" },
    intro: {
      en: "DIFC is Dubai's financial and legal heart — Gate Avenue, the region's largest banks, and a growing cluster of hedge funds and family offices that moved in over the last few years. It's a district where discretion and punctuality aren't a nice-to-have, they're the baseline expectation.\n\nWe handle a steady stream of back-to-back meeting transfers here, plus airport runs for visiting partners and investors. Chauffeurs working DIFC routes are briefed on building-specific drop-off protocols, since several towers restrict curbside access during business hours.",
      ar: "مركز دبي المالي العالمي هو القلب المالي والقانوني لدبي — جيت أفينيو، أكبر البنوك في المنطقة، وتجمّع متنامٍ من صناديق التحوط ومكاتب العائلات التي انتقلت إليه خلال السنوات الأخيرة. إنه حي لا يُعتبر فيه التكتم والدقة في المواعيد أمراً إضافياً، بل هو الحد الأدنى المتوقع.\n\nندير هنا سلسلة مستمرة من تنقلات الاجتماعات المتتالية، إضافة إلى رحلات المطار للشركاء والمستثمرين الزائرين. السائقون العاملون على مسارات مركز دبي المالي مطلعون على بروتوكولات التوصيل الخاصة بكل برج، إذ تفرض عدة أبراج قيوداً على الوصول من الرصيف خلال ساعات العمل.",
    },
    landmarks: {
      en: ["Gate Avenue", "Emirates Towers", "Museum of the Future", "The Ritz-Carlton DIFC"],
      ar: ["جيت أفينيو", "أبراج الإمارات", "متحف المستقبل", "فندق ريتز كارلتون مركز دبي المالي"],
    },
    relatedServices: ["corporate-travel", "hourly-chauffeur"],
  },
  {
    slug: "palm-jumeirah",
    icon: Waves,
    image: {
      src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
      position: "50% 45%",
      scale: 1,
    },
    name: { en: "Palm Jumeirah", ar: "نخلة جميرا" },
    tagline: { en: "Resorts & Beachfront Villas", ar: "المنتجعات والفلل الساحلية" },
    intro: {
      en: "Palm Jumeirah is its own small world — a single trunk road out to a fan of fronds lined with beachfront villas and resort hotels, from Atlantis at the crescent to the newer towers along the trunk. Traffic onto and off the island funnels through one route, so timing matters more here than almost anywhere else in Dubai.\n\nWe run wedding transport, resort transfers, and evening dinner bookings out to the Palm regularly, and build in buffer time for the trunk road at peak hours. For villa pickups, our chauffeurs coordinate gate codes and access in advance so you're never waiting curbside.",
      ar: "نخلة جميرا عالم صغير قائم بذاته — طريق جذع واحد يمتد إلى سعف مصطف بالفلل الساحلية والفنادق المنتجعية، من أتلانتس عند الهلال إلى الأبراج الأحدث على طول الجذع. تتجمع حركة الدخول والخروج من الجزيرة عبر طريق واحد، لذا يصبح التوقيت هنا أكثر أهمية من أي مكان آخر في دبي تقريباً.\n\nننظم نقل حفلات الزفاف وتوصيلات المنتجعات وحجوزات عشاء المساء إلى النخلة بانتظام، مع مراعاة وقت إضافي لطريق الجذع في أوقات الذروة. لاستقبالات الفلل، ينسّق سائقونا رموز البوابات وطرق الوصول مسبقاً حتى لا تنتظر عند الرصيف أبداً.",
    },
    landmarks: {
      en: ["Atlantis The Palm", "The Pointe", "Nakheel Mall", "Palm West Beach"],
      ar: ["أتلانتس النخلة", "ذا بوينت", "نخيل مول", "شاطئ بالم ويست"],
    },
    relatedServices: ["vip-services", "city-tours"],
  },
  {
    slug: "dubai-marina",
    icon: Waves,
    image: {
      src: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=1600&q=80",
      position: "50% 42%",
      scale: 1,
    },
    name: { en: "Dubai Marina", ar: "دبي مارينا" },
    tagline: { en: "Marina Walk & JBR", ar: "ممشى المارينا وجميرا بيتش ريزيدنس" },
    intro: {
      en: "Dubai Marina and JBR are where residential towers meet the beach — Marina Walk, the yacht clubs, and a beachfront promenade that stays busy well into the night. It's one of the most photographed skylines in Dubai, and one of the most popular pickup points for city tours that continue on toward the Palm or Downtown.\n\nWe know the marina's internal loop roads well enough to avoid the worst of the weekend congestion, and we regularly coordinate yacht-day transfers and dinner bookings along the walk for both residents and visiting guests staying in the towers.",
      ar: "دبي مارينا وجميرا بيتش ريزيدنس هما حيث تلتقي الأبراج السكنية بالشاطئ — ممشى المارينا، والنوادي البحرية، وواجهة بحرية تبقى نشطة حتى ساعات متأخرة من الليل. إنها إحدى أكثر خطوط الأفق تصويراً في دبي، وأحد أكثر نقاط الانطلاق شيوعاً لجولات المدينة المتجهة نحو النخلة أو وسط المدينة.\n\nنعرف طرق المارينا الداخلية جيداً بما يكفي لتجنب أسوأ ازدحام عطلة نهاية الأسبوع، وننسّق بانتظام تنقلات أيام اليخوت وحجوزات العشاء على طول الممشى لكل من المقيمين والضيوف الزائرين المقيمين في الأبراج.",
    },
    landmarks: {
      en: ["Marina Walk", "JBR — The Beach", "Dubai Marina Mall", "Skydive Dubai"],
      ar: ["ممشى المارينا", "جميرا بيتش ريزيدنس - ذا بيتش", "دبي مارينا مول", "سكاي دايف دبي"],
    },
    relatedServices: ["city-tours", "group-transport"],
  },
  {
    slug: "dubai-airport",
    icon: PlaneTakeoff,
    image: {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
      position: "50% 45%",
      scale: 1,
    },
    name: { en: "Dubai Airport (DXB)", ar: "مطار دبي الدولي" },
    tagline: { en: "Terminals 1, 2 & 3", ar: "المبنى 1 و2 و3" },
    intro: {
      en: "DXB is one of the busiest airports on earth, and its three terminals each behave differently — Terminal 3's long Emirates concourses, Terminal 1's tighter arrivals hall, and Terminal 2's smaller, quicker flow. Knowing which terminal your flight lands at, and where the meet & greet point actually is inside it, is most of what separates a smooth arrival from a stressful one.\n\nWe track every flight from takeoff, so delays and early landings never catch us out, and our chauffeurs meet arriving guests inside the terminal rather than at a distant curb. The same applies in reverse for departures — we build in buffer for the drive in and the security queue, so you're never rushed at check-in.",
      ar: "مطار دبي الدولي هو أحد أكثر المطارات ازدحاماً في العالم، وتتصرف مبانيه الثلاثة بشكل مختلف — أروقة طيران الإمارات الطويلة في المبنى 3، وصالة وصول أضيق في المبنى 1، وتدفق أصغر وأسرع في المبنى 2. معرفة المبنى الذي ستهبط فيه رحلتك، ومكان نقطة الاستقبال الفعلية بداخله، هو معظم ما يفرّق بين وصول سلس وآخر مرهق.\n\nنتابع كل رحلة منذ الإقلاع، فلا يفاجئنا التأخير أو الهبوط المبكر أبداً، ويستقبل سائقونا الضيوف داخل صالة المطار وليس عند رصيف بعيد. ينطبق الأمر ذاته عكسياً عند المغادرة — نراعي وقتاً إضافياً للطريق ولطابور الأمن، حتى لا تكون مستعجلاً عند تسجيل الوصول.",
    },
    landmarks: {
      en: ["Terminal 1 (Concourse D)", "Terminal 2", "Terminal 3 (Emirates)", "DXB Arrivals Meet & Greet"],
      ar: ["المبنى 1 (الرواق دي)", "المبنى 2", "المبنى 3 (طيران الإمارات)", "نقطة استقبال الوصول"],
    },
    relatedServices: ["airport-transfers", "vip-services"],
  },
];

/* ─── HOMEPAGE FAQ ───────────────────────────────────────────── */
export const HOME_FAQ = {
  en: {
    tag: "FAQ",
    title: "Before You Book",
    items: [
      { q: "Is LuxeGlide Elite a licensed chauffeur service?", a: "Yes — every vehicle and chauffeur is fully licensed and insured under UAE regulations, and the fleet is GPS-tracked for every journey." },
      { q: "Which parts of Dubai do you cover?", a: "All of it, with dedicated local knowledge in Business Bay, Downtown Dubai, DIFC, Palm Jumeirah, Dubai Marina, and Dubai Airport. Inter-emirate transfers across the UAE can also be arranged." },
      { q: "How much does an hourly chauffeur cost?", a: "Pricing depends on vehicle class and booking length — hourly bookings start at a 3-hour minimum. Send your details via WhatsApp for a same-day quote." },
      { q: "Can I book a chauffeur for later today?", a: "Usually, yes. Most bookings are confirmed within minutes during business hours; for VIP events or multi-vehicle bookings we recommend at least 48 hours' notice." },
    ],
  },
  ar: {
    tag: "الأسئلة الشائعة",
    title: "قبل أن تحجز",
    items: [
      { q: "هل لكس غلايد إيليت خدمة سائق مرخّصة؟", a: "نعم — كل سيارة وسائق مرخّصان ومؤمّنان بالكامل وفق أنظمة دولة الإمارات، ويخضع الأسطول للتتبع عبر GPS في كل رحلة." },
      { q: "ما هي مناطق دبي التي تغطونها؟", a: "كل دبي، مع معرفة محلية متخصصة في الخليج التجاري، وسط المدينة، مركز دبي المالي العالمي، نخلة جميرا، دبي مارينا، ومطار دبي. يمكن أيضاً ترتيب تنقلات بين الإمارات." },
      { q: "كم تكلفة السائق بالساعة؟", a: "يعتمد السعر على فئة السيارة ومدة الحجز — يبدأ الحجز بالساعة بحد أدنى 3 ساعات. أرسل تفاصيلك عبر واتساب للحصول على عرض سعر في نفس اليوم." },
      { q: "هل يمكنني حجز سائق لاحقاً اليوم؟", a: "غالباً نعم. تُؤكَّد معظم الحجوزات خلال دقائق أثناء ساعات العمل؛ أما لفعاليات VIP أو الحجوزات متعددة السيارات فننصح بالحجز قبل 48 ساعة على الأقل." },
    ],
  },
};

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
    notFoundTag: "404",
    notFoundTitle: "This Road Isn't Mapped",
    notFoundSub: "The page you're looking for has taken a different route. Let's get you back on track.",
    notFoundCta: "Back to Home",
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
    areasTag: "AREAS WE SERVE",
    areasTitle: "Local Knowledge, Citywide",
    areasSub: "Dedicated chauffeur coverage across Dubai's key districts — from Business Bay to the Palm.",
    viewArea: "Explore Area",
    landmarksLabel: "Landmarks Nearby",
    popularServicesLabel: "Popular Services Here",
    areasFooterLabel: "Areas We Serve",
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
    notFoundTag: "404",
    notFoundTitle: "هذا الطريق غير مرسوم على الخريطة",
    notFoundSub: "الصفحة التي تبحث عنها سلكت مساراً مختلفاً. دعنا نعيدك إلى الطريق الصحيح.",
    notFoundCta: "العودة للرئيسية",
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
    areasTag: "مناطق تغطيتنا",
    areasTitle: "معرفة محلية في كل أنحاء المدينة",
    areasSub: "تغطية سائقين مخصصة في أهم أحياء دبي — من الخليج التجاري إلى النخلة.",
    viewArea: "استكشف المنطقة",
    landmarksLabel: "معالم قريبة",
    popularServicesLabel: "الخدمات الأكثر طلباً هنا",
    areasFooterLabel: "مناطق تغطيتنا",
    galleryTag: "المعرض والعملاء",
    galleryTitle: "لحظات منتقاة بعناية",
    gallerySub: "لمحة عن الأسطول والفعاليات والرحلات التي وثق بنا عملاؤنا لأجلها.",
    testimonialsTag: "آراء العملاء",
    testimonialsTitle: "موثوقون من قبل من يتوقعون الأفضل",
  },
};
