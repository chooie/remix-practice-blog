import React from "react";
import { Form, useLoaderData } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

// @ts-ignore
import VisuallyHidden from "~/components/VisuallyHidden";

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
    <ThemeForm action="theme-switcher" method="post">
      <input type="hidden" name="browserLocation" value={currentUrl} />
      <RadioWrapper>
        <RadioButton
          type="radio"
          id="light-theme"
          name="theme"
          value="light"
          defaultChecked={!useDarkTheme}
          onChange={submitForm}
        />
        <Visual className="visual" />
        <VisuallyHidden>
          <label htmlFor="light-theme">Light</label>
        </VisuallyHidden>
      </RadioWrapper>
      <RadioWrapper>
        <RadioButton
          type="radio"
          id="dark-theme"
          name="theme"
          value="dark"
          defaultChecked={useDarkTheme}
          onChange={submitForm}
        />
        <Visual className="visual" />
        <VisuallyHidden>
          <label htmlFor="dark-theme">Dark</label>
        </VisuallyHidden>
      </RadioWrapper>
      <noscript>
        <button type="submit">Choose</button>
      </noscript>
    </ThemeForm>
  );
}

function submitForm(event: React.ChangeEvent) {
  const parentForm = event.currentTarget.closest("form");
  invariant(parentForm instanceof HTMLFormElement, "Parent must be a form");
  parentForm.submit();
}

const ThemeForm = styled(Form)`
  display: flex;
`;

const RadioWrapper = styled.span`
  position: relative;
  display: inline-block;

  width: 40px;
  height: 40px;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`;

const Visual = styled.span`
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  background: red;
`;

const RadioButton = styled.input`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  opacity: 0;

  &[checked] ~ .visual {
    background: blue;
  }
`;
