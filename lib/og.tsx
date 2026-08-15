export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogTemplate({
  tag,
  title,
  subtitle,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#070707",
        backgroundImage:
          "radial-gradient(circle at 12% 15%, rgba(214,180,113,0.22) 0%, rgba(7,7,7,0) 45%), radial-gradient(circle at 92% 88%, rgba(214,180,113,0.14) 0%, rgba(7,7,7,0) 50%)",
        padding: "72px 84px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            display: "flex",
            background: "rgba(214,180,113,.14)",
            border: "1px solid rgba(214,180,113,.4)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              margin: "auto",
              background: "#d6b471",
              transform: "rotate(45deg)",
            }}
          />
        </div>
        <span style={{ fontSize: 20, letterSpacing: 6, textTransform: "uppercase", color: "#d6b471" }}>
          LuxeGlide Elite
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
        {tag && (
          <span style={{ fontSize: 20, letterSpacing: 8, textTransform: "uppercase", color: "#d6b471" }}>
            {tag}
          </span>
        )}
        <span style={{ fontSize: 66, fontWeight: 600, color: "#f5f0e8", lineHeight: 1.12 }}>{title}</span>
        {subtitle && (
          <span style={{ fontSize: 25, color: "rgba(245,240,232,.62)", lineHeight: 1.5, maxWidth: 880 }}>
            {subtitle}
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 18,
          letterSpacing: 2,
          color: "rgba(245,240,232,.4)",
        }}
      >
        <span>luxeglideelite.ae</span>
        <span>DUBAI, UAE</span>
      </div>
    </div> 
  );
}
