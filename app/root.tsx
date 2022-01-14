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
import GlobalLoadingSpinner from "~/GlobalLoadingSpinner";
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
  const transition = useTransition();

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
        <GlobalLoadingSpinner appLoadingState={transition.state} />
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
