import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavMenu from "containers/NavMenu";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [aniMode, setAniMode] = useState<boolean>(false);
  const [titleText, setTitleText] = useState<string>("");

  const handleToggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setAniMode(true);
    } else {
      handleCloseMenu();
    }
  };

  const handleCloseMenu = () => {
    setAniMode(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  useEffect(() => {
    handleCloseMenu();
    setTitleText(location.pathname.split("/").slice(-1)[0]);
  }, [location]);

  return (
    <HeaderContainer>
      {isMenuOpen && <NavMenu aniMode={aniMode} />}
      <MenuButton onClick={handleToggleMenu}>
        <div className={`menu-trigger ${isMenuOpen ? "active" : null}`}>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </div>
      </MenuButton>
      <h1>{titleText[0].toLocaleUpperCase() + titleText.slice(1)}</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 5rem;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: #001838;
  display: flex;
  align-items: center;
  padding-left: 6rem;
`;

const MenuButton = styled.div`
  position: absolute;
  width: 2.3rem;
  height: 2rem;
  top: 50%;
  left: 1.5rem;
  cursor: pointer;
  z-index: 999;
  transform: translateY(-50%);

  .menu-trigger {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .line {
    transition: all 0.4s;
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
  }
  .line-1 {
    top: 0;
  }
  .line-2 {
    top: 0.9rem;
  }
  .line-3 {
    bottom: 0;
  }

  .menu-trigger.active .line-1 {
    -webkit-transform: translateY(0.9rem) rotate (-45deg);
    transform: translateY(0.9rem) rotate(-45deg);
  }
  .menu-trigger.active .line-2 {
    opacity: 0;
  }
  .menu-trigger.active .line-3 {
    -webkit-transform: translateY(-0.9rem) rotate(45deg);
    transform: translateY(-0.9rem) rotate(45deg);
  }
`;

export default Header;
