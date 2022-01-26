import { ActionFunction, redirect } from "remix";
import invariant from "tiny-invariant";

import { userPreferences } from "~/cookies";

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
