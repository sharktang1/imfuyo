import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  
  // Initialize currentPage from localStorage or default to 'landing'
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'landing';
  });
  
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('isDark');
    return savedTheme === 'true';
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Save currentPage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('isDark', isDark);
  }, [isDark]);

  // Initial load effect
  useEffect(() => {
    const loadEverything = async () => {
      try {
        // Method 1: Try to preload Lottie using XMLHttpRequest
        const lottiePromise = new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', 'https://lottie.host/68638530-e1e4-49f9-952a-1c3efcd7aeac/2hywu50vnf.lottie');
          xhr.onload = () => resolve(true);
          xhr.onerror = () => resolve(true); // Continue even if it fails
          xhr.send();
        });

        // Method 2: Preload images
        const imageUrls = [
          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=900&fit=crop',
          'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=800&fit=crop'
        ];

        const imagePromises = imageUrls.map(url => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        // Wait for Lottie preload attempt and image preloads
        await Promise.all([lottiePromise, ...imagePromises]);
        
        setLottieLoaded(true);

        // Minimum loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);

      } catch (error) {
        console.error('Loading error:', error);
        // Fallback: Show landing page after minimum time
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    loadEverything();
  }, []);

  const navigateToAbout = () => {
    // Show loading screen
    setIsTransitioning(true);
    setLottieLoaded(false);
    
    // Simulate loading
    setTimeout(() => {
      setLottieLoaded(true);
    }, 500);

    // Navigate after loading
    setTimeout(() => {
      setCurrentPage('about');
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 2000);
  };

  const navigateToHome = () => {
    // Show loading screen
    setIsTransitioning(true);
    setLottieLoaded(false);
    
    // Simulate loading
    setTimeout(() => {
      setLottieLoaded(true);
    }, 500);

    // Navigate after loading
    setTimeout(() => {
      setCurrentPage('landing');
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 2000);
  };

  // Show loading screen for initial load or transitions
  if (isLoading || isTransitioning) {
    return <Loading lottieLoaded={lottieLoaded} />;
  }

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage 
          isDark={isDark} 
          setIsDark={setIsDark}
          onNavigateToAbout={navigateToAbout}
        />
      ) : (
        <AboutPage 
          isDark={isDark}
          setIsDark={setIsDark}
          onBack={navigateToHome}
        />
      )}
    </div>
  );
}

export default App;