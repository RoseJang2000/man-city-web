import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "hooks/useWindowWidth";

const NavMenu = ({ aniMode }: { aniMode: boolean }) => {
  const windowWidth = useWindowWidth();
  const [menuRender, setMenuRender] = useState<boolean>(aniMode);
  const [isShowPlayerMenu, setIsShowPlayerMenu] = useState<boolean>(false);

  useEffect(() => {
    if (aniMode) setMenuRender(true);
  }, [aniMode]);

  return (
    <>
      <NavBg></NavBg>
      {menuRender && (
        <NavContainer aniMode={aniMode} width={windowWidth}>
          <div className="nav-list-wrapper">
            <NavList>
              <NavLink to="/">home</NavLink>
            </NavList>
            <NavList>players</NavList>
            <NavList>
              <NavLink to="news">news</NavLink>
            </NavList>
          </div>
        </NavContainer>
      )}
    </>
  );
};

const NavBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const SlideIn = (width: number) => keyframes`
  from {
    left: ${width >= 992 ? "-30%" : width >= 576 ? "-40%" : "-45%"};
  }
  to {
    left: 0;
  }
`;

const SlideOut = (width: number) => keyframes`
  from {
    left: 0;
  }
  to {
    left: ${width >= 992 ? "-30%" : width >= 576 ? "-40%" : "-45%"};
  }
`;

const NavContainer = styled.nav<{ aniMode: boolean; width: number }>`
  width: ${(props) =>
    props.width >= 992 ? "30%" : props.width >= 576 ? "40%" : "45%"};
  height: 100%;
  background-color: #000f23;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  animation: ${(props) =>
    props.aniMode
      ? css`
          ${SlideIn(props.width)} ease-in-out 0.3s
        `
      : css`
          ${SlideOut(props.width)} ease-in-out 0.3s
        `};

  .nav-list-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2rem;
  }
`;

const NavList = styled.div`
  a {
    text-decoration: none;
    color: #fff;
  }
  color: #fff;
  font-size: 2rem;
  text-transform: uppercase;
  cursor: pointer;
`;

export default NavMenu;
