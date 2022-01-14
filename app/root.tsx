import React, { useEffect } from "react";
import { Transition } from "@remix-run/react/transition";
import {
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

import Footer from "~/Footer";
import Navbar from "~/Navbar";
import colorStyles from "~/styles/colors.css";
import fontStyles from "~/styles/fonts.css";
import GlobalStyles from "~/styles/GlobalStyles";

export const meta: MetaFunction = () => {
  return { title: "Charlie's remix blog" };
};

export function links() {
  return [
    { rel: "stylesheet", href: fontStyles },
    { rel: "stylesheet", href: colorStyles },
  ];
}

export default function App() {
  const transition: Transition = useTransition();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
        <GlobalStyles />
      </head>
      <body>
        <div id="root">
          <Navbar></Navbar>
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
          <Footer />
        </div>
        <LoadingSpinner appLoadingState={transition.state} />
        {/* ScrollRestoration MUST be the last element before Scripts */}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

const ContentWrapper = styled.div`
  flex: 1;
  padding: 16px;
  background-color: var(--color-light-blue);
`;

interface Props {
  appLoadingState: Transition["state"];
}

const DELAY_BEFORE_TIMER_SHOWS_MS = 500;
const MINIMUM_LOADING_INDICATOR_TIME_MS = 300;

type Timer = "notWaiting" | ReturnType<typeof setTimeout>;

function LoadingSpinner({ appLoadingState }: Props) {
  const [timer, setTimer] = React.useState<Timer>("notWaiting");
  const [shouldShow, setShouldShow] = React.useState(false);

  useEffect(() => {
    if (appLoadingState === "loading" && timer === "notWaiting") {
      setTimer(
        setTimeout(() => {
          setShouldShow(true);
        }, DELAY_BEFORE_TIMER_SHOWS_MS)
      );
    }

    if (appLoadingState === "idle") {
      if (timer !== "notWaiting") {
        clearTimeout(timer);
      }
      setTimer("notWaiting");
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
