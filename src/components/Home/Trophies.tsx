import styled, { keyframes } from "styled-components";
import { GoX } from "react-icons/go";
import cityTrophies from "assets/trophies.json";
import PremierLeague from "assets/icons/premierLeague.svg";
import FACup from "assets/icons/faCup.svg";
import CarabaoCup from "assets/icons/leagueCup.svg";
import CommunityShield from "assets/icons/communityShield.svg";
import { useState } from "react";

interface Trophy {
  cupName: string;
  winningCount: number;
  winningSeason: string;
}

const Trophies = () => {
  const trophieDatas: Trophy[] = cityTrophies;
  const [isShowBubble, setIsShowBubble] = useState<boolean[]>([]);

  const getCupIcon = (cupName: string) => {
    if (cupName === "Premier League") return PremierLeague;
    else if (cupName === "FA Cup") return FACup;
    else if (cupName === "Carabao Cup") return CarabaoCup;
    else return CommunityShield;
  };

  const handleMouseEvent = (index: number, type: boolean) => {
    const showBubbleArr = new Array(4).fill(false);
    showBubbleArr[index] = type;
    setIsShowBubble([...showBubbleArr]);
  };

  return (
    <Wrapper>
      <h2 className="title">This is our City</h2>
      <section className="articles">
        {trophieDatas.map((data, index) => (
          <TrophieArticle
            key={index}
            onMouseOver={() => handleMouseEvent(index, true)}
            onMouseOut={() => handleMouseEvent(index, false)}
          >
            <div className="inner">
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
            </div>
            {isShowBubble[index] && (
              <SeasonBubble>{data.winningSeason}</SeasonBubble>
            )}
          </TrophieArticle>
        ))}
      </section>
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
  cursor: default;

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
    transition: 0.3s;
  }

  @media screen and (max-width: 992px) {
    .articles {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 576px) {
    padding: 1rem;
    .title {
      font-size: 1.5rem;
      top: -1rem;
    }
    .articles {
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
  }
`;

const TrophieArticle = styled.article`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  position: relative;

  .inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    transition: 0.3s;
    padding: 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
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
  }
  .cup-winning-name {
    font-weight: 700;
  }

  :hover {
    .inner {
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 992px) {
    .cup-winning-logo {
      width: 30%;
    }
  }
  @media screen and (max-width: 576px) {
    .inner {
      flex-direction: row;
    }
    .cup-winning-logo {
      width: 40%;
    }
    .cup-winning-count {
      font-size: 2rem;
    }
    .cup-winning-desc {
      font-size: 1.1rem;
      text-align: left;
    }
  }
`;

const SlideIn = keyframes`
  from {
    opacity:0;
    bottom: -5rem;
  }
  to {
    opacity: 1;
    bottom: -6rem;
  }
`;

const SeasonBubble = styled.div`
  width: 100%;
  height: 5rem;
  position: absolute;
  left: 0;
  bottom: -6rem;
  border-radius: 0.5rem;
  background-color: #3bd7fe;
  color: #333;
  padding: 0.5rem;
  text-align: center;
  font-weight: 600;
  animation: ${SlideIn} ease-in-out 0.3s;
  z-index: 10;
  transition: 0.3s;
`;

export default Trophies;
