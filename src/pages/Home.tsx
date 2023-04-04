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
  overflow: hidden;
  gap: 5rem;
  padding-top: 5rem;
  @media screen and (max-width: 576px) {
    gap: 2rem;
  }
`;

export default Home;
