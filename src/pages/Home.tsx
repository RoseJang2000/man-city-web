import styled from 'styled-components';

const Home = () => {
  return (
    <Main>
      <HomeTitle>
        <span>Welcome, </span>
        <div className="message">
          <div className="word1">blues!</div>
          <div className="word2">citizens!</div>
        </div>
      </HomeTitle>
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #001838;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeTitle = styled.div`
  color: #fff;
  font-family: tahoma;
  font-size: 3rem;
  font-weight: 100;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 35rem;

  span {
    font-size: 3rem;
    margin-left: 40px;
  }

  .message {
    background-color: #3bd6ff;
    color: #333;
    display: block;
    font-weight: 900;
    overflow: hidden;
    position: absolute;
    padding-left: 0.5rem;
    top: 0.2rem;
    left: 18rem;
    animation: openclose 4s ease-in-out infinite;
  }

  .word1,
  .word2 {
    font-family: tahoma;
  }

  @keyframes openclose {
    0% {
      top: 0.2rem;
      width: 0;
    }
    10% {
      width: 0;
    }
    20% {
      width: 230px;
    }
    30% {
      top: 0.2rem;
      width: 230px;
    }
    40% {
      top: 0.2rem;
      width: 0;
    }
    50% {
      top: 0.2rem;
      width: 0;
    }
    60% {
      top: -4.5rem;
      width: 0;
    }
    70% {
      top: -4.5rem;
      width: 285px;
    }
    80% {
      top: -4.5rem;
      width: 285px;
    }
    90% {
      top: -4.5rem;
      width: 0;
    }
    100% {
      width: 0;
      text-indent: 0;
    }
  }
`;

export default Home;
