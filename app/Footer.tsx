import styled from "styled-components";

import * as constants from "~/constants";

import LimitMaxWidth from "~/components/LimitMaxWidth";

export default function Footer() {
  return (
    <Wrapper as="footer">
      <InnerWrapper>
        <div>
          <Copyright>
            &copy; Incremental IT LLC 2018-{new Date().getFullYear()}
          </Copyright>
        </div>
        <Spacer />
        <Spacer />
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(LimitMaxWidth)`
  background-color: ${constants.COLORS.primary1};
`;

const InnerWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--standard-side-padding);

  min-height: 50px;

  color: ${constants.COLORS.white};

  @media ${constants.QUERIES.tabletAndUp} {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);

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

const Spacer = styled.div`
  display: none;

  @media ${constants.QUERIES.tabletAndUp} {
    display: unset;
  }
`;

const Copyright = styled.p`
  color: var(--color-gray-800);
`;
