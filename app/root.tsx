import React, { useEffect } from "react";
import { Transition } from "@remix-run/react/transition";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from "remix";
import type { MetaFunction } from "remix";
import styled from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";

export const meta: MetaFunction = () => {
  return { title: "Charlie's remix blog" };
};

export default function App() {
  const transition: Transition = useTransition();

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
        <LoadingSpinner appLoadingState={transition.state} />
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

interface Props {
  appLoadingState: Transition["state"];
}

const MINIMUM_LOADING_INDICATOR_TIME_MS = 300;

function LoadingSpinner({ appLoadingState }: Props) {
  const [shouldShow, setShouldShow] = React.useState(false);

  useEffect(() => {
    if (appLoadingState === "loading") {
      setShouldShow(true);

      setTimeout(() => {
        setShouldShow(false);
      }, MINIMUM_LOADING_INDICATOR_TIME_MS);
    }
  });

  return (
    <LoadingSpinnerWrapper
      style={{
        display: shouldShow ? "block" : "none",
      }}
    >
      ⌛ Loading...
    </LoadingSpinnerWrapper>
  );
}

const LoadingSpinnerWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  width: fit-content;
  height: fit-content;
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
  flex-wrap: wrap;
  gap: 8px;

  background: hsla(100deg 50% 50% / 1);
`;
