import React from "react";
import styled from "styled-components";

import * as constants from "~/constants";

interface Props {
  children: React.ReactNode;
  wrapperBackgroundColor?: string;
  WrapperElement?: React.ElementType;
}
export default function LimitMaxWidth({
  children,
  wrapperBackgroundColor = "inherit",
  WrapperElement = "div",
}: Props) {
  return (
    <WrapperElement style={{ backgroundColor: wrapperBackgroundColor }}>
      <Limit>{children}</Limit>
    </WrapperElement>
  );
}

const Limit = styled.div`
  max-width: ${constants.MAX_APP_WIDTH}px;
  margin: 0 auto;
`;
