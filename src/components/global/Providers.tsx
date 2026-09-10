"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CursorType = "default" | "hover" | "gold" | "red" | "text" | "click";

interface CursorContextProps {
  cursorType: CursorType;
  cursorText: string;
  setCursorType: (type: CursorType) => void;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextProps>({
  cursorType: "default",
  cursorText: "",
  setCursorType: () => {},
  setCursorText: () => {},
});

export const useCursor = () => useContext(CursorContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorTypeState] = useState<CursorType>("default");
  const [cursorText, setCursorTextState] = useState<string>("");

  const setCursorType = (type: CursorType) => {
    setCursorTypeState(type);
  };

  const setCursorText = (text: string) => {
    setCursorTextState(text);
  };

  // Add custom class to body for cursor hiding
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.add("custom-cursor-active");
      return () => {
        document.body.classList.remove("custom-cursor-active");
      };
    }
  }, []);

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursorType, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
}
