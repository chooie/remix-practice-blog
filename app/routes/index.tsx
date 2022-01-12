import { Link } from "remix";
import styled from "styled-components";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Charlie's Blog</h1>

      <Wrapper>
        <CoolLink to="/posts">Check out all the Posts</CoolLink>
        <UnderLine />
      </Wrapper>
    </div>
  );
}

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

const Wrapper = styled.div`
  --cool-color: linear-gradient(
    to right,
    hsla(290deg 50% 50% / 1),
    hsla(0deg 50% 50% / 1)
  );

  position: relative;
  width: fit-content;

  display: flex;
  flex-direction: column;

  &:hover ${UnderLine} {
    opacity: 1;
  }
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
`;
