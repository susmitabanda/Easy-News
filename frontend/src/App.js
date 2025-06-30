import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Newsboard from './components/Newsboard';
import Header from './components/Header';
import NewsItem from './components/Newsitem';

import Home from './pages/Home';
// import India from './pages/India';
import Politics from './pages/Politics';
import Entertainment from './pages/Entertainment';
import Sports from './pages/Sports';
import World from './pages/World';
import Technology from './pages/Technology';


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Newsboard />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/india" element={<India />} /> */}
          <Route path="/politics" element={<Politics />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/world" element={<World />} />
          <Route path="/technology" element={<Technology />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
