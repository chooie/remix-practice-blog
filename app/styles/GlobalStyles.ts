import { createGlobalStyle, css } from "styled-components";

import * as constants from "~/constants";

const nightThemeColors = css`
  --color-primary: var(--color-dark-blue-1);
  --color-primary-2: var(--color-dark-blue-2);
  --color-primary-3: var(--color-dark-blue-3);
  --color-secondary: var(--color-gray-50);
  --color-text: var(--color-gray-1000);
`;

export default createGlobalStyle`

${reset}

body {
  /* Default light theme colors */
  --color-primary: var(--color-blue-1);
  --color-primary-2: var(--color-blue-2);
  --color-primary-3: var(--color-blue-3);
  --color-secondary: var(--color-light-blue);
  --color-accent-1: var(--color-light-orange);

  --color-text: var(--color-gray-50);

  &.dark-theme {
    ${nightThemeColors}
  }

  @media (prefers-color-scheme: dark) {
    ${nightThemeColors}
  }
}

:root {
  --standard-vertical-padding: 8px;
  --standard-side-padding: 16px;


  /* Don't require loading @reach styles: https://reach.tech/styling */
  --reach-dialog: 1;
}

body {
  font-family: 'Inter', sans-serif;
  font-synthesis: none;

  background-color: ${constants.COLORS.primary2};
  color: ${constants.COLORS.text}
}

#root {
  min-height: 100%;
}

p, a, h1, h2, h3, h4, h5, h6 {
  max-width: 100%;
}

a {
  overflow-wrap: break-word;
}

a {
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: revert;
  }
}
`;

function reset() {
  // From https://www.joshwcomeau.com/css/custom-css-reset/

  return css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    html,
    body {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }

    #root {
      isolation: isolate;
    }

    /* Experimental line-height */
    * {
      line-height: calc(1em + 0.5rem);
    }
  `;
}
