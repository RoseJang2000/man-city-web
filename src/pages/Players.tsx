import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Main } from "styles/Main";
import playerList from "assets/playerList.json";

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
      replaceSlide(playersDataForSlide.length - 3);
    } else {
      setActiveIdx((current) => current - 1);
    }
  };

  const handleNextClick = () => {
    setIsCardFlip(false);
    setSlidetransition(`${transitionTime}ms`);
    if (activeIdx === playersDataForSlide.length - 3) {
      setActiveIdx(playersDataForSlide.length - 2);
      replaceSlide(2);
    } else {
      setActiveIdx((current) => current + 1);
    }
  };

  useEffect(() => {
    setSlidetransition("");
    setIsCardFlip(false);
    setActiveIdx(2);
  }, [position]);

  return (
    <PlayersContainer>
      <h1 className="title">{position}</h1>
      <h2 className="count">{`${activeIdx} / ${showIdx} / ${playersCount}`}</h2>
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
              key={index}
              className={activeIdx === index ? "active" : undefined}
              onClick={handleToggleFlip}
            >
              <section
                className={!isCardFlip ? "inner show-front" : "inner show-back"}
              >
                <div className="front">
                  <h1 className="player-number">{player.number}</h1>
                  {index},{playersDataForSlide.length}
                </div>
                <div className="back">
                  <h1 className="player-name">{player.name}</h1>
                </div>
              </section>
            </PlayerCard>
          ))}
        </div>
      </CardWrapper>
      <div
        className="btnPrev"
        onClick={activeIdx > 1 ? handlePrevClick : undefined}
      >
        <span>PREV PLAYER</span>
      </div>
      <div
        className="btnNext"
        onClick={
          activeIdx < playersDataForSlide.length - 2
            ? handleNextClick
            : undefined
        }
      >
        <span>NEXT PLAYER</span>
      </div>
    </PlayersContainer>
  );
};

const CardWrapper = styled.section`
  width: 18rem;

  .flex-box {
    width: fit-content;
    display: flex;
    gap: 14rem;
  }
`;

const PlayersContainer = styled(Main)`
  padding: 5rem;
  overflow: hidden;
  gap: 4rem;
  .title {
    text-transform: uppercase;
  }

  .btnPrev {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-16rem, -50%);
    display: flex;
    align-items: center;
    text-align: left;
    cursor: pointer;
  }
  .btnPrev span {
    font: 1rem;
    color: #fff;
    opacity: 1;
    transform: translateX(30%);
    transition: 0.5s;
  }
  .btnPrev::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 0px;
    transform-origin: left center;
    transform: rotate(-180deg);
    transition: 0.5s;
  }
  .btnPrev::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    bottom: 50%;
    left: 0px;
    transform-origin: left center;
    transform: rotate(180deg);
    transition: 0.5s;
  }
  .btnPrev:hover span {
    opacity: 0;
    transform: translateX(100%);
  }
  .btnPrev:hover::before {
    transform: rotate(-30deg);
  }
  .btnPrev:hover::after {
    transform: rotate(30deg);
  }
  .btnNext {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(16rem, -50%);
    display: flex;
    align-items: center;
    text-align: right;
    cursor: pointer;
  }
  .btnNext span {
    font: 1rem;
    color: #fff;
    opacity: 1;
    transform: translateX(-30%);
    transition: 0.5s;
  }
  .btnNext::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 0px;
    transform-origin: right center;
    transform: rotate(180deg);
    transition: 0.5s;
  }
  .btnNext::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #fff;
    position: absolute;
    bottom: 50%;
    left: 0px;
    transform-origin: right center;
    transform: rotate(-180deg);
    transition: 0.5s;
  }
  .btnNext:hover span {
    opacity: 0;
    transform: translateX(-100%);
  }
  .btnNext:hover::before {
    transform: rotate(30deg);
  }
  .btnNext:hover::after {
    transform: rotate(-30deg);
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

export default Players;
