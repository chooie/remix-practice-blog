import { Transition } from "@remix-run/react/transition";

import React, { useEffect } from "react";
import styled from "styled-components";

interface Props {
  appLoadingState: Transition["state"];
}

const DELAY_BEFORE_TIMER_SHOWS_MS = 500;
const MINIMUM_LOADING_INDICATOR_TIME_MS = 300;

type Timer = "notWaiting" | ReturnType<typeof setTimeout>;

export default function GlobalLoadingSpinner({ appLoadingState }: Props) {
  const [timer, setTimer] = React.useState<Timer>("notWaiting");
  const [shouldShow, setShouldShow] = React.useState(false);

  useEffect(() => {
    if (appLoadingState === "loading" && timer === "notWaiting") {
      setTimer(
        setTimeout(() => {
          setShouldShow(true);
        }, DELAY_BEFORE_TIMER_SHOWS_MS)
      );
    }

    if (appLoadingState === "idle") {
      if (timer !== "notWaiting") {
        clearTimeout(timer);
      }
      setTimer("notWaiting");
      setTimeout(() => {
        setShouldShow(false);
      }, MINIMUM_LOADING_INDICATOR_TIME_MS);
    }
  });

  return (
    <LoadingSpinnerWrapper
      style={{
        display: shouldShow ? "block" : "none",
      }}
    >
      ⌛ Loading...
    </LoadingSpinnerWrapper>
  );
}

const LoadingSpinnerWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  width: fit-content;
  height: fit-content;
`;
