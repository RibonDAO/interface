import { useState, useEffect, useCallback } from "react";
import theme, { Breakpoint } from "styles/theme";

interface WindowSize {
  width: number;
  height: number;
  breakpoint: keyof Breakpoint;
}

export default function useWindowSize(): WindowSize {
  function convertPxToNumber(cssStyle: string) {
    return Number(cssStyle.replace("px", ""));
  }

  // TODO: Refactor if you need to add a new breakpoint
  const setBreakpoint = useCallback(() => {
    const desktopWidth = convertPxToNumber(theme.breakpoints.desktop);
    const padWidth = convertPxToNumber(theme.breakpoints.pad);
    let breakpointValue = "mobile";

    if (window.innerWidth >= desktopWidth) {
      breakpointValue = "desktop";
    } else if (window.innerWidth >= padWidth) {
      breakpointValue = "pad";
    }

    return breakpointValue as keyof Breakpoint;
  }, []);

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: setBreakpoint(),
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: setBreakpoint(),
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setBreakpoint]);

  return windowSize;
}
