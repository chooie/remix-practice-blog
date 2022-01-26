import {
  ActionFunction,
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useTransition,
} from "remix";
import type { LoaderFunction } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

import { userPreferences } from "~/cookies";
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

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPreferences.parse(cookieHeader)) || {};

  return {
    useDarkTheme: cookie.useDarkTheme,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPreferences.parse(cookieHeader)) || {};
  const bodyParams = await request.formData();

  const chosenTheme = bodyParams.get("theme");
  let browserLocation = bodyParams.get("browserLocation");

  if (!browserLocation) {
    // In the event that JS was disabled and the form browserLocation wasn't
    // set, try and use the Referer header.
    browserLocation = request.headers.get("Referer") || "/";
  }

  invariant(
    typeof browserLocation === "string",
    [
      `Browser location must be a string. Was '${browserLocation}' of `,
      `type ${typeof browserLocation}`,
    ].join("")
  );

  if (chosenTheme === "dark") {
    cookie.useDarkTheme = true;
  } else {
    cookie.useDarkTheme = false;
  }

  return redirect(browserLocation, {
    headers: {
      "Set-Cookie": await userPreferences.serialize(cookie),
    },
  });
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
  const loaderData = useLoaderData();

  const useDarkTheme = loaderData?.useDarkTheme;

  let currentUrl = "";

  if (typeof document !== "undefined") {
    const location = (window?.location).toString();
    invariant(
      typeof location === "string",
      [
        `Location must be a string. Was '${location}' of `,
        `type ${typeof location}`,
      ].join("")
    );
    currentUrl = location;
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
      <body className={useDarkTheme ? "dark-theme" : "light-theme"}>
        <Root id="root">
          <Navbar reloadDocument={reloadDocument}></Navbar>
          <Form method="post">
            <input type="hidden" name="browserLocation" value={currentUrl} />
            <input
              type="radio"
              id="light-theme"
              name="theme"
              value="light"
              defaultChecked={!useDarkTheme}
              onChange={(event) => {
                const parentForm = event.currentTarget.parentElement;
                invariant(
                  parentForm instanceof HTMLFormElement,
                  "Parent must be a form"
                );
                parentForm.submit();
              }}
            />
            <label htmlFor="light-theme">Light</label>
            <input
              type="radio"
              id="dark-theme"
              name="theme"
              value="dark"
              defaultChecked={useDarkTheme}
              onChange={(event) => {
                const parentForm = event.currentTarget.parentElement;
                invariant(
                  parentForm instanceof HTMLFormElement,
                  "Parent must be a form"
                );
                parentForm.submit();
              }}
            />
            <label htmlFor="dark-theme">Dark</label>
            <noscript>
              <button type="submit">Choose</button>
            </noscript>
          </Form>
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
