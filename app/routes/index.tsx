import { Link } from "remix";
import styled from "styled-components";

import LimitMaxWidth from "~/components/LimitMaxWidth";

export default function Index() {
  return (
    <Wrapper>
      <SpacerTwoOutOf3>
        <h1>Incremental IT</h1>
      </SpacerTwoOutOf3>
      <SpacerOneOutOf3 />
    </Wrapper>
  );
}

const Wrapper = styled(LimitMaxWidth)`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const SpacerTwoOutOf3 = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const SpacerOneOutOf3 = styled.div`
  flex: 1;
`;
