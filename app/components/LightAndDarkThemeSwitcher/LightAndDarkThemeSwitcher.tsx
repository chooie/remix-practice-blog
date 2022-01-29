// @ts-ignore
import React from "react";
import { Moon, Sun } from "react-feather";
import { Form, useTransition, useLoaderData } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

// @ts-ignore
import VisuallyHidden from "~/components/VisuallyHidden";
import * as constants from "~/constants";

function useShouldUseDarkTheme() {
  const loaderData = useLoaderData();

  const [shouldUseDarkTheme, setUseDarkTheme] = React.useState<
    boolean | undefined
  >(loaderData.useDarkTheme);

  React.useEffect(() => {
    if (shouldUseDarkTheme === undefined) {
      const userHasDarkModePreference = window.matchMedia(
        constants.QUERIES.prefersDarkMode
      ).matches;

      if (userHasDarkModePreference) {
        setUseDarkTheme(true);
      }
    } else {
      setUseDarkTheme(loaderData.useDarkTheme);
    }
  }, [loaderData.useDarkTheme]);

  return [shouldUseDarkTheme, setUseDarkTheme];
}

export default function LightAndDarkThemeSwitcher() {
  const transition = useTransition();

  const isNotBusy = transition.state === "idle";

  const [shouldUseDarkTheme] = useShouldUseDarkTheme();

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

  let button = (
    <ButtonWrapper title="Select dark theme">
      <input id="dark-theme" type="hidden" name="theme" value="dark" />
      <VisuallyHidden>
        <label htmlFor="dark-theme">Current theme: Dark</label>
      </VisuallyHidden>
      <ThemeButton isNotBusy={isNotBusy} />
      <Visual className="visual light">
        <Sun />
      </Visual>
    </ButtonWrapper>
  );

  if (shouldUseDarkTheme) {
    button = (
      <ButtonWrapper title="Select light theme">
        <input id="light-theme" type="hidden" name="theme" value="light" />
        <VisuallyHidden>
          <label htmlFor="light-theme">Current theme: Light</label>
        </VisuallyHidden>
        <ThemeButton isNotBusy={isNotBusy} />
        <Visual className="visual dark">
          <Moon />
        </Visual>
      </ButtonWrapper>
    );
  }

  return (
    <ThemeForm action="/theme-switcher" method="post">
      <input type="hidden" name="browserLocation" value={currentUrl} />
      {button}
    </ThemeForm>
  );
}

interface ThemeButtonProps {
  isNotBusy: boolean;
}
function ThemeButton({ isNotBusy }: ThemeButtonProps) {
  return <SubmitButton type="submit" disabled={!isNotBusy}></SubmitButton>;
}

const ThemeForm = styled(Form)`
  padding: 4px;

  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonWrapper = styled.span`
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
  background-color: ${constants.COLORS.primary2};

  &.light {
    color: hsl(55deg 95% 57%);
  }

  &.dark {
    color: ${constants.COLORS.gray[800]};
  }
`;

const SubmitButton = styled.input`
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
`;
