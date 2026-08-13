export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap');

  :root {
    /* gold + navy match the live luxeglideelite.ae brand tokens */
    --gold: #D6B471;
    --gold-lt: #E6CC99;
    --gold-dim: rgba(214,180,113,0.18);
    --navy: #1C2E5E;
    --navy-lt: #2A4280;
    --black: #070707;
    --off: #F5F0E8;
    --muted: rgba(245,240,232,0.52);
    --nav-h: 60px;
    --topbar-h: 34px;
    --header-h: calc(var(--nav-h) + var(--topbar-h));
    --cards-h: 128px;
  }
  /* topbar is desktop-only; --header-h (used to clear the fixed header
     stack) recalculates on its own once --topbar-h collapses here since
     it's defined as a calc() referencing it */
  @media (max-width: 900px) {
    :root { --topbar-h: 0px; }
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scrollbar-color: var(--gold) #0a0a0a; scrollbar-width: thin; }
  body { background: var(--black); color: var(--off); overflow-x: hidden; }

  ::selection { background: rgba(214,180,113,.32); color: #fff; }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--gold-lt), var(--gold));
    border-radius: 10px; border: 2px solid #0a0a0a;
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold-lt); }
  .fd { font-family: 'Cormorant Garamond', serif; }
  .fb { font-family: 'Montserrat', sans-serif; }
  .fa { font-family: 'Noto Naskh Arabic', serif; }

  /* grain overlay */
  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.032;
  }

  /* shimmer headline */
  @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
  .shimmer {
    background: linear-gradient(90deg, var(--gold-lt) 0%, #fff 40%, var(--gold) 60%, var(--gold-lt) 100%);
    background-size: 600px 100%;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }

  /* watermark pulse */
  @keyframes wmpulse { 0%,100%{opacity:.05} 50%{opacity:.09} }
  .wm { animation: wmpulse 8s ease-in-out infinite; }

  /* gold line */
  .gline { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }

  /* buttons */
  .btn-g {
    background: var(--gold); color: var(--black);
    font-family: 'Montserrat', sans-serif; font-weight: 500;
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    padding: 11px 22px; border-radius: 999px; border: none; cursor: pointer;
    transition: background .3s, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
    display: inline-flex; align-items: center; gap: 7px;
    text-decoration: none; white-space: nowrap;
  }
  .btn-g:hover { background: var(--gold-lt); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(214,180,113,.35); }
  .btn-o {
    background: transparent; color: var(--gold);
    font-family: 'Montserrat', sans-serif; font-weight: 400;
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    padding: 10px 22px; border-radius: 999px; border: 1px solid var(--gold); cursor: pointer;
    transition: background .3s, border-color .3s, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
    display: inline-flex; align-items: center; gap: 7px;
    text-decoration: none; white-space: nowrap;
  }
  .btn-o:hover { background: var(--gold-dim); transform: translateY(-2px); box-shadow: 0 8px 22px rgba(214,180,113,.2); }

  /* carousel arrow */
  .arr {
    width: 46px; height: 46px; border-radius: 50%;
    border: 1px solid rgba(214,180,113,.4);
    background: rgba(7,7,7,.65); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--gold);
    transition: all .3s; flex-shrink: 0; outline: none;
  }
  .arr:hover { background: var(--gold-dim); border-color: var(--gold); transform: scale(1.08); box-shadow: 0 0 20px rgba(214,180,113,.3); }
  .arr-sm { width: 34px; height: 34px; }

  /* pinned-image scroll effect: the image holds in place while the
     text column beside it (taller by design) scrolls past. align-self
     start is required — grid items stretch to row height by default,
     which would make position:sticky a no-op. Desktop-only: on a
     collapsed single-column mobile layout, an image "sticking" while
     scrolling past itself makes no sense, so it reverts to static. */
  .pin-media { position: sticky; top: calc(var(--header-h) + 28px); align-self: start; }
  @media (max-width: 900px) {
    /* relative, not static — this element still needs to be the
       containing block for its absolutely-positioned children */
    .pin-media { position: relative !important; top: auto !important; }
  }

  /* ════════════════════════════════════════════
     HERO — one unified full-viewport block.
     3D car is layer 1 spanning 100% w/h.
     All overlays are position:absolute on top.
     Cards strip is pinned to bottom:0 inside.
     NO side panels. NO background divisions.
  ════════════════════════════════════════════ */
  .hero {
    position: relative;
    width: 100%;
    height: 100dvh;
    min-height: 620px;
    overflow: hidden;
    background: #070707;
  }
  /* luxury video backdrop + colour grade */
  .hero-video {
    position: absolute; inset: 0; z-index: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center 40%;
    transition: opacity 1.8s ease-in-out;
  }
  .hero-grade {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(120deg, rgba(120,90,10,.28) 0%, transparent 45%),
      radial-gradient(ellipse 80% 60% at 75% 15%, rgba(230,204,153,.20) 0%, transparent 60%);
    mix-blend-mode: overlay;
  }
  .hero-orb {
    position: absolute; z-index: 2; border-radius: 50%;
    filter: blur(70px); pointer-events: none; mix-blend-mode: screen;
  }
  .hero-orb-a { width: 46vw; height: 46vw; left: -12vw; top: 4%; background: radial-gradient(circle, rgba(214,180,113,.28) 0%, transparent 70%); animation: orbfloat-a 26s ease-in-out infinite; }
  .hero-orb-b { width: 34vw; height: 34vw; right: -8vw; top: 40%; background: radial-gradient(circle, rgba(230,204,153,.22) 0%, transparent 70%); animation: orbfloat-b 32s ease-in-out infinite; }
  .hero-orb-c { width: 30vw; height: 30vw; left: 30%; bottom: -14%; background: radial-gradient(circle, rgba(214,180,113,.18) 0%, transparent 70%); animation: orbfloat-c 28s ease-in-out infinite; }
  @keyframes orbfloat-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(4vw,3vh) scale(1.08); } }
  @keyframes orbfloat-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-3vw,-4vh) scale(1.1); } }
  @keyframes orbfloat-c { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(2vw,-3vh) scale(1.06); } }

  .hero-particles { position: absolute; inset: 0; z-index: 3; pointer-events: none; overflow: hidden; }
  .hero-particles span {
    position: absolute; border-radius: 50%;
    background: var(--gold-lt);
    box-shadow: 0 0 6px 1px rgba(230,204,153,.6);
    animation-name: twinkle;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  @keyframes twinkle { 0%,100% { opacity: 0; transform: translateY(0); } 50% { opacity: .85; transform: translateY(-14px); } }

  .hero-scrim {
    position: absolute; inset: 0; z-index: 4; pointer-events: none;
    background:
      linear-gradient(to right, rgba(4,4,4,.82) 0%, rgba(4,4,4,.42) 42%, transparent 72%),
      linear-gradient(to bottom, rgba(4,4,4,.35) 0%, transparent 30%, transparent 60%, rgba(4,4,4,.92) 100%);
  }
  [dir="rtl"] .hero-scrim {
    background:
      linear-gradient(to left, rgba(4,4,4,.82) 0%, rgba(4,4,4,.42) 42%, transparent 72%),
      linear-gradient(to bottom, rgba(4,4,4,.35) 0%, transparent 30%, transparent 60%, rgba(4,4,4,.92) 100%);
  }

  /* hero content row — plain flexbox, no transform, so Framer Motion's
     own animation transform never fights the layout. Two children,
     space-between: main text packs to the reading-start side, the
     stats block packs to the reading-end side — this flips correctly
     for RTL automatically since it follows the row's writing direction,
     no separate RTL override needed. */
  .h-wrap {
    position: absolute; inset: 0; z-index: 10;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 clamp(20px,6vw,80px);
    padding-bottom: var(--cards-h);
  }
  [dir="rtl"] .h-wrap { text-align: right; }
  .h-content {
    width: min(620px, 90vw);
    display: flex; flex-direction: column;
  }
  [dir="rtl"] .h-content { align-items: flex-end; }
  .h-stats {
    display: flex; flex-direction: column; gap: 22px;
    padding-inline-start: 32px;
    border-inline-start: 1px solid rgba(214,180,113,.22);
    flex-shrink: 0;
  }
  .h-stat-val { font-size: clamp(22px,2.2vw,32px); font-weight: 500; font-style: italic; color: var(--gold); line-height: 1; }
  .h-stat-label { font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-top: 6px; }
  .scroll-cue {
    position: absolute;
    left: 50%; bottom: calc(var(--cards-h) + 26px);
    transform: translateX(-50%);
    z-index: 10;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--gold); opacity: .55;
    animation: cuebob 2.6s ease-in-out infinite;
    pointer-events: none;
  }
  .scroll-cue span { width: 1px; height: 26px; background: linear-gradient(to bottom, transparent, var(--gold)); }
  @keyframes cuebob { 0%,100% { transform: translate(-50%,0); } 50% { transform: translate(-50%,8px); } }

  /* infinite marquee strip */
  .marquee {
    position: relative;
    overflow: hidden;
    background: var(--black);
    border-top: 1px solid rgba(214,180,113,.16);
    border-bottom: 1px solid rgba(214,180,113,.16);
    padding: 22px 0;
  }
  .marquee::before, .marquee::after {
    content: ""; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none;
  }
  .marquee::before { left: 0; background: linear-gradient(to right, var(--black), transparent); }
  .marquee::after { right: 0; background: linear-gradient(to left, var(--black), transparent); }
  .marquee-track {
    display: flex; align-items: center; gap: 40px; width: max-content;
    animation: marquee-scroll 42s linear infinite;
  }
  [dir="rtl"] .marquee-track { animation-direction: reverse; }
  @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-item {
    display: inline-flex; align-items: center; gap: 40px;
    font-size: clamp(16px,2vw,24px); font-style: italic; font-weight: 500;
    color: rgba(245,240,232,.5); white-space: nowrap; letter-spacing: .01em;
  }
  .marquee-dot { color: var(--gold); font-size: 10px; opacity: .6; font-style: normal; }

  /* floating call/whatsapp quick actions */
  .float-actions {
    position: fixed; bottom: 24px; z-index: 150;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .float-btn {
    width: 54px; height: 54px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(145deg, var(--gold-lt), var(--gold));
    color: var(--black); text-decoration: none;
    box-shadow: 0 10px 26px rgba(0,0,0,.45), 0 0 0 1px rgba(214,180,113,.3);
  }
  .float-btn-o {
    width: 46px; height: 46px;
    background: rgba(7,7,7,.78); border: 1px solid var(--gold); color: var(--gold);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  }
  @media (max-width: 900px) {
    .float-actions { bottom: calc(var(--cards-h) + 18px); }
  }
    /* Container for the buttons on mobile */
.mobile-btn-container {
  position: absolute;
  bottom: calc(var(--cards-h) + 20px);
  left: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  z-index: 10;
}

  /* desktop 4-col cards strip */
  .cards-desk {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: var(--cards-h);
    box-shadow:
    0 -10px 40px rgba(0,0,0,.45),
    inset 0 1px 0 rgba(255,255,255,.03);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(4,4,4,0.86);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(214,180,113,.2);
    z-index: 30;
  }
.c-cell{
  position:relative;
  padding:22px 20px;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.04),
    rgba(255,255,255,0.015)
  );
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-right:1px solid rgba(255,255,255,0.06);
  transition: all .45s cubic-bezier(.22,1,.36,1);
  overflow:hidden;
}
.c-cell::before{
  content:"";
  position:absolute;
  top:0;
  left:-100%;
  width:100%;
  height:1px;
  background:linear-gradient(
    90deg,
    transparent,
    var(--gold),
    transparent
  );
  transition: all .7s ease;
}
  .c-cell:hover .card-title{
  color:var(--gold-lt);
}

