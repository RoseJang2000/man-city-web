import HomeTitle from "components/Home/HomeTitle";
import Trophies from "components/Home/Trophies";
import styled from "styled-components";
import { Main } from "styles/Main";

const Home = () => {
  return (
    <HomeContainer>
      <HomeTitle />
      <Trophies />
    </HomeContainer>
  );
};

const HomeContainer = styled(Main)`
  overflow: auto;
  gap: 5rem;
  justify-content: flex-start;
  padding: 5rem 0;

  @media screen and (max-width: 576px) {
    gap: 2rem;
  }
`;

export default Home;
