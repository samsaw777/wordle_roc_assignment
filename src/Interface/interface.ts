import React from "react";

export interface Context {
  solution: string;
  setSolution: React.Dispatch<React.SetStateAction<string>>;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  currentWord: string;
  setTotalAttemptsWords: React.Dispatch<React.SetStateAction<any[]>>;
  totalAttemptsWords: any[];
}

export interface UseWordle {
  handleKeyboardPressed: (key: string) => void;
  //   handleKeyPressed: (e: any) => void;
  currentWord: string;
  totalAttemptsWords: any;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
}
