import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Players = () => {
  const POSITIONS = ['forwards', 'midfielders', 'defenders', 'goalkeepers'];
  const [players, setPlayers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;

  const getPlayersData = async () => {
    const params = {
      position: currentPosition,
    };
    await axios
      .get(`${baseURL}/players`, {
        params,
      })
      .then((resp) => {
        setPlayers(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleButtonClick = (e) => {
    const { value } = e.target;
    setCurrentPosition(value);
  };

  useEffect(() => {
    getPlayersData();
  }, [currentPosition]);

  return (
    <Background>
      <div>
        {POSITIONS.map((position, i) => {
          return (
            <StyledButton key={i} value={position} onClick={handleButtonClick}>
              {position}
            </StyledButton>
          );
        })}
      </div>
      <ul>
        {players.map((player) => (
          <li key={player.number}>
            {player.name} ({player.number})
          </li>
        ))}
      </ul>
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000419;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const StyledButton = styled.button`
  width: 5rem;
  height: 2rem;
  margin: 0.5rem;
`;

export default Players;
