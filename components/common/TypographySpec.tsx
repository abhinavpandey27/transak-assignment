import React from "react";
import { TYPOGRAPHY_ROLES, type RoleKey } from "@/lib/tokens/typography";

export function TypographySpec() {
  const roles = Object.keys(TYPOGRAPHY_ROLES) as RoleKey[];
  
  // Define the CSS variable values directly for immediate visual feedback
  const typographyStyles: Record<RoleKey, React.CSSProperties> = {
    "title-1": { fontSize: "clamp(48px, calc(48px + (64 - 48) * ((100vw - 420px) / (1100 - 420))), 64px)", lineHeight: "clamp(58px, calc(58px + (70 - 58) * ((100vw - 420px) / (1100 - 420))), 70px)", letterSpacing: "-0.8px", fontWeight: 600 },
    "title-2": { fontSize: "clamp(32px, calc(32px + (40 - 32) * ((100vw - 420px) / (1100 - 420))), 40px)", lineHeight: "clamp(40px, calc(40px + (48 - 40) * ((100vw - 420px) / (1100 - 420))), 48px)", letterSpacing: "-0.64px", fontWeight: 600 },
    "title-3": { fontSize: "clamp(28px, calc(28px + (32 - 28) * ((100vw - 420px) / (1100 - 420))), 32px)", lineHeight: "clamp(32px, calc(32px + (36 - 32) * ((100vw - 420px) / (1100 - 420))), 36px)", letterSpacing: "-0.6px", fontWeight: 600 },
    h1: { fontSize: "clamp(24px, calc(24px + (28 - 24) * ((100vw - 420px) / (1100 - 420))), 28px)", lineHeight: "clamp(28px, calc(28px + (32 - 28) * ((100vw - 420px) / (1100 - 420))), 32px)", letterSpacing: "-0.56px", fontWeight: 600 },
    h2: { fontSize: "clamp(22px, calc(22px + (26 - 22) * ((100vw - 420px) / (1100 - 420))), 26px)", lineHeight: "clamp(26px, calc(26px + (30 - 26) * ((100vw - 420px) / (1100 - 420))), 30px)", letterSpacing: "-0.26px", fontWeight: 600 },
    h3: { fontSize: "clamp(20px, calc(20px + (24 - 20) * ((100vw - 420px) / (1100 - 420))), 24px)", lineHeight: "clamp(24px, calc(24px + (28 - 24) * ((100vw - 420px) / (1100 - 420))), 28px)", letterSpacing: "-0.24px", fontWeight: 600 },
    h4: { fontSize: "clamp(18px, calc(18px + (20 - 18) * ((100vw - 420px) / (1100 - 420))), 20px)", lineHeight: "clamp(22px, calc(22px + (24 - 22) * ((100vw - 420px) / (1100 - 420))), 24px)", letterSpacing: "-0.2px", fontWeight: 600 },
    "label-1": { fontSize: "clamp(16px, calc(16px + (17 - 16) * ((100vw - 420px) / (1100 - 420))), 17px)", lineHeight: "20px", letterSpacing: "-0.18px", fontWeight: 400 },
    "label-2": { fontSize: "clamp(14px, calc(14px + (15 - 14) * ((100vw - 420px) / (1100 - 420))), 15px)", lineHeight: "18px", letterSpacing: "-0.16px", fontWeight: 400 },
    "label-3": { fontSize: "clamp(12px, calc(12px + (13 - 12) * ((100vw - 420px) / (1100 - 420))), 13px)", lineHeight: "16px", letterSpacing: "-0.14px", fontWeight: 400 },
    "body-1": { fontSize: "clamp(15px, calc(15px + (16 - 15) * ((100vw - 420px) / (1100 - 420))), 16px)", lineHeight: "22px", letterSpacing: "0px", fontWeight: 400 },
    "body-2": { fontSize: "clamp(13px, calc(13px + (14 - 13) * ((100vw - 420px) / (1100 - 420))), 14px)", lineHeight: "20px", letterSpacing: "0px", fontWeight: 400 },
    "body-3": { fontSize: "clamp(11px, calc(11px + (12 - 11) * ((100vw - 420px) / (1100 - 420))), 12px)", lineHeight: "16px", letterSpacing: "0px", fontWeight: 400 },
    tiny: { fontSize: "10px", lineHeight: "12px", letterSpacing: "0px", fontWeight: 500 },
    "tiny-extended": { fontSize: "10px", lineHeight: "12px", letterSpacing: "1px", fontWeight: 500 },
    micro: { fontSize: "9px", lineHeight: "10px", letterSpacing: "0px", fontWeight: 600 },
  };

  return (
    <div className="space-y-6">
      {roles.map((key) => {
        const { className, description } = TYPOGRAPHY_ROLES[key];
        const styles = typographyStyles[key];
        
        return (
          <div key={key} className="flex items-baseline justify-between gap-6 border-b pb-4">
            <div className="flex-1">
              <div 
                className="font-sans text-slate-900 dark:text-white"
                style={styles}
              >
                The quick brown fox — {key}
              </div>
              <p className="text-body-2 text-muted-foreground mt-1">{description}</p>
              
              {/* Show the actual computed values */}
              <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-400">
                <div>Size: {styles.fontSize}</div>
                <div>Line-height: {styles.lineHeight}</div>
                <div>Letter-spacing: {styles.letterSpacing}</div>
                <div>Weight: {styles.fontWeight}</div>
              </div>
            </div>
            <div className="text-right">
              <code className="text-body-3 text-muted-foreground bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{className}</code>
            </div>
          </div>
        );
      })}
    </div>
  );
}