.c-cell:hover .card-desc{
  color:rgba(255,255,255,.75);
}

.c-cell:hover::before{
  left:100%;
}
  .c-cell:last-child { border-right: none; }
.c-cell:hover{
  transform: translateY(-10px);
  background: linear-gradient(
    180deg,
    rgba(214,180,113,.08),
    rgba(255,255,255,.02)
  );
  box-shadow:
    0 20px 40px rgba(0,0,0,.45),
    inset 0 1px 0 rgba(255,255,255,.05),
    0 0 20px rgba(214,180,113,.08);
}
    .icon-box{
  width:38px;
  height:38px;
  border-radius:12px;
  background: linear-gradient(
    145deg,
    rgba(214,180,113,.18),
    rgba(214,180,113,.05)
  );
  border:1px solid rgba(214,180,113,.18);
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
}
  .c-cell:not(:last-child)::after{
  content:"";
  position:absolute;
  top:20%;
  right:0;
  width:1px;
  height:60%;
  background:linear-gradient(
    to bottom,
    transparent,
    rgba(214,180,113,.2),
    transparent
  );
}
/* Icon glow */
.c-cell:hover .icon-box {
  box-shadow: 0 0 15px rgba(201, 168, 76, 0.3);
}
  .specs-row {
  display: flex;
  gap: 26px;
  margin-bottom: 14px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.spec-label {
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--muted);
  font-family: 'Montserrat', sans-serif;
}

