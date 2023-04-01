import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Players } from "pages";
import GlobalStyle from "styles/GlobalStyle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import NavMenu from "components/Nav/NavMenu";

const App = () => {
  const path = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [aniMode, setAniMode] = useState<boolean>(false);

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
  }, [path]);

  return (
    <>
      <GlobalStyle />
      {isMenuOpen && <NavMenu aniMode={aniMode} />}
      <MenuButton onClick={handleToggleMenu}>
        <div className={`menu-trigger ${isMenuOpen ? "active" : null}`}>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </div>
      </MenuButton>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players/:type" element={<Players />} />
      </Routes>
    </>
  );
};

const MenuButton = styled.div`
  position: fixed;
  width: 2.3rem;
  height: 2rem;
  top: 2rem;
  left: 2rem;
  cursor: pointer;
  z-index: 20;

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

export default App;
