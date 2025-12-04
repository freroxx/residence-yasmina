import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Start exit animation
    setIsVisible(false);
    
    // After exit animation, update children and start enter animation
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    // Initial mount animation
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`page-transition ${isVisible ? 'page-visible' : 'page-hidden'}`}
    >
      {displayChildren}
    </div>
  );
};

export default PageWrapper;