.spec-value {
  font-size: 13px;
  color: var(--off);
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
}

/* subtle divider lines */
.spec-item:not(:last-child)::after {
  content: "";
  position: absolute;
  right: -13px;
  top: 4px;
  height: 60%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(214,180,113,.25),
    transparent
  );
}
  /* ✅ RTL */
[dir="rtl"] .spec-item:not(:last-child)::after {
  right: auto;
  left: -13px;
}
  /* mobile carousel cards strip */
  .cards-mob {
    display: none;
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: rgba(4,4,4,.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(214,180,113,.2);
    z-index: 30;
    overflow: hidden;
  }
  .m-track {
    display: flex;
    transition: transform .38s cubic-bezier(.22,1,.36,1);
  }
  .m-slide {
    min-width: 100%;
    padding: 16px 24px 10px;
    display: flex; flex-direction: column; gap: 7px;
  }

  /* service cards */
  .svc-card {
    background: rgba(255,255,255,.025);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 14px; padding: 26px 22px;
    transition: all .3s;
  }
  .svc-card:hover { border-color: rgba(214,180,113,.3); transform: translateY(-4px); background: rgba(214,180,113,.04); }
  .svc-card.ft { background: rgba(214,180,113,.06); border-color: rgba(214,180,113,.35); }
  .svc-card.has-media { padding: 0; overflow: hidden; }
  .svc-media { position: relative; height: 150px; overflow: hidden; }
  .svc-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(7,6,3,.05) 0%, rgba(7,6,3,.5) 100%); }
  .svc-body-pad { padding: 22px 22px 26px; }
  /* ── RESPONSIVE ── */
  @media (max-width: 1180px) {
    .h-stats { display: none !important; }
  }
  @media (max-width: 900px) {
    :root { --cards-h: 148px; }

    .hero { height: 100dvh !important; }
    .hero-orb { filter: blur(42px); }
    .hero-video { object-position: center 32%; }

    .h-wrap { padding: 0 22px !important; }
    .h-content { width: 100% !important; }
    .h-hl { font-size: clamp(26px, 8vw, 40px) !important; }
    .scroll-cue { display: none !important; }

    .cards-desk { display: none !important; }
    .cards-mob  { display: block !important; }
    .nav-links  { display: none !important; }
    .btn-o.hide-xs { display: none !important; }
  }
  @media (max-width: 540px) {
    .svc-grid { grid-template-columns: 1fr !important; }
    .h-hl { font-size: clamp(24px, 9vw, 34px) !important; }
    .btn-o.hide-xs { display: none !important; }
  }
    /* hide desktop nav on mobile */
