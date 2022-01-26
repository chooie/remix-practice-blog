import React from "react";
import styled from "styled-components";

import * as constants from "~/constants";

interface Props {
  children: React.ReactNode;
  maxWidth?: string;
  WrapperElement?: keyof JSX.IntrinsicElements;
}
export default function LimitMaxWidth({
  children,
  maxWidth = `${constants.MAX_APP_WIDTH}px`,
  WrapperElement = "div",
  ...delegated
}: Props) {
  return (
    <WrapperElement {...delegated}>
      <Limit maxWidth={maxWidth}>{children}</Limit>
    </WrapperElement>
  );
}

interface LimitProps {
  maxWidth: string;
}
const Limit = styled.div`
  max-width: ${(p: LimitProps) => p.maxWidth};
  margin: 0 auto;

  // Fill the available vertical space in case the wrapper element is styled
  // with display: flex
  flex: 1;

  display: flex;
  flex-direction: column;
`;
