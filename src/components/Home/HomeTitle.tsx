import { useWindowWidth } from "hooks/useWindowWidth";
import styled, { keyframes } from "styled-components";

const HomeTitle = () => {
  const windowWidth = useWindowWidth();

  return (
    <HomeTitleWrapper>
      <div className="text-head">Welcome, </div>
      <OpenCloseText width={windowWidth}>
        <div className="word1">blues!</div>
        <div className="word2">citizens!</div>
      </OpenCloseText>
    </HomeTitleWrapper>
  );
};

const HomeTitleWrapper = styled.section`
  color: #fff;
  font-size: 3rem;
  font-weight: 100;
  line-height: 1.5;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 38rem;

  .text-head {
    font-weight: 800;
  }

  @media screen and (max-width: 992px) {
    width: 30rem;
    font-size: 2.7rem;
  }
  @media screen and (max-width: 576px) {
    width: 18rem;
    font-size: 1.6rem;
  }
`;

const OpenClose = (width: number) => keyframes`
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
      top: ${width >= 992 ? "-4.3rem" : width >= 576 ? "-4rem" : "-2.4rem"};
      width: 0;
    }
    70% {
      top: ${width >= 992 ? "-4.3rem" : width >= 576 ? "-4rem" : "-2.4rem"};;
      width: 20rem;
    }
    80% {
      top: ${width >= 992 ? "-4.3rem" : width >= 576 ? "-4rem" : "-2.4rem"};;
      width: 20rem;
    }
    90% {
      top: ${width >= 992 ? "-4.3rem" : width >= 576 ? "-4rem" : "-2.4rem"};;
      width: 0;
    }
    100% {
      width: 0;
      text-indent: 0;
    }
`;

const OpenCloseText = styled.div<{ width: number }>`
  background-color: #3bd6ff;
  color: #333;
  display: block;
  font-weight: 900;
  overflow: hidden;
  position: absolute;
  padding-left: 0.5rem;
  top: 0rem;
  left: 18rem;
  animation: ${(props) => OpenClose(props.width)} 4s ease-in-out infinite;
  @media screen and (max-width: 992px) {
    left: 16rem;
  }
  @media screen and (max-width: 576px) {
    left: 9rem;
  }
`;

export default HomeTitle;
