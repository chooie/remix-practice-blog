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

import LimitMaxWidth from "~/components/LimitMaxWidth";
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
      <main className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document reloadDocument={true} title="Uh-oh!">
      <main className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </main>
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
      </body>
    </html>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled(LimitMaxWidth)`
  flex: 1;

  background-color: var(--color-secondary);
`;
