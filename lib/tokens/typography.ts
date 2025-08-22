export type RoleKey =
  | "title-1" | "title-2" | "title-3"
  | "h1" | "h2" | "h3" | "h4"
  | "label-1" | "label-2" | "label-3"
  | "body-1" | "body-2" | "body-3"
  | "tiny" | "tiny-extended" | "micro";

export const TYPOGRAPHY_ROLES: Record<RoleKey, { className: string; description: string }> = {
  "title-1": { className: "text-title-1", description: "Hero / large title" },
  "title-2": { className: "text-title-2", description: "Page title / section hero" },
  "title-3": { className: "text-title-3", description: "Section title" },
  h1: { className: "text-h1", description: "Primary heading" },
  h2: { className: "text-h2", description: "Secondary heading" },
  h3: { className: "text-h3", description: "Tertiary heading" },
  h4: { className: "text-h4", description: "Quaternary heading" },
  "label-1": { className: "text-label-1", description: "Large label / button" },
  "label-2": { className: "text-label-2", description: "Medium label / input" },
  "label-3": { className: "text-label-3", description: "Small label / meta" },
  "body-1": { className: "text-body-1", description: "Paragraph body" },
  "body-2": { className: "text-body-2", description: "Secondary body" },
  "body-3": { className: "text-body-3", description: "Tertiary body / small" },
  tiny: { className: "text-tiny", description: "Tiny badge" },
  "tiny-extended": { className: "text-tiny-extended", description: "Tiny extended tracking" },
  micro: { className: "text-micro", description: "Micro" },
};
