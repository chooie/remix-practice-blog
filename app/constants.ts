export const COLORS = {
  white: "white",
  gray: {
    100: "var(--color-gray-100)",
    300: "var(--color-gray-300)",
    500: "var(--color-gray-500)",
    700: "var(--color-gray-700)",
    900: "var(--color-gray-900)",
  },
  primary: "var(--color-dark-blue)",
  secondary: "var(--color-lighter-blue)",
  accent1: "var(--color-light-orange)",
};

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
};

export const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 1100,
  desktopMin: 1500,
};

const hasFineCursor = "(pointer: fine)";
const hasHover = "(hover: hover)";
const motionAllowed = "(prefers-reduced-motion: no-preference)";

export const QUERIES = {
  // We're using a mobile-first design, so tablet is the next first query as
  // device width increases
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  tabletOnly: `
    (min-width: ${BREAKPOINTS.tabletMin / 16}rem) and
    (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
  hasFineCursor,
  motionAllowed,
  hasHoverAndMotionAllowed: `${hasHover} and ${motionAllowed}`,
};
