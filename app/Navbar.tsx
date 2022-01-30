import { NavLink } from "remix";
import styled from "styled-components";

import LightAndDarkThemeSwitcher from "~/components/LightAndDarkThemeSwitcher";
import LimitMaxWidth from "~/components/LimitMaxWidth";
import * as constants from "~/constants";

interface Props {
  reloadDocument: boolean;
}
export default function Navbar({ reloadDocument }: Props) {
  return (
    <Wrapper as="nav">
      <InnerWrapper>
        <NavLinkWrapper>
          <MyNavLink reloadDocument={reloadDocument} to="/">
            Home
          </MyNavLink>
          <ActiveMarker className="chooie-marker" />
        </NavLinkWrapper>
        <NavLinkWrapper>
          <MyNavLink reloadDocument={reloadDocument} to="/posts">
            Posts
          </MyNavLink>
          <ActiveMarker className="chooie-marker" />
        </NavLinkWrapper>
        <MiddleDivider />
        <NavLinkWrapper>
          <LightAndDarkThemeSwitcher />
        </NavLinkWrapper>
        <NavLinkWrapper>
          <MyNavLink reloadDocument={reloadDocument} to="/admin">
            Admin
          </MyNavLink>
          <ActiveMarker className="chooie-marker" />
        </NavLinkWrapper>
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(LimitMaxWidth)`
  background-color: ${constants.COLORS.primary1};
  color: ${constants.COLORS.white};
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--standard-side-padding);

  min-height: 50px;
`;

const NavLinkWrapper = styled.div`
  --activeColor: ${constants.COLORS.accent1};

  max-width: 100%;

  position: relative;
  display: flex;
  align-items: center;
`;

const MiddleDivider = styled.div`
  flex: 1;
`;

const ActiveMarker = styled.div`
  opacity: 0;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 3px;

  background-color: var(--activeColor);
`;

const MyNavLink = styled(NavLink)`
  margin: 8px 0;

  font-size: 1.2rem;
  line-height: 1;

  &.active {
    color: var(--activeColor);
  }

  /**
    (TODO: chooie) This is temporary until Remix works with styled-components
    properly.

    It should be:

    &.active + ${ActiveMarker}
  */
  &.active + .chooie-marker {
    opacity: 1;
  }

  &:hover {
    text-decoration: none;
  }
`;
