import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const strainName = searchParams.get("name") || "Cannabis Strain";
  const strainType = searchParams.get("type") || "Hybrid";
  const thcRange = searchParams.get("thc") || "Unknown";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          backgroundImage: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 25% 25%, #22C55E 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16A34A 0%, transparent 50%)",
            opacity: 0.1,
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Cannabis Leaf Icon */}
          <div
            style={{
              fontSize: "80px",
              marginBottom: "20px",
              filter: "drop-shadow(0 0 20px #22C55E)",
            }}
          >
            🌿
          </div>
          
          {/* Strain Name */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#F3F4F6",
              marginBottom: "16px",
              textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
            }}
          >
            {strainName}
          </div>
          
          {/* Strain Type Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#22C55E",
              color: "#FFFFFF",
              padding: "8px 24px",
              borderRadius: "24px",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "20px",
              boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
            }}
          >
            {strainType === "Indica" ? "🌙" : strainType === "Sativa" ? "☀️" : "⚖️"} {strainType}
          </div>
          
          {/* THC Range */}
          <div
            style={{
              fontSize: "20px",
              color: "#9CA3AF",
              marginBottom: "20px",
            }}
          >
            THC: {thcRange}%
          </div>
          
          {/* Weed Wiki Branding */}
          <div
            style={{
              fontSize: "18px",
              color: "#22C55E",
              fontWeight: "600",
              letterSpacing: "2px",
            }}
          >
            WEED WIKI
          </div>
          
          <div
            style={{
              fontSize: "14px",
              color: "#6B7280",
              marginTop: "8px",
            }}
          >
            Legal-first cannabis education
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
