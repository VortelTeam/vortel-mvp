"use client";
import { useState, useEffect } from "react";

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () =>
        setWindowDimensions(getWindowDimensions())
      );
      return () =>
        window.removeEventListener("resize", () =>
          setWindowDimensions(getWindowDimensions())
        );
    }
  }, []);

  return windowDimensions;
}
