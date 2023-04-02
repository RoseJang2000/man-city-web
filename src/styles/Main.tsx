import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #24273e,
    #2b3663,
    #0c1529
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24273e,
    #2b3663,
    #0c1529
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
