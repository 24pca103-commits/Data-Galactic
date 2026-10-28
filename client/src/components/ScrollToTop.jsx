import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const serviceIds = ['data-entry', 'data-processing', 'data-conversion', 'web-research', 'ecommerce-data', 'back-office-support'];
const industryIds = ['ecommerce', 'healthcare', 'real-estate', 'finance', 'logistics', 'education'];

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = hash.replace('#', '');
      const elementId = serviceIds.includes(targetId)
        ? 'services'
        : industryIds.includes(targetId)
        ? 'industries'
        : targetId;

      const scrollToElement = () => {
        const el = document.getElementById(targetId) || document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };

      scrollToElement();
      const timer1 = setTimeout(scrollToElement, 100);
      const timer2 = setTimeout(scrollToElement, 300);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
