import styled from "styled-components";
import invariant from "tiny-invariant";

import * as constants from "~/constants";

export default function Footer() {
  return (
    <Wrapper>
      <div>
        <Copyright>
          &copy; Incremental IT 2018-{new Date().getFullYear()}
        </Copyright>
      </div>
      <div>
        <a
          href="#root"
          onClick={(event) => {
            // Disable default scroll
            event.preventDefault();
            const rootElement = document.querySelector("#root");
            invariant(rootElement, "root element must be present");
            rootElement.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Back to top
        </a>
      </div>
      <div></div>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--standard-side-padding);

  min-height: 50px;
  padding: var(--standard-side-padding);
  /*
    Make sure footer is always pushed to the bottom of the viewport (the parent
    #root container is a column FlexBox model)
  */
  margin-top: auto;

  background: ${constants.COLORS.primary1};
  color: ${constants.COLORS.white};

  @media ${constants.QUERIES.tabletAndUp} {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);

    & div:nth-of-type(2n + 2) {
      display: flex;
      justify-content: center;
    }

    & div:nth-of-type(2n + 3) {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const Copyright = styled.p`
  color: var(--color-gray-800);
`;
