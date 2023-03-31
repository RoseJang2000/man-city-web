import styled from 'styled-components';
import { GoX } from 'react-icons/go';
import cityTrophies from 'assets/trophies.json';
import PremierLeague from 'assets/icons/premierLeague.svg';
import FACup from 'assets/icons/faCup.svg';
import CarabaoCup from 'assets/icons/leagueCup.svg';
import CommunityShield from 'assets/icons/communityShield.svg';

interface Trophy {
  cupName: string;
  winningCount: number;
  winningSeason: string;
}

const Trophies = () => {
  const trophieDatas: Trophy[] = cityTrophies;

  const getCupIcon = (cupName: string) => {
    if (cupName === 'Premier League') return PremierLeague;
    else if (cupName === 'FA Cup') return FACup;
    else if (cupName === 'Carabao Cup') return CarabaoCup;
    else return CommunityShield;
  };

  return (
    <Wrapper>
      <h2 className="title">This is our City</h2>
      <div className="articles">
        {trophieDatas.map((data, index) => (
          <TrophieArticle key={index}>
            <div className="cup-winning">
              <img
                src={getCupIcon(data.cupName)}
                alt={data.cupName}
                className="cup-winning-logo"
              />
              <GoX size={23} />
              <span className="cup-winning-count">{data.winningCount}</span>
            </div>
            <p className="cup-winning-desc">
              <span className="cup-winning-name">{data.cupName}</span>
              <br />
              Champions
            </p>
          </TrophieArticle>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: #fff;
  width: 75%;
  border: 1px solid #fff;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  transition: 0.3s;

  .title {
    position: absolute;
    top: -1.5rem;
    background-color: #001838;
    padding: 0 1rem;
    font-size: 2rem;
  }
  .articles {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

const TrophieArticle = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: 0.3s;

  .cup-winning {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 0.5rem;
  }
  .cup-winning-logo {
    width: 50%;
    filter: invert(1);
  }
  .cup-winning-count {
    font-size: 2.7rem;
  }
  .cup-winning-desc {
    font-size: 1.3rem;
    text-align: center;
    font-family: 'orbitron';
  }
  .cup-winning-name {
    font-weight: 700;
  }
`;

export default Trophies;
