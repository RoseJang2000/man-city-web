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
      onClick={activeIdx === index ? handleToggleFlip : undefined}
    >
      <div className={!isCardFlip ? "inner show-front" : "inner show-back"}>
        <CardFront className="card-front">
          <h1 className="player-number">{player.number}</h1>
        </CardFront>
        <CardBack>
          <div className="player-back-title">
            <h1 className="player-name">{player.name}</h1>
            {player.onLoan && (
              <p className="player-on-loan">On loan to {player.onLoan}</p>
            )}
          </div>
          <div
            className="player-country-flag"
            style={{ backgroundImage: `url(${player.country.flag})` }}
          ></div>

          <div
            className="player-profile"
            style={{ backgroundImage: `url(${player.profileImg})` }}
          />
          <div
            className="player-profile player-profile-shadow"
            style={{ backgroundImage: `url(${player.profileImg})` }}
          />
        </CardBack>
      </div>
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
  &.active {
    padding: 0;
    opacity: 1;
    cursor: pointer;
  }
  &.active section {
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.6);
  }
  &.active .show-front {
    transform: rotateY(0);
  }
  &.active .show-back {
    transform: rotateY(180deg);
  }
  &.active .card-front::before {
    position: absolute;
    top: 23rem;
    left: 5rem;
    content: "";
    display: block;
    width: 60px;
    height: 100%;
    transform: skewX(-40deg);
    background-color: rgba(255, 255, 255, 0.6);
    filter: blur(3rem);
  }
  &.active .card-front:hover {
    color: #fff;
  }
  &.active .card-front:hover::before {
    top: -8rem;
    transition: all 0.3s ease-in;
  }

  @media screen and (max-width: 768px) {
    width: 15rem;
    height: 18rem;
  }
`;

const CardFront = styled.section`
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
  background: rgb(32, 83, 134);
  background: linear-gradient(
    330deg,
    rgba(32, 83, 134, 1) 0%,
    rgba(50, 102, 157, 1) 25%,
    rgba(59, 127, 194, 1) 40%,
    rgba(59, 214, 254, 1) 100%
  );
  padding: 1rem;
  overflow: hidden;

  .player-number {
    font-weight: 900;
    font-size: 10rem;
    align-self: flex-end;
  }
`;

const CardBack = styled(CardFront)`
  background-image: linear-gradient(-225deg, #fffeff 0%, #d7fffe 100%);
  transform: rotateY(180deg);
  color: #333;
  padding: 0;
  padding-top: 2rem;
  justify-content: space-between;

  .player-back-title {
    text-align: center;
  }
  .player-name {
    font-size: 1.8rem;
    font-weight: 800;
  }
  .player-profile {
    width: 85%;
    padding-bottom: 85%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .player-profile-shadow {
    position: absolute;
    bottom: 0;
    filter: blur(1rem);
    z-index: -1;
  }
  .player-country-flag {
    width: 20%;
    padding-bottom: 20%;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 5%;
    right: 5%;
  }

  @media screen and (max-width: 768px) {
    .player-name {
      font-size: 1.4rem;
    }
  }
`;

export default PlayerCard;
