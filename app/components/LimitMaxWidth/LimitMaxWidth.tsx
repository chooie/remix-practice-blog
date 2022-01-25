import React from "react";
// import styled from "styled-components/macro";

import * as constants from "~/constants";

interface Props {
  Element?: React.ElementType;
  children: React.ReactNode;
}
export default function LimitMaxWidth({ Element = "div", children }: Props) {
  return (
    <Element
      style={{
        maxWidth: `${constants.MAX_APP_WIDTH}px`,
        margin: "0 auto",
      }}
    >
      {children}
    </Element>
  );
}
