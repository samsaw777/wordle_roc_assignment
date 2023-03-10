import React from "react";

export interface Obj {
  [key: string]: string;
}

export interface Context {
  solution: string;
  setSolution: React.Dispatch<React.SetStateAction<string>>;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  currentWord: string;
  setTotalAttemptsWords: React.Dispatch<React.SetStateAction<any[]>>;
  totalAttemptsWords: any[];
  selectedKeys: Obj;
  setSelectedKeys: React.Dispatch<React.SetStateAction<Obj>>;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  turn: number;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isCorrect: boolean;
}

export interface UseWordle {
  handleKeyboardPressed: (key: string) => void;
  //   handleKeyPressed: (e: any) => void;
  currentWord: string;
  totalAttemptsWords: any;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
}
