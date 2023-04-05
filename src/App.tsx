import { Route, Routes } from "react-router-dom";
import { Home, News, Players } from "pages";
import GlobalStyle from "styles/GlobalStyle";

import Header from "containers/Header";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players/:position" element={<Players />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
};

export default App;
