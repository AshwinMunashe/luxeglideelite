import { Car, ShieldCheck, Clock, User } from "lucide-react";

/* ─── CONSTANTS ─────────────────────────────────────────────── */
export const PHONE = "+971562427288";
export const WHATSAPP = "971562427288";

/* ─── CAR DATA ───────────────────────────────────────────────── */
export const CARS = [
  {
    name: {
      en: "Mercedes S-Class",
      ar: "مرسيدس S كلاس"
    },
    tagline: {
      en: "Luxury Comfort",
      ar: "راحة فاخرة"
    },
    glb: "/models/1970_dodge_challenger_rt/scene.gltf",
    specs: {
      engine: {
        en: "V8 Biturbo",
        ar: "محرك V8 توين تيربو"
      },
      power: {
        en: "496 HP",
        ar: "496 حصان"
      },
      seats: {
        en: "4 Seats",
        ar: "4 مقاعد"
      },
      feature: {
        en: "Massage Seats",
        ar: "مقاعد تدليك"
      }
    }
  },
  {
    name: {
      en: "BMW 7 Series",
      ar: "بي إم دبليو الفئة السابعة"
    },
    tagline: {
      en: "Driven by Excellence",
      ar: "قيادة بامتياز"
    },
    glb: "/models/truck_new.glb",
    specs: {
      engine: {
        en: "3.0L TwinPower",
        ar: "محرك 3.0 لتر توين باور"
      },
      power: {
        en: "375 HP",
        ar: "375 حصان"
      },
      seats: {
        en: "5 Seats",
        ar: "5 مقاعد"
      },
      feature: {
        en: "Executive Lounge",
        ar: "مقصورة تنفيذية"
      }
    }
  }
];

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
export const LANG = {
  en: {
    dir: "ltr" as const,
    nav: ["Home", "About Us", "Services", "Contact Us"],
    tagline: "PREMIUM CHAUFFEUR SERVICES",
    headline1: "Seamless Journeys,",
    headline2: "Unmatched Comfort",
    sub: "Dubai's premier luxury chauffeur service — redefining travel with sophistication and reliability.",
    call: "Call Now",
    whatsapp: "WhatsApp Us",
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
    stats: [{ val: "500+", label: "Happy Clients" }, { val: "24/7", label: "Availability" }, { val: "100%", label: "Satisfaction" }],
    servicesTag: "OUR SERVICES",
    servicesTitle: "Every Journey, Perfected",
    servicesIntro: "From airport transfers to VIP events, a comprehensive range of luxury chauffeur services tailored to your needs.",
    services: [
      { title: "Airport Transfers",  desc: "Seamless pickup and drop-off with flight tracking and meet & greet service." },
      { title: "Hourly Chauffeur",   desc: "Flexible hourly booking for business meetings, city tours, or special occasions." },
      { title: "City Tours",         desc: "Explore Dubai in ultimate comfort with curated luxury city tour experiences." },
      { title: "Corporate Travel",   desc: "Professional chauffeur services for executives and corporate events." },
      { title: "VIP Services",       desc: "Exclusive transportation for special events, weddings, and high-profile occasions." },
      { title: "Group Transport",    desc: "Premium fleet options for group travel with comfort and style." },
    ],
    ctaTitle: "Ready to Experience Elite Travel?",
    whyTag: "WHY CHOOSE US",
    whyTitle: "More Than Just a Ride",
    whyDesc: "We create a calm, luxurious experience with premium amenities and discreet, attentive service. From business meetings to weddings, every journey is handled with precision.",
    whyPoints: ["Flight tracking & personal meet and greet", "Meticulously maintained luxury fleet", "Professionally trained chauffeurs", "Premium amenities, discreet service"],
  },
  ar: {
    dir: "rtl" as const,
    nav: ["الرئيسية", "من نحن", "خدماتنا", "تواصل معنا"],
    tagline: "خدمات السائق الفاخرة",
    headline1: "رحلات سلسة،",
    headline2: "راحة لا مثيل لها",
    sub: "خدمة السائق الفاخرة الأولى في دبي — تُعيد تعريف السفر بالرقي والراحة والموثوقية.",
    call: "اتصل الآن",
    whatsapp: "واتساب",
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
    stats: [{ val: "500+", label: "عميل سعيد" }, { val: "٢٤/٧", label: "متوفرون دائماً" }, { val: "100%", label: "رضا تام" }],
    servicesTag: "خدماتنا",
    servicesTitle: "كل رحلة، مثالية",
    servicesIntro: "من خدمات المطار إلى فعاليات كبار الشخصيات، نقدم مجموعة شاملة من خدمات السائق الفاخرة.",
    services: [
      { title: "تحويلات المطار",  desc: "خدمة استقبال وتوصيل مع تتبع الرحلات والاستقبال الشخصي." },
      { title: "سائق بالساعة",   desc: "حجز مرن بالساعة لاجتماعات الأعمال أو جولات المدينة." },
      { title: "جولات المدينة",  desc: "استكشف دبي بأقصى راحة مع جولاتنا الفاخرة." },
      { title: "السفر المؤسسي",  desc: "خدمات احترافية للمديرين التنفيذيين والفعاليات المؤسسية." },
      { title: "خدمات VIP",      desc: "نقل حصري لكبار الشخصيات والأعراس والفعاليات الرفيعة." },
      { title: "النقل الجماعي", desc: "خيارات أسطول متميزة للسفر الجماعي براحة وأناقة." },
    ],
    ctaTitle: "هل أنت مستعد لتجربة السفر النخبوي؟",
    whyTag: "لماذا تختارنا",
    whyTitle: "أكثر من مجرد رحلة",
    whyDesc: "نخلق تجربة هادئة وفاخرة مع وسائل راحة متميزة وخدمة متحفظة ومنتبهة. من اجتماعات الأعمال إلى حفلات الزفاف.",
    whyPoints: ["تتبع الرحلات والاستقبال الشخصي", "أسطول فاخر مُصان بعناية فائقة", "سائقون مدربون احترافياً", "وسائل راحة متميزة وخدمة متحفظة"],
  },
};