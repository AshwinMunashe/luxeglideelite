"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { LANG, PHONE, WHATSAPP } from "./lib/Constants";
import { useLang } from "./LangContext";

export function FloatingActions() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  return (
    <div className="float-actions" style={{ [isRTL ? "left" : "right"]: 22 }}>
      <motion.a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank" rel="noopener noreferrer"
        aria-label={t.whatsapp}
        title={t.whatsapp}
        className="float-btn"
        initial={{ opacity: 0, scale: .6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: .6, duration: .4 }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle size={22} />
      </motion.a>
      <motion.a
        href={`tel:${PHONE}`}
        aria-label={t.call}
        title={t.call}
        className="float-btn float-btn-o"
        initial={{ opacity: 0, scale: .6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: .75, duration: .4 }}
        whileHover={{ scale: 1.1 }}
      >
        <Phone size={19} />
      </motion.a>
    </div>
  );
}
