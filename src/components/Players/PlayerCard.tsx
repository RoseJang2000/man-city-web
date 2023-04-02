import { Player } from "pages/Players";
import styled from "styled-components";

interface PlayerCardProps {
  player: Player;
  activeIdx: number;
  handleToggleFlip: () => void;
  isCardFlip: boolean;
  index: number;
}

const PlayerCard = ({
  player,
  activeIdx,
  handleToggleFlip,
  isCardFlip,
  index,
}: PlayerCardProps) => {
  return (
    <CardWrapper
      className={activeIdx === index ? "active" : undefined}
      onClick={handleToggleFlip}
    >
      <section className={!isCardFlip ? "inner show-front" : "inner show-back"}>
        <div className="front">
          <h1 className="player-number">{player.number}</h1>
        </div>
        <div className="back">
          <h1 className="player-name">{player.name}</h1>
          <img src={player.profileImg} alt={player.name} />
          <img
            className="player-country-flag"
            src={player.country.flag}
            alt={player.country.name}
          />
          <p className="player-country-name">{player.country.name}</p>
          {player.onLoan && (
            <p className="player-on-loan">on Loan to {player.onLoan}</p>
          )}
        </div>
      </section>
    </CardWrapper>
  );
};

const CardWrapper = styled.article`
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
    color: #333;
  }
  .player-number {
    font-weight: 900;
    font-size: 10rem;
    align-self: flex-end;
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

  @media screen and (max-width: 768px) {
    width: 15rem;
    height: 18rem;
  }
`;

export default PlayerCard;
