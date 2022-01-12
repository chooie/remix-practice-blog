import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styled from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";

export const meta: MetaFunction = () => {
  return { title: "Charlie's remix blog" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {typeof document === "undefined" ? "__STYLES__" : null}
        <Links />
      </head>
      <body>
        <GlobalStyles />
        <Navbar></Navbar>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

const ContentWrapper = styled.div`
  padding: 16px;
`;

function Navbar() {
  return (
    <Wrapper>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;

  background: hsla(100deg 50% 50% / 1);
`;
