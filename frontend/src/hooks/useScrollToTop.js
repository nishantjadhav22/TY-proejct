import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // page ko top par le aayega
  }, [pathname]);

  return null;
};

export default ScrollToTop;
