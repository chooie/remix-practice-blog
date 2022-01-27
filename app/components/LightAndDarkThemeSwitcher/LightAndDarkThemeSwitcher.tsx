// @ts-ignore
import feather from "feather-icons";
import React from "react";
import { Form, useLoaderData } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

// @ts-ignore
import VisuallyHidden from "~/components/VisuallyHidden";
import * as constants from "~/constants";

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
      <RadioWrapper title="Select light theme">
        <ThemeRadioButton useDarkTheme={!useDarkTheme} value="light" />
        <Visual className="visual light" dangerouslySetInnerHTML={sun()} />
        <VisuallyHidden>
          <label htmlFor="light-theme">Light</label>
        </VisuallyHidden>
      </RadioWrapper>
      <RadioWrapper title="Select dark theme">
        <ThemeRadioButton useDarkTheme={useDarkTheme} value="dark" />
        <Visual className="visual dark" dangerouslySetInnerHTML={moon()} />
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

interface ThemeRadioButtonProps {
  useDarkTheme: boolean;
  value: "light" | "dark";
}
function ThemeRadioButton({ useDarkTheme, value }: ThemeRadioButtonProps) {
  return (
    <RadioButton
      type="radio"
      id="dark-theme"
      name="theme"
      value={value}
      defaultChecked={useDarkTheme}
      onChange={submitForm}
    />
  );
}

function sun() {
  return { __html: feather.icons.sun.toSvg() };
}

function moon() {
  return { __html: feather.icons.moon.toSvg() };
}

function submitForm(event: React.ChangeEvent) {
  const parentForm = event.currentTarget.closest("form");
  invariant(parentForm instanceof HTMLFormElement, "Parent must be a form");
  parentForm.submit();
}

const ThemeForm = styled(Form)`
  padding: 4px;

  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioWrapper = styled.span`
  position: relative;
  display: inline-block;

  width: 40px;
  height: 40px;
`;

const Visual = styled.span`
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
`;

const RadioButton = styled.input`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  opacity: 0;

  &:focus-visible + .visual {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }

  &:checked ~ .visual {
    background-color: ${constants.COLORS.primary2};

    &.light {
      color: hsl(55deg 95% 57%);
    }

    &.dark {
      color: ${constants.COLORS.gray[800]};
    }
  }
`;
