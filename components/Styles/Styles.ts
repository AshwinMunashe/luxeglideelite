export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-lt: #E8C97A;
    --gold-dim: rgba(201,168,76,0.18);
    --black: #070707;
    --off: #F5F0E8;
    --muted: rgba(245,240,232,0.52);
    --nav-h: 60px;
    --cards-h: 128px;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--black); color: var(--off); overflow-x: hidden; }
  .fd { font-family: 'Poppins', sans-serif; }
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
    transition: background .3s, transform .2s;
    display: inline-flex; align-items: center; gap: 7px;
    text-decoration: none; white-space: nowrap;
  }
  .btn-g:hover { background: var(--gold-lt); transform: translateY(-2px); }
  .btn-o {
    background: transparent; color: var(--gold);
    font-family: 'Montserrat', sans-serif; font-weight: 400;
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    padding: 10px 22px; border-radius: 999px; border: 1px solid var(--gold); cursor: pointer;
    transition: all .3s;
    display: inline-flex; align-items: center; gap: 7px;
    text-decoration: none; white-space: nowrap;
  }
  .btn-o:hover { background: var(--gold-dim); transform: translateY(-2px); }

  /* carousel arrow */
  .arr {
    width: 46px; height: 46px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,.4);
    background: rgba(7,7,7,.65); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--gold);
    transition: all .3s; flex-shrink: 0; outline: none;
  }
  .arr:hover { background: var(--gold-dim); border-color: var(--gold); transform: scale(1.08); }
  .arr-sm { width: 34px; height: 34px; }

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
    border-top: 1px solid rgba(201,168,76,.2);
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
    rgba(201,168,76,.08),
    rgba(255,255,255,.02)
  );
  box-shadow:
    0 20px 40px rgba(0,0,0,.45),
    inset 0 1px 0 rgba(255,255,255,.05),
    0 0 20px rgba(201,168,76,.08);
}
    .icon-box{
  width:38px;
  height:38px;
  border-radius:12px;
  background: linear-gradient(
    145deg,
    rgba(201,168,76,.18),
    rgba(201,168,76,.05)
  );
  border:1px solid rgba(201,168,76,.18);
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
    rgba(201,168,76,.2),
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
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
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
    rgba(201,168,76,.25),
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
    border-top: 1px solid rgba(201,168,76,.2);
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
  .svc-card:hover { border-color: rgba(201,168,76,.3); transform: translateY(-4px); background: rgba(201,168,76,.04); }
  .svc-card.ft { background: rgba(201,168,76,.06); border-color: rgba(201,168,76,.35); }
.h-right {
  position: absolute;
  top: calc(var(--nav-h) + 120px);
  z-index: 10;

  display: flex;
  flex-direction: column;

  right: clamp(20px, 5vw, 64px); /* default LTR */
  align-items: flex-end;
  text-align: right;
}

/* ✅ RTL override */
[dir="rtl"] .h-right {
  right: auto;
  left: clamp(20px, 5vw, 64px);

  align-items: flex-start;
  text-align: left;
}
  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    :root { --cards-h: 148px; }
    
    /* 1. Reset hero layout for mobile */
    .hero { height: 100dvh !important; }
    
    /* 2. Resize 3D Model: Shrink and center it so text doesn't overlap */
    .hero > div:nth-child(2) {
      height: 50% !important;
      top: 25% !important; /* Vertically center the model */
      pointer-events: none; /* Let clicks pass through to text/buttons */
    }

    /* 3. Text Overlay: Move to top, scale down */
    .h-left { 
      top: calc(var(--nav-h) + 20px) !important; 
      max-width: 90% !important; 
      left: 20px !important;
    }
    .h-hl { font-size: clamp(22px, 6vw, 32px) !important;
     white-space: nowrap;}
    
    /* 4. Car Details: Re-enable and position in top-right */
   .h-right {
    top: 55% !important; /* Move down to center it vertically */
    right: 20px !important;
    left: 20px !important;
    align-items: center !important; /* Center content */
    text-align: center !important;
  }
    .h-right .fd { 
    font-size: 20px !important; 
    margin-bottom: 8px !important;
  }
   .specs-row {
  display: flex;
  gap: 26px;
}

/* ✅ RTL flip */
[dir="rtl"] .specs-row {
  flex-direction: row-reverse;
}

  .spec-value {
    font-size: 12px;
  }
    /* 5. Cleanup */
    .cards-desk { display: none !important; }
    .cards-mob  { display: block !important; }
    .nav-links  { display: none !important; }
    .btn-o.hide-xs { display: none !important; }
  }
  @media (max-width: 540px) {
    .svc-grid { grid-template-columns: 1fr !important; }
    .h-hl { font-size: clamp(18px, 7vw, 28px) !important;
    white-space: nowrap !important; }
    .h-left { max-width: 70vw !important; }
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
`;