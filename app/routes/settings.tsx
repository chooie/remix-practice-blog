import styled from "styled-components";
import type { LoaderFunction } from "remix";

import LightAndDarkThemeSwitcher from "~/components/LightAndDarkThemeSwitcher";
import LimitMaxWidth from "~/components/LimitMaxWidth";
import { userPreferences } from "~/cookies";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPreferences.parse(cookieHeader)) || {};

  return {
    useDarkTheme: cookie.useDarkTheme,
  };
};

export default function Settings() {
  return (
    <LimitMaxWidth maxWidth="80ch">
      <Item>
        <span>Current theme:</span>
        <LightAndDarkThemeSwitcher />
      </Item>
    </LimitMaxWidth>
  );
}

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
