import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Investments from './pages/Investments';
import AIAdvisor from './pages/AIAdvisor';
import Profile from './pages/Profile';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Splash screen duration

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
        } />

        {/* Protected Routes */}
        <Route path="/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/advisor" element={<AIAdvisor />} />
                <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
