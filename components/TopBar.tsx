"use client";

import { Mail, Phone } from "lucide-react";
import { PHONE, EMAIL, SOCIAL_LINKS } from "./lib/Constants";
import { useLang } from "./LangContext";
import { InstagramIcon, FacebookIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from "./SocialIcons";

export function TopBar() {
  const { lang } = useLang();
  const isRTL = lang === "ar";

  const contact = (
    <div className="topbar-contact">
      <a href={`mailto:${EMAIL}`}><Mail size={11} />{EMAIL}</a>
      <span className="topbar-divider" />
      <a href={`tel:${PHONE}`}><Phone size={11} />{PHONE}</a>
    </div>
  );

  const social = (
    <div className="topbar-social">
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={14} /></a>
      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon size={14} /></a>
      <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon size={14} /></a>
      <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={14} /></a>
      <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YouTubeIcon size={14} /></a>
    </div>
  );

  return (
    <div className="topbar" dir={isRTL ? "rtl" : "ltr"}>
      <div className="topbar-inner">
        {isRTL ? (
          <>
            {social}
            {contact}
          </>
        ) : (
          <>
            {contact}
            {social}
          </>
        )}
      </div>
    </div>
  );
}
