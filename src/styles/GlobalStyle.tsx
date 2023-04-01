import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }

  html, body, #root {
    width: 100%;
    background-color: #001838;
    color: #fff;
  }
`;

export default GlobalStyle;
