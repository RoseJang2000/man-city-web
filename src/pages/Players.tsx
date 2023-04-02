import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Main } from "styles/Main";
import playerList from "assets/playerList.json";
import { useEffect, useState } from "react";
import { useWindowWidth } from "hooks/useWindowWidth";
import PlayerCard from "components/Players/PlayerCard";

export interface Player {
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
  const windowWidth = useWindowWidth();
  const playersData: Player[] = playerList[position as keyof object];
  const playersCount: number = playersData.length;
  const transitionTime: number = 300;
  const playersDataForSlide = [
    ...playersData.slice(-2),
    ...playersData,
    ...playersData.slice(0, 2),
  ];
  const dataCount: number = playersDataForSlide.length;
  const [isCardFlip, setIsCardFlip] = useState<boolean>(true);
  const [activeIdx, setActiveIdx] = useState<number>(2);
  const [showIdx, setShowIdx] = useState<number>(1);
  const [slideTransition, setSlidetransition] = useState<string>("");

  const handleResponsiveCardWidth = () => {
    if (windowWidth <= 768) {
      return 15;
    }
    return 18;
  };

  const [cardWidth, setCardWidth] = useState<number>(
    handleResponsiveCardWidth()
  );

  const handleResize = () => {
    setCardWidth(handleResponsiveCardWidth());
  };

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
    setIsCardFlip(true);
    setShowIdx(1);
    setActiveIdx(2);
  }, [position]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return window.addEventListener("resize", handleResize);
  }, [windowWidth]);

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
            transform: `translateX(-${
              cardWidth * activeIdx + 14 * activeIdx
            }rem)`,
            transition: slideTransition,
          }}
        >
          {playersDataForSlide.map((player, index) => (
            <PlayerCard
              key={`${position}${index}`}
              player={player}
              activeIdx={activeIdx}
              handleToggleFlip={handleToggleFlip}
              isCardFlip={isCardFlip}
              index={index}
            />
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

  @media screen and (max-width: 768px) {
    gap: 2rem;
  }
`;

const CardWrapper = styled.section`
  width: 18rem;

  .flex-box {
    width: fit-content;
    display: flex;
    gap: 14rem;
  }

  @media screen and (max-width: 768px) {
    width: 15rem;
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
  transition: 0.5s;

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

  @media screen and (max-width: 768px) {
    top: auto;
    bottom: 0;
    transform: translate(${(props) => (props.isPrev ? "-4rem" : "4rem")}, -50%);
  }
`;

export default Players;
