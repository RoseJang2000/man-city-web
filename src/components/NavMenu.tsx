import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const NavMenu = ({ aniMode }: { aniMode: boolean }) => {
  const [menuRender, setMenuRender] = useState<boolean>(aniMode);

  useEffect(() => {
    if (aniMode) setMenuRender(true);
  }, [aniMode]);

  return (
    <>
      <NavBg></NavBg>
      {menuRender && <NavContainer aniMode={aniMode}></NavContainer>}
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

const SlideIn = keyframes`
  from {
    left: -40vw;
  }
  to {
    left: 0;
  }
`;

const SlideOut = keyframes`
  from {
    left: 0;
  }
  to {
    left: -40vw;
  }
`;

const NavContainer = styled.nav<{ aniMode: boolean }>`
  width: 40%;
  height: 100%;
  background-color: #000f23;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  animation: ${(props) =>
    props.aniMode
      ? css`
          ${SlideIn} ease-in-out 0.3s
        `
      : css`
          ${SlideOut} ease-in-out 0.3s
        `};
`;

export default NavMenu;
