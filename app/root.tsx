import React, { useEffect } from "react";
import { Transition } from "@remix-run/react/transition";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from "remix";
import type { MetaFunction } from "remix";
import styled from "styled-components";

import * as constants from "~/constants";
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
  padding: 16px;
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

function Navbar() {
  return (
    <Wrapper>
      <NavLinkWrapper>
        <MyNavLink to="/">Home</MyNavLink>
      </NavLinkWrapper>
      <NavLinkWrapper>
        <MyNavLink to="/posts">Posts</MyNavLink>
      </NavLinkWrapper>
      <NavLinkWrapperEnd>
        <MyNavLink to="/admin">Admin</MyNavLink>
      </NavLinkWrapperEnd>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  min-height: 50px;
  padding-left: 16px;
  padding-right: 16px;
  gap: 16px;

  background: ${constants.COLORS.secondary};
`;

const NavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinkWrapperEnd = styled(NavLinkWrapper)`
  margin-left: auto;
`;

const MyNavLink = styled(NavLink)`
  --thickness: 3px;

  border-top: var(--thickness) solid transparent;
  border-bottom: var(--thickness) solid transparent;

  color: ${constants.COLORS.white};
  font-size: 1.2rem;

  &.active {
    --color: ${constants.COLORS.accent1};

    color: var(--color);
    border-bottom-color: var(--color);
  }

  &:hover {
    text-decoration: none;
  }
`;
