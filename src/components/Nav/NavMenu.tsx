import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "hooks/useWindowWidth";

const NavMenu = ({ aniMode }: { aniMode: boolean }) => {
  const windowWidth = useWindowWidth();
  const [menuRender, setMenuRender] = useState<boolean>(aniMode);
  const [isShowPlayerMenu, setIsShowPlayerMenu] = useState<boolean>(false);
  const [playerMenuAniMode, setPlayerMenuAniMode] = useState<boolean>(false);

  const handleToggleInnerMenu = () => {
    if (isShowPlayerMenu) {
      setPlayerMenuAniMode(false);
      setTimeout(() => setIsShowPlayerMenu(false), 200);
    } else {
      setIsShowPlayerMenu(true);
      setPlayerMenuAniMode(true);
    }
  };

  useEffect(() => {
    if (aniMode) setMenuRender(true);
  }, [aniMode]);

  return (
    <>
      <NavBg></NavBg>
      {menuRender && (
        <NavContainer aniMode={aniMode} width={windowWidth}>
          <div className="nav-list-wrapper">
            <StyledLink to="/">home</StyledLink>
            <PlayersMenu onClick={handleToggleInnerMenu}>
              <span
                className={
                  isShowPlayerMenu ? "players-text open" : "players-text"
                }
              >
                players
              </span>
              {isShowPlayerMenu && (
                <InnerMenu aniMode={playerMenuAniMode}>
                  <NavLink to={"players/forwards"}>Forwards</NavLink>
                  <NavLink to={"players/midfielders"}>Midfielders</NavLink>
                  <NavLink to={"players/defenders"}>Defenders</NavLink>
                  <NavLink to={"players/goalkeepers"}>Goalkeepers</NavLink>
                </InnerMenu>
              )}
            </PlayersMenu>
            <StyledLink to="news">news</StyledLink>
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

const slideIn = (width: number) => keyframes`
  from {
    left: ${width >= 992 ? "-30%" : width >= 576 ? "-40%" : "-65%"};
  }
  to {
    left: 0;
  }
`;

const slideOut = (width: number) => keyframes`
  from {
    left: 0;
  }
  to {
    left: ${width >= 992 ? "-30%" : width >= 576 ? "-40%" : "-65%"};
  }
`;

const NavContainer = styled.nav<{ aniMode: boolean; width: number }>`
  width: ${(props) =>
    props.width >= 992 ? "30%" : props.width >= 576 ? "40%" : "65%"};
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
          ${slideIn(props.width)} ease-in-out 0.3s
        `
      : css`
          ${slideOut(props.width)} ease-in-out 0.3s
        `};

  .nav-list-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2rem;
    transition: 0.3s;
  }
`;

const StyledLink = styled(NavLink)`
  font-size: 2rem;
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  opacity: 0.7;
  transition: 0.3s;

  :hover {
    opacity: 1;
  }
`;

const PlayersMenu = styled.div`
  color: #fff;
  font-size: 2rem;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  .players-text {
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s;
    :hover,
    &.open {
      opacity: 1;
    }
  }
  a {
    text-decoration: none;
    color: #fff;
    font-size: 1.1rem;
    transition: all 0.3s;
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }
`;

const accordionOpen = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  50% {
    opacity: 0.5;
    height: 4.5rem;
  }
  100% {
    height: 9rem;
    opacity: 1;
  }
`;
const accordionClose = keyframes`
  0% {
    height: 9rem;
    opacity: 1;
  }
  50% {
    opacity: 0.5;
    height: 4.5rem;
  }
  100% {
    height: 0;
    opacity: 0;
  }
`;

const InnerMenu = styled.div<{ aniMode: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 9rem;
  overflow: hidden;
  padding: 0.8rem 0 0 0.5rem;
  gap: 0.8rem;
  transition: 0.3s;
  animation: ${(props) =>
    props.aniMode
      ? css`
          ${accordionOpen} linear 0.2s
        `
      : css`
          ${accordionClose} linear 0.2s
        `};
`;

export default NavMenu;
