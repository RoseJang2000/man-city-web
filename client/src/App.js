import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Players from './pages/Players';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
