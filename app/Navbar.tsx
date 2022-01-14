import styled from "styled-components";
import { NavLink } from "remix";
import * as constants from "~/constants";

export default function Navbar() {
  return (
    <Wrapper>
      <NavLinkWrapper>
        <MyNavLink to="/">Home</MyNavLink>
        <ActiveMarker className="chooie-marker" />
      </NavLinkWrapper>
      <NavLinkWrapper>
        <MyNavLink to="/posts">Posts</MyNavLink>
        <ActiveMarker className="chooie-marker" />
      </NavLinkWrapper>
      <NavLinkWrapperEnd>
        <MyNavLink to="/admin">Admin</MyNavLink>
        <ActiveMarker className="chooie-marker" />
      </NavLinkWrapperEnd>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--standard-side-padding);

  min-height: 50px;
  padding-left: var(--standard-side-padding);
  padding-right: var(--standard-side-padding);

  background: ${constants.COLORS.primary1};
`;

const NavLinkWrapper = styled.div`
  --activeColor: ${constants.COLORS.accent1};

  position: relative;
  display: flex;
  align-items: center;
`;

const NavLinkWrapperEnd = styled(NavLinkWrapper)`
  margin-left: auto;
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
  color: ${constants.COLORS.white};
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
