import React from "react";

export interface Context {
  solution: string;
  setSolution: React.Dispatch<React.SetStateAction<string>>;
}

export interface UseWordle {
  handleKeyPressed: (e: any) => void;
  currentWord: string;
  totalAttemptsWords: any;
}
