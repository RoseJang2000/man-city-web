import { Route, Routes } from 'react-router-dom';
import { Home, Players } from 'pages';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </>
  );
}

export default App;
