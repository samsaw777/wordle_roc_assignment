import { createContext, useContext, useState } from "react";
import { Context, Obj } from "../Interface/interface";

const WordleContext = createContext<Context>({
  solution: "",
  setSolution: () => "",
  currentWord: "",
  setCurrentWord: () => "",
  totalAttemptsWords: [],
  setTotalAttemptsWords: () => [],
  selectedKeys: {},
  setSelectedKeys: () => {},
  turn: 0,
  setTurn: () => 0,
  isCorrect: false,
  setIsCorrect: () => false,
});

const WordleProvider = ({ children }: any) => {
  const [solution, setSolution] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [totalAttemptsWords, setTotalAttemptsWords] = useState([...Array(6)]);
  const [selectedKeys, setSelectedKeys] = useState<Obj>({});
  const [turn, setTurn] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  return (
    <WordleContext.Provider
      value={{
        solution,
        setSolution,
        currentWord,
        setCurrentWord,
        totalAttemptsWords,
        setTotalAttemptsWords,
        selectedKeys,
        setSelectedKeys,
        setTurn,
        isCorrect,
        setIsCorrect,
        turn,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const WordleState = () => {
  return useContext(WordleContext);
};

export default WordleProvider;
