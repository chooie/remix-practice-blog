import React from "react";
import styled from "styled-components";

import * as constants from "~/constants";

interface Props {
  children: React.ReactNode;
  WrapperElement?: keyof JSX.IntrinsicElements;
}
export default function LimitMaxWidth({
  children,
  WrapperElement = "div",
  ...delegated
}: Props) {
  return (
    <WrapperElement {...delegated}>
      <Limit>{children}</Limit>
    </WrapperElement>
  );
}

const Limit = styled.div`
  max-width: ${constants.MAX_APP_WIDTH}px;
  margin: 0 auto;
`;
