import { useEffect, useState } from "react";

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleReady = () => {
      setVisible(false); // Hide the preloader after page load
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => window.removeEventListener("load", handleReady);
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader" className="desktop-preloader">
      {/* Spinner */}
      <div className="spinner">
        <div className="circle"></div>
      </div>

      {/* Preloader Text */}
      <div className="preloader-text">
        <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
      </div>
    </div>
  );
};

export default Preloader;
