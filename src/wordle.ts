import React, { useState } from "react";
import { WordleState } from "./context/WordleContext";

export const useWordle = () => {
  const { solution } = WordleState();
  const [currentWord, setCurrentWord] = useState<string>("");
  const [totalAttemptsWords, setTotalAttemptsWords] = useState([...Array(6)]);

  const [turn, setTurn] = useState<number>(0);

  const formatCurrentWord = () => {
    const currentSolution: any = solution.split("");
    const currentWordArray: any = currentWord.split("").map((l) => {
      return { letter: l, color: "gray" };
    });

    currentWordArray.forEach((letter: any, index: number) => {
      if (currentSolution[index] === letter.letter) {
        currentWordArray[index].color = "green";
        currentSolution[index] = null;
      } else if (
        currentSolution.includes(letter.letter) &&
        letter.color !== "green"
      ) {
        currentWordArray[index].color = "yellow";
      }
    });

    addToTotal(currentWordArray);
  };

  const addToTotal = (currentObejct: any) => {
    totalAttemptsWords[turn] = currentObejct;

    setTotalAttemptsWords(totalAttemptsWords);

    setTurn((turn) => turn + 1);

    setCurrentWord("");
  };

  const handleKeyPressed = ({ key, code }: KeyboardEvent) => {
    if (key === "Enter") {
      if (turn > 5) {
        return;
      }

      if (currentWord.length !== 5) {
        return;
      }

      formatCurrentWord();
    }

    if (turn > 5) {
      return;
    }

    //to cleaar the current word
    if (key === "Backspace") {
      setCurrentWord((currentWord) => currentWord.slice(0, -1));
      return;
    }

    //Check of the word are only between a-z
    if (/^[A-Za-z]$/.test(key)) {
      if (currentWord.length < 5) {
        if (key !== key.toUpperCase()) {
          setCurrentWord((currentWord) => currentWord + key.toUpperCase());
        } else {
          setCurrentWord((currentWord) => currentWord + key);
        }
      }
    }
  };

  return {
    handleKeyPressed,
    currentWord,
    totalAttemptsWords,
  };
};
