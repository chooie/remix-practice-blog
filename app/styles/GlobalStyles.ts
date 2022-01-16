import { createGlobalStyle, css } from "styled-components";

import * as constants from "~/constants";

export default createGlobalStyle`
${reset}

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
}

#root {
  min-height: 100%;
  display: flex;
  flex-direction: column;
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
