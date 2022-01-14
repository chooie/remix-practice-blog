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
import invariant from "tiny-invariant";

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
          <Footer>
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
          </Footer>
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

function Navbar() {
  return (
    <Wrapper>
      <NavLinkWrapper>
        <MyNavLink to="/">Home</MyNavLink>
        <ActiveMarker className="chooie-marker" />
      </NavLinkWrapper>
      <NavLinkWrapper>
        <MyNavLink to="/posts">Posts</MyNavLink>
        <ActiveMarker className="chooie-marker" />
      </NavLinkWrapper>
      <NavLinkWrapperEnd>
        <MyNavLink to="/admin">Admin</MyNavLink>
        <ActiveMarker className="chooie-marker" />
      </NavLinkWrapperEnd>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--standard-side-padding);

  min-height: 50px;
  padding-left: var(--standard-side-padding);
  padding-right: var(--standard-side-padding);

  background: ${constants.COLORS.primary1};
`;

const NavLinkWrapper = styled.div`
  --activeColor: ${constants.COLORS.accent1};

  position: relative;
  display: flex;
  align-items: center;
`;

const NavLinkWrapperEnd = styled(NavLinkWrapper)`
  margin-left: auto;
`;

const ActiveMarker = styled.div`
  opacity: 0;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 3px;

  background-color: var(--activeColor);
`;

const MyNavLink = styled(NavLink)`
  color: ${constants.COLORS.white};
  font-size: 1.2rem;
  line-height: 1;

  &.active {
    color: var(--activeColor);
  }

  /**
    (TODO: chooie) This is temporary until Remix works with styled-components
    properly.

    It should be:

    &.active + ${ActiveMarker}
  */
  &.active + .chooie-marker {
    opacity: 1;
  }

  &:hover {
    text-decoration: none;
  }
`;

const Footer = styled.footer`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
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

  & div:nth-of-type(2n + 2) {
    display: flex;
    justify-content: center;
  }

  & div:nth-of-type(2n + 3) {
    display: flex;
    justify-content: flex-end;
  }
`;

const Copyright = styled.p`
  color: var(--color-gray-800);
`;
