import React, { useCallback, useEffect, useRef, useState } from "react";
import { data } from "./featuresData";
import "./features.css";

const Features = () => {
  const [ourFeature, setOurFeature] = useState(data);
  const elementRef = useRef();

  const [isVisible, setIsVisible] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleScroll = debounce(() => {
    setOurFeature((prev) => {
      const item = [...prev];
      const moveFirstToLast = item.push(item.shift());
      console.log(moveFirstToLast);
      return item;
    });
  }, 300);

  const handleScrollCallback = useCallback(handleScroll, [handleScroll]);
  useEffect(() => {
    const listener = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (elementRef) {
      listener.observe(elementRef.current);
    }

    if (isVisible) {
      window.addEventListener("scroll", handleScrollCallback);
    } else {
      window.removeEventListener("scroll", handleScrollCallback);
    }

    return () => {
      listener.disconnect();
      window.removeEventListener("scroll", handleScrollCallback);
    };
  }, [elementRef, isVisible, handleScrollCallback]);

  return (
    <div className="app-container" ref={elementRef}>
      <div className="write-ups-container">
        {ourFeature.map((writeUp, index) => (
          <div className={`write-up write-up-${index + 1}`} key={index}>
            <div className="title">{writeUp.title}</div>
            <div className="content">{writeUp.content}</div>
          </div>
        ))}
      </div>
      <div className="phone-container">
        <div className="mobile-phone">
          <div className="screen">
            {ourFeature.map((writeUp, index) => (
              <div className="phone-content" key={index}>
                {index === 1 && <h1>{writeUp.content}</h1>}
              </div>
            ))}
          </div>
          <div className="volume-button"></div>
          <div className="power-button"></div>
        </div>
      </div>
    </div>
  );
};

export default Features;
