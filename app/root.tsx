import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useTransition,
} from "remix";
import type { LoaderFunction } from "remix";
import styled from "styled-components";

import { userPreferences } from "~/cookies";
import * as constants from "~/constants";
import Footer from "~/Footer";
import GlobalLoadingSpinner from "~/GlobalLoadingSpinner";
import Navbar from "~/Navbar";
import colorStyles from "~/styles/colors.css";
import fontStyles from "~/styles/fonts.css";
import GlobalStyles from "~/styles/GlobalStyles";
import LimitMaxWidth from "./components/LimitMaxWidth";

export function meta() {
  return { title: "Charlie's remix blog" };
}

export function links() {
  return [
    { rel: "stylesheet", href: fontStyles },
    { rel: "stylesheet", href: colorStyles },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPreferences.parse(cookieHeader)) || {};

  return {
    useDarkTheme: cookie.useDarkTheme,
  };
};

export default function App() {
  return (
    <Document reloadDocument={false}>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document
      reloadDocument={true}
      title={`${caught.status} ${caught.statusText}`}
    >
      <ErrorWrapper as="main" maxWidth="80ch">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <a href="/">Go home</a>
      </ErrorWrapper>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document reloadDocument={true} title="Uh-oh!">
      <ErrorWrapper as="main" maxWidth="80ch">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </ErrorWrapper>
    </Document>
  );
}

interface Document {
  children: React.ReactElement;
  reloadDocument: boolean;
  title?: string;
}
function Document({
  children,
  reloadDocument,
  title = "Charlie's blog",
}: Document) {
  const transition = useTransition();
  const loaderData = useLoaderData();

  const useDarkTheme = loaderData?.useDarkTheme;

  let themeClass;

  if (useDarkTheme === undefined) {
    themeClass = "";
  } else if (useDarkTheme === false) {
    themeClass = "light-theme";
  } else {
    themeClass = "dark-theme";
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
        <GlobalStyles />
      </head>
      <Body className={themeClass}>
        <Root id="root">
          <Navbar reloadDocument={reloadDocument}></Navbar>
          <ContentWrapper>{children}</ContentWrapper>
          <Footer />
        </Root>
        <GlobalLoadingSpinner appLoadingState={transition.state} />
        {/* ScrollRestoration MUST be the last element before Scripts */}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </Body>
    </html>
  );
}

const ErrorWrapper = styled(LimitMaxWidth)`
  text-align: center;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  background-color: ${constants.COLORS.secondary};
`;

const Body = styled.body`
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;
