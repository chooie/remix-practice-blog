export const COLORS = {
  white: "white",
  gray: {
    50: "var(--color-gray-50)",
    100: "var(--color-gray-100)",
    200: "var(--color-gray-200)",
    300: "var(--color-gray-300)",
    400: "var(--color-gray-400)",
    500: "var(--color-gray-500)",
    600: "var(--color-gray-600)",
    700: "var(--color-gray-700)",
    800: "var(--color-gray-800)",
    900: "var(--color-gray-900)",
    1000: "var(--color-gray-1000)",
  },
  primary1: "var(--color-blue-1)",
  primary2: "var(--color-blue-2)",
  primary3: "var(--color-blue-3)",
  secondary: "var(--color-light-blue);",
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
