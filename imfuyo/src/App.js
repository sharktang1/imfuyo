import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading for minimum 2.5 seconds to ensure smooth experience
    const minimumLoadTime = 2500;
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minimumLoadTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? <Loading /> : <LandingPage />}
    </div>
  );
}

export default App;