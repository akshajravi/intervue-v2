// Maps Clerk's prebuilt components onto the whiteboard design system.
//
// Colours are literal hex rather than var(--marker) on purpose: Clerk renders
// into a portal at the document root, and a var that fails to resolve there
// falls back silently to Clerk's default indigo. Literals fail loudly instead.
// The font vars are safe because next/font sets them on <html> (see layout.tsx).

import type { ClerkProvider } from "@clerk/nextjs";
import type { ComponentProps } from "react";

// Derived from the prop itself rather than imported from @clerk/types, which
// isn't a direct dependency. This stays correct if Clerk reshapes the object.
type Appearance = NonNullable<ComponentProps<typeof ClerkProvider>["appearance"]>;

export const clerkAppearance: Appearance = {
  // Keeps Clerk's styles in their own cascade layer so Tailwind's preflight
  // (imported at the top of globals.css) can't fight them.
  cssLayerName: "clerk",
  variables: {
    colorPrimary: "#2b4acb", // --marker, dry-erase blue
    colorForeground: "#1b2a5e", // --ink
    colorMutedForeground: "#5d6b99", // --muted
    colorBackground: "#ffffff", // --card
    colorMuted: "#f5f7fb", // --board
    colorBorder: "#d4dbf0", // --line
    colorInput: "#ffffff",
    colorRing: "#2b4acb",
    colorDanger: "#d93a1c", // --flag, red marker
    colorSuccess: "#1e7a45", // --ok
    fontFamily: "var(--font-bricolage), 'Avenir Next', Verdana, sans-serif",
    fontFamilyButtons: "var(--font-bricolage), 'Avenir Next', Verdana, sans-serif",
    borderRadius: "0.5rem",
    // The house style uses weight extremes; Clerk defaults to 500/600.
    fontWeight: { normal: 400, medium: 500, semibold: 700, bold: 800 },
  },
  elements: {
    card: "iv-clerk-card",
    headerTitle: "iv-clerk-title",
    socialButtonsBlockButton: "iv-clerk-social",
    footer: "iv-clerk-footer",
  },
};
