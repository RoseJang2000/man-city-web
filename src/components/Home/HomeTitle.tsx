import styled from 'styled-components';

const HomeTitle = () => {
  return (
    <HomeTitleWrapper>
      <h1>Welcome, </h1>
      <div className="message">
        <div className="word1">blues!</div>
        <div className="word2">citizens!</div>
      </div>
    </HomeTitleWrapper>
  );
};

const HomeTitleWrapper = styled.section`
  color: #fff;
  font-family: tahoma;
  font-size: 3rem;
  font-weight: 100;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 38rem;
  font-family: tahoma;

  h1 {
    font-size: 3rem;
    margin-left: 2.2rem;
  }

  .message {
    background-color: #3bd6ff;
    color: #333;
    display: block;
    font-weight: 900;
    overflow: hidden;
    position: absolute;
    padding-left: 0.5rem;
    top: 0rem;
    left: 20rem;
    animation: openclose 4s ease-in-out infinite;
  }

  @keyframes openclose {
    0% {
      top: 0;
      width: 0;
    }
    10% {
      width: 0;
    }
    20% {
      width: 15rem;
    }
    30% {
      top: 0;
      width: 15rem;
    }
    40% {
      top: 0;
      width: 0;
    }
    50% {
      top: 0;
      width: 0;
    }
    60% {
      top: -4.5rem;
      width: 0;
    }
    70% {
      top: -4.5rem;
      width: 20rem;
    }
    80% {
      top: -4.5rem;
      width: 20rem;
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

export default HomeTitle;
