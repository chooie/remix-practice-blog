import styled from "styled-components";

import * as constants from "~/constants";

import GoBackToTopLink from "~/components/GoBackToTopLink";

export default function Footer() {
  return (
    <Wrapper>
      <div>
        <Copyright>
          &copy; Incremental IT 2018-{new Date().getFullYear()}
        </Copyright>
      </div>
      <div>{/* <GoBackToTopLink /> */}</div>
      {/* Need the last div for 3 column layout */}
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
