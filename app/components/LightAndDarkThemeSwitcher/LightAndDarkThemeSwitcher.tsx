import { Form, useLoaderData } from "remix";
// import styled from "styled-components/macro";
import invariant from "tiny-invariant";

export default function LightAndDarkThemeSwitcher() {
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
    <Form action="theme-switcher" method="post">
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
  );
}
