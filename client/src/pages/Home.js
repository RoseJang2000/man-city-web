import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    navigate(`/${item}`);
  };
  return (
    <Background>
      <div>CITY TILL I DIE</div>
      <Menu>
        <li
          onClick={() => {
            handleMenuClick('players');
          }}
        >
          PLAYERS &gt;
        </li>
      </Menu>
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000419;
  overflow: hidden;
  display: flex;
  > div {
    width: 100%;
    color: #fff;
    font-size: 10rem;
    opacity: 0.1;
    position: absolute;
    top: 60%;
    padding-left: 5%;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const Menu = styled.ul`
  margin: 3rem 3rem 0 auto;
  list-style: none;
  color: #fff;
  font-size: 2.5rem;
  opacity: 0.5;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

export default Home;
