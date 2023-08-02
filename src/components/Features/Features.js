import React, { useEffect, useRef, useState } from "react";
import { data } from "./featuresData";
import "./features.css";

const Features = () => {
  const [ourFeature, setOurFeature] = useState(data);
  console.log(ourFeature);
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

  useEffect(() => {
    const listener = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (elementRef) {
      listener.observe(elementRef.current);
    }

    if (isVisible) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      listener.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef, isVisible]);

  return (
    <div className="app-container" ref={elementRef}>
      <div className="write-ups-container">
        {ourFeature.map((writeUp, index) => (
          <div className={`write-up write-up-${index + 1}`} key={index}>
            <div className="content">{writeUp.title}</div>
            <p className="content">{writeUp.content}</p>
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
