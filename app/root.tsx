import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useTransition,
} from "remix";
import styled from "styled-components";

import Footer from "~/Footer";
import GlobalLoadingSpinner from "~/GlobalLoadingSpinner";
import Navbar from "~/Navbar";
import colorStyles from "~/styles/colors.css";
import fontStyles from "~/styles/fonts.css";
import GlobalStyles from "~/styles/GlobalStyles";

export function meta() {
  return { title: "Charlie's remix blog" };
}

export function links() {
  return [
    { rel: "stylesheet", href: fontStyles },
    { rel: "stylesheet", href: colorStyles },
  ];
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}

interface Document {
  children: React.ReactElement;
  title?: string;
}
function Document({ children, title = "Charlie's blog" }: Document) {
  const transition = useTransition();

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
      <body>
        <div id="root">
          <Navbar></Navbar>
          <ContentWrapper>{children}</ContentWrapper>
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

  display: flex;
  flex-direction: column;
`;
