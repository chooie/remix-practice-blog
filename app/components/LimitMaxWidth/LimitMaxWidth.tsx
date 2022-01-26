import styled from "styled-components";

import * as constants from "~/constants";

interface LimitMaxWidthProps {
  maxWidth?: string;
}
const LimitMaxWidth = styled.div`
  --breathing-room: var(--standard-side-padding);
  display: grid;
  grid-template-columns:
    1fr
    min(
      ${(p: LimitMaxWidthProps) =>
        p.maxWidth ? p.maxWidth : `${constants.MAX_APP_WIDTH}px`},
      100%
    )
    1fr;
  padding-left: var(--breathing-room);
  padding-right: var(--breathing-room);

  & > * {
    grid-column: 2;
  }
`;

/**
 * Escape hatch for this layout mode
 */
export const FullBleed = styled.div`
  grid-column: 1 / -1;
  margin-left: calc(var(--breathing-room) * -1);
  margin-right: calc(var(--breathing-room) * -1);
`;

export default LimitMaxWidth;
