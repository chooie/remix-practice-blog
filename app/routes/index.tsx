import { Link } from "remix";
import styled from "styled-components";

import LimitMaxWidth from "~/components/LimitMaxWidth";

export default function Index() {
  return (
    <Wrapper>
      <SpacerTwoOutOf3>
        <h1>Incremental IT Blog</h1>
        <LinkWrapper>
          <CoolLink to="/posts">
            Check out all the Posts
            <UnderLine />
          </CoolLink>
        </LinkWrapper>
      </SpacerTwoOutOf3>
      <SpacerOneOutOf3 />
    </Wrapper>
  );
}

const Wrapper = styled(LimitMaxWidth)`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const SpacerTwoOutOf3 = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const SpacerOneOutOf3 = styled.div`
  flex: 1;
`;

const LinkWrapper = styled.div`
  --cool-color: linear-gradient(
    to right,
    hsla(290deg 50% 50% / 1),
    hsla(0deg 50% 50% / 1)
  );

  position: relative;
  width: fit-content;

  display: flex;
  flex-direction: column;
`;

const UnderLine = styled.div`
  opacity: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  width: 100%;
  background: var(--cool-color);

  transition: opacity 500ms;
`;

const CoolLink = styled(Link)`
  margin-bottom: 5px;

  /* Fallback: Set a background color. */
  background-color: hsla(290deg 50% 50% / 1);

  /* Create the gradient. */
  background-image: var(--cool-color);

  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;

  &:hover {
    text-decoration: none;
  }

  &:hover ${UnderLine} {
    opacity: 1;
  }
`;
