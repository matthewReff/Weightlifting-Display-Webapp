import { useLayoutEffect, useState } from "react";

export interface WindowDimensions {
  width: number,
  height: number
}
export function getWindowDimensions(): WindowDimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize(getWindowDimensions());
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return windowSize;
}