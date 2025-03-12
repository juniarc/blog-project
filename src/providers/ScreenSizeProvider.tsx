"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext<{
  deviceType: "mobile" | "tablet" | "desktop" | null;
}>({
  deviceType: null,
});

export const ScreenSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [deviceType, setDeviceType] = useState<
    "mobile" | "tablet" | "desktop" | null
  >(null);

  const handleResize = () => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        setDeviceType("mobile");
      } else if (window.innerWidth > 768 && window.innerWidth <= 1023) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <ScreenSizeContext.Provider value={{ deviceType }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSizeContext = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error(
      "useScreenSizeContext must be used within a useScreenSizeProvider"
    );
  }

  return context;
};
