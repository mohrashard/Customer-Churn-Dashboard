import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import RetentifyLanding from './pages/landing';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RetentifyLanding />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
