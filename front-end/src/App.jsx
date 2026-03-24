import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Login } from './pages/Login';
import ConfirmarConta from './pages/ConfirmarConta';
import './App.css';

function App() {
  return (
    <Router>
      <div className="landing-page">
        <Routes>

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main>
                  <Hero />
                </main>
              </>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/confirmar" element={<ConfirmarConta />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