@media (max-width: 900px) {
  .nav-links {
    display: none !important;
  }

  .menu-btn {
    display: block !important;
  }

  .hide-xs {
    display: none !important;
  }
}

  /* ════════════════════════════════════════════
     INNER PAGES — banner, fleet, gallery, testimonials
  ════════════════════════════════════════════ */
  .page-hero {
    position: relative;
    padding: calc(var(--header-h) + 84px) clamp(24px,5vw,80px) 80px;
    background: radial-gradient(ellipse at 50% 0%, #171104 0%, var(--black) 62%);
    border-bottom: 1px solid rgba(214,180,113,.12);
    text-align: center;
    overflow: hidden;
  }
  .page-hero::before {
    content: "";
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.028;
  }
  .breadcrumb {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: .12em;
    text-transform: uppercase; color: var(--muted); margin-top: 18px;
  }
  .breadcrumb a { color: var(--muted); text-decoration: none; transition: color .2s; }
  .breadcrumb a:hover { color: var(--gold); }

  /* fleet */
  .fleet-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
  .fleet-card {
    position: relative;
    border-radius: 18px; overflow: hidden;
    background: linear-gradient(160deg, rgba(214,180,113,.10), rgba(255,255,255,.02));
    border: 1px solid rgba(214,180,113,.18);
    transition: all .4s cubic-bezier(.22,1,.36,1);
  }
  .fleet-card:hover { transform: translateY(-6px); border-color: rgba(214,180,113,.4); box-shadow: 0 24px 50px rgba(0,0,0,.5), 0 0 26px rgba(214,180,113,.10); }
  .fleet-media {
    position: relative; height: 200px; overflow: hidden;
    background: radial-gradient(ellipse at 50% 30%, rgba(214,180,113,.16) 0%, transparent 70%), #0c0a06;
    border-bottom: 1px solid rgba(214,180,113,.15);
  }
  .fleet-media::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(7,6,3,.05) 0%, rgba(7,6,3,.55) 100%);
    pointer-events: none;
  }
  .fleet-body { padding: 22px 24px 26px; }

  /* gallery — asymmetric masonry via row-span, not a uniform grid */
  .gallery-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    grid-auto-rows: 110px; grid-auto-flow: dense; gap: 14px;
  }
  .gallery-tile {
    position: relative; border-radius: 14px; overflow: hidden;
    background: radial-gradient(ellipse at 30% 20%, rgba(214,180,113,.16) 0%, transparent 60%), linear-gradient(160deg,#171204,#0a0904);
    border: 1px solid rgba(214,180,113,.14);
    grid-row: span 2;
    transition: border-color .3s;
  }
  .gallery-tile:hover { border-color: rgba(214,180,113,.4); }
  .gallery-tile.tall { grid-row: span 3; }
  .gallery-tile.wide { grid-column: span 2; }
  .gallery-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gallery-caption {
    position: absolute; inset: 0; z-index: 2; pointer-events: none;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    gap: 8px; padding: 18px 14px;
    background: linear-gradient(to top, rgba(7,6,3,.88) 0%, rgba(7,6,3,.15) 55%, transparent 100%);
  }

  .testimonial-card {
    background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.08);
    border-radius: 16px; padding: 30px 26px; position: relative;
  }
  .testimonial-card:hover { border-color: rgba(214,180,113,.3); }
  .map-card {
    position: relative; overflow: hidden;
    border-radius: 16px; padding: 40px 24px; min-height: 160px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
    border: 1px solid rgba(214,180,113,.16);
    text-align: center;
  }
  .map-card span { font-size: 12px; color: var(--muted); line-height: 1.6; max-width: 260px; }
  .quote-mark { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 54px; color: rgba(214,180,113,.35); line-height: 1; margin-bottom: 8px; }
  .stars { display: flex; gap: 3px; margin-bottom: 14px; }

  /* about — values grid + timeline */
  .values-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
  .timeline { display: flex; justify-content: space-between; gap: 20px; position: relative; padding-top: 22px; }
  .timeline::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(214,180,113,.4),transparent); }
  .timeline-item { flex: 1; text-align: center; position: relative; display: flex; flex-direction: column; gap: 8px; }
  .timeline-item::before {
    content: ""; position: absolute; top: -26px; left: 50%; transform: translateX(-50%);
    width: 9px; height: 9px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 10px rgba(214,180,113,.6);
  }

  @media (max-width: 900px) {
    .fleet-grid { grid-template-columns: repeat(2,1fr) !important; }
    .gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
    .page-hero { padding: calc(var(--nav-h) + 56px) 20px 52px !important; }
    .svc-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .contact-form-row { grid-template-columns: 1fr !important; }
    .about-grid, .why-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
    .values-grid { grid-template-columns: repeat(2,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    /* every stacked content section on the same 90-100px top+bottom
       rhythm makes mobile pages feel like an endless scroll once grids
       collapse to one column — tighten the rhythm without touching desktop */
    .section-pad { padding-top: 60px !important; padding-bottom: 60px !important; }
    .section-pad-b { padding-bottom: 60px !important; }
    .timeline { flex-direction: column !important; gap: 28px !important; padding-top: 0 !important; }
    .timeline::before { left: 5px !important; right: auto !important; top: 0 !important; bottom: 0 !important; width: 1px !important; height: auto !important; background: linear-gradient(180deg,transparent,rgba(214,180,113,.4),transparent) !important; }
    .timeline-item { flex-direction: row !important; align-items: center !important; text-align: left !important; padding-left: 26px !important; }
    .timeline-item::before { top: 50% !important; left: 0 !important; transform: translateY(-50%) !important; }
    [dir="rtl"] .timeline-item { text-align: right !important; padding-left: 0 !important; padding-right: 26px !important; }
    [dir="rtl"] .timeline-item::before { left: auto !important; right: 0 !important; }
    [dir="rtl"] .timeline::before { left: auto !important; right: 5px !important; }
  }
  @media (max-width: 600px) {
    .fleet-grid { grid-template-columns: 1fr !important; }
    .gallery-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
    .testimonial-grid { grid-template-columns: 1fr !important; }
    .values-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .section-pad { padding-top: 48px !important; padding-bottom: 48px !important; }
    .section-pad-b { padding-bottom: 48px !important; }
    .about-grid, .why-grid { gap: 28px !important; }
  }

  /* respect reduced-motion: stop the decorative infinite-loop
     animations (shimmer, orb drift, particles, watermark pulse,
     scroll cue) — one-shot fade-ins are brief enough to keep */
  @media (prefers-reduced-motion: reduce) {
    .shimmer { animation: none; background-position: 0 0; }
    .wm { animation: none; }
    .hero-orb { animation: none; }
    .hero-particles span { animation: none; opacity: .5; }
    .scroll-cue { animation: none; }
    .marquee-track { animation: none; }
    .page-loader-line::after { animation: none; left: 0; width: 100%; }
    .float-btn, .c-cell, .svc-card, .fleet-card, .gallery-tile, .testimonial-card, .arr {
      transition: none;
    }
  }

  /* full-screen branded loader, shown until the page is actually ready */
  .page-loader {
    position: fixed; inset: 0; z-index: 500;
    display: flex; align-items: center; justify-content: center;
    background: var(--black);
    opacity: 1; visibility: visible;
    transition: opacity .7s ease, visibility .7s ease;
  }
  .page-loader-out { opacity: 0; visibility: hidden; pointer-events: none; }
  .page-loader-mark { display: flex; flex-direction: column; align-items: center; gap: 20px; }
  .page-loader-line {
    width: 100px; height: 1px; position: relative; overflow: hidden;
    background: rgba(214,180,113,.2);
  }
  .page-loader-line::after {
    content: ""; position: absolute; inset: 0; width: 40%;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    animation: loader-sweep 1.3s ease-in-out infinite;
  }
  @keyframes loader-sweep {
    0% { transform: translateX(-140%); }
    100% { transform: translateX(340%); }
  }

  /* custom cursor — the class only lands once CustomCursor.tsx has seen a real
     mouse move, and comes straight back off for touch/blur/tab-switch, so the
     native cursor is always the fallback. !important is required: dozens of
     inline cursor:pointer styles would otherwise win and show both cursors */
  html.custom-cursor-active,
  html.custom-cursor-active *:not(input):not(textarea):not(select):not([contenteditable]) {
    cursor: none !important;
  }
  .cursor-dot, .cursor-ring {
    position: fixed; top: 0; left: 0; z-index: 2147483647;
    pointer-events: none; border-radius: 50%;
    opacity: 0; will-change: transform;
    transition: opacity .18s linear;
  }
  .cursor-dot.cursor-visible, .cursor-ring.cursor-visible { opacity: 1; }
  .cursor-dot {
    width: 6px; height: 6px; background: var(--gold);
  }
  .cursor-ring {
    width: 34px; height: 34px; border: 1px solid rgba(214,180,113,.5);
    transition: width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1),
                background .3s, border-color .3s, opacity .18s linear;
  }
  .cursor-ring.cursor-ring-active {
    width: 52px; height: 52px;
    background: rgba(214,180,113,.12);
    border-color: rgba(214,180,113,.8);
  }
  @media (prefers-reduced-motion: reduce) {
    .cursor-dot, .cursor-ring { transition: none; }
  }
  /* belt and braces: no device without a fine pointer ever paints these */
  @media (pointer: coarse), (hover: none) {
    .cursor-dot, .cursor-ring { display: none !important; }
    html.custom-cursor-active, html.custom-cursor-active * { cursor: auto !important; }
  }

  /* utility top bar — desktop only (900px+), sits above the main nav */
  .topbar {
    display: none;
    position: fixed; top: 0; left: 0; right: 0; z-index: 201;
    height: var(--topbar-h);
    background: #050505;
    border-bottom: 1px solid rgba(214,180,113,.1);
  }
  @media (min-width: 901px) {
    .topbar { display: flex; align-items: center; }
  }
  .topbar-inner {
    width: 100%; max-width: 1400px; margin: 0 auto;
    padding: 0 clamp(16px,4vw,40px);
    display: flex; align-items: center; justify-content: space-between;
  }
  .topbar-contact { display: flex; align-items: center; gap: 16px; }
  .topbar a {
    display: inline-flex; align-items: center; gap: 6px;
    color: rgba(245,240,232,.5); text-decoration: none;
    font-family: 'Montserrat', sans-serif; font-size: 10.5px; letter-spacing: .03em;
    transition: color .2s;
  }
  .topbar-contact a:hover { color: var(--gold); }
  .topbar-divider { width: 1px; height: 11px; background: rgba(214,180,113,.22); }
  .topbar-social { display: flex; align-items: center; gap: 14px; }
  .topbar-social a { color: var(--gold); opacity: .6; transition: opacity .2s, transform .2s; }
  .topbar-social a:hover { opacity: 1; transform: translateY(-1px); }
`;