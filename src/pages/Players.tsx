import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Main } from "styles/Main";
import playerList from "assets/playerList.json";
import { useEffect, useRef, useState } from "react";

interface Player {
  name: string;
  number: number;
  profileImg: string;
  country: {
    name: string;
    flag: string;
  };
  onLoan: boolean;
}

const Players = () => {
  const { position } = useParams();
  const playersData: Player[] = playerList[position as keyof object];
  const playersCount: number = playersData.length;
  const transitionTime: number = 300;
  const playersDataForSlide = [
    ...playersData.slice(-2),
    ...playersData,
    ...playersData.slice(0, 2),
  ];
  const dataCount: number = playersDataForSlide.length;
  const [isCardFlip, setIsCardFlip] = useState<boolean>(false);
  const [activeIdx, setActiveIdx] = useState<number>(2);
  const [showIdx, setShowIdx] = useState<number>(1);
  const [slideTransition, setSlidetransition] = useState<string>("");

  const handleToggleFlip = () => {
    console.log(!isCardFlip, activeIdx);
    setIsCardFlip(!isCardFlip);
  };

  const replaceSlide = (index: number) => {
    setTimeout(() => {
      setSlidetransition("");
      setActiveIdx(index);
    }, transitionTime);
  };

  const handlePrevClick = () => {
    setIsCardFlip(false);
    setSlidetransition(`${transitionTime}ms`);
    if (activeIdx === 2) {
      setActiveIdx(1);
      setShowIdx(playersCount);
      replaceSlide(dataCount - 3);
    } else {
      setActiveIdx((current) => current - 1);
      setShowIdx((current) => current - 1);
    }
  };

  const handleNextClick = () => {
    setIsCardFlip(false);
    setSlidetransition(`${transitionTime}ms`);
    if (activeIdx === dataCount - 3) {
      setActiveIdx(dataCount - 2);
      setShowIdx(1);
      replaceSlide(2);
    } else {
      setActiveIdx((current) => current + 1);
      setShowIdx((current) => current + 1);
    }
  };

  useEffect(() => {
    setSlidetransition("");
    setIsCardFlip(false);
    setShowIdx(1);
    setActiveIdx(2);
  }, [position]);

  return (
    <PlayersContainer>
      <div className="title">
        <h1 className="title-position">{position}</h1>
        <h2 className="title-count">{`${showIdx} / ${playersCount}`}</h2>
      </div>
      <CardWrapper>
        <div
          className="flex-box"
          style={{
            transform: `translateX(-${18 * activeIdx + 14 * activeIdx}rem)`,
            transition: slideTransition,
          }}
        >
          {playersDataForSlide.map((player, index) => (
            <PlayerCard
              key={`${position}${index}`}
              className={activeIdx === index ? "active" : undefined}
              onClick={handleToggleFlip}
            >
              <section
                className={!isCardFlip ? "inner show-front" : "inner show-back"}
              >
                <div className="front">
                  <h1 className="player-number">{player.number}</h1>
                </div>
                <div className="back">
                  <h1 className="player-name">{player.name}</h1>
                </div>
              </section>
            </PlayerCard>
          ))}
        </div>
      </CardWrapper>
      <ArrowButton
        isPrev={true}
        onClick={activeIdx > 1 ? handlePrevClick : undefined}
      >
        <span>PREV PLAYER</span>
      </ArrowButton>
      <ArrowButton
        isPrev={false}
        onClick={activeIdx < dataCount - 2 ? handleNextClick : undefined}
      >
        <span>NEXT PLAYER</span>
      </ArrowButton>
    </PlayersContainer>
  );
};

const PlayersContainer = styled(Main)`
  padding: 5rem;
  overflow: hidden;
  gap: 4rem;

  .title {
    text-align: center;
  }
  .title-position {
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
`;

const CardWrapper = styled.section`
  width: 18rem;

  .flex-box {
    width: fit-content;
    display: flex;
    gap: 14rem;
  }
`;

const PlayerCard = styled.article`
  width: 18rem;
  height: 22rem;
  opacity: 0.3;
  cursor: default;
  padding: 1rem;

  .inner {
    width: 100%;
    height: 100%;
    position: relative;
    transition: all 0.3s;
    transform-style: preserve-3d;
  }
  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
    border: 1.5px solid #1475ad;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .front {
    background-color: #3bd6ff;
    padding: 1rem;
  }
  .back {
    background-color: #fff;
    transform: rotateY(180deg);
  }
  .player-number {
    font-weight: 900;
    font-size: 10rem;
    align-self: flex-end;
  }
  .player-name {
    color: #333;
  }
  &.active {
    padding: 0;
    opacity: 1;
    cursor: pointer;
  }
  &.active .show-front {
    transform: rotateY(0);
  }
  &.active .show-back {
    transform: rotateY(180deg);
  }
`;

const ArrowButton = styled.div<{ isPrev: boolean }>`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 58%;
  transform: translate(${(props) => (props.isPrev ? "-14rem" : "14rem")}, -50%);
  display: flex;
  align-items: center;
  text-align: ${(props) => (props.isPrev ? "left" : "right")};
  cursor: pointer;

  span {
    font: 1rem;
    color: #fff;
    opacity: 1;
    transform: translateX(${(props) => (props.isPrev ? "30%" : "-30%")});
    transition: 0.5s;
  }
  ::before,
  ::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    transition: 0.5s;
    transform-origin: ${(props) => (props.isPrev ? "left" : "right")} center;
  }
  ::before {
    top: 50%;
    left: 0px;
    transform: rotate(${(props) => (props.isPrev ? "-180deg" : "180deg")});
  }
  ::after {
    bottom: 50%;
    left: 0px;
    transform: rotate(${(props) => (props.isPrev ? "180deg" : "-180deg")});
  }
  :hover {
    span {
      opacity: 0;
      transform: translateX(${(props) => (props.isPrev ? "100%" : "-100%")});
    }
    ::before {
      transform: rotate(${(props) => (props.isPrev ? "-30deg" : "30deg")});
    }
    ::after {
      transform: rotate(${(props) => (props.isPrev ? "30deg" : "-30deg")});
    }
  }
`;

export default Players;
