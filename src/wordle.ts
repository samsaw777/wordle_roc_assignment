import React, { useState } from "react";
import { WordleState } from "./context/WordleContext";

const checkIfWordExists = async (word: string) => {
  let valid: boolean = false;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "416fbecb1amsh9d477032fa6414dp11c18ejsn07784bb5eb92",
      "X-RapidAPI-Host": "dictionary-by-api-ninjas.p.rapidapi.com",
    },
  };

  await fetch(
    `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      valid = response.valid;
    })
    .catch((err) => console.error(err));

  return valid;
};

export const useWordle = () => {
  const {
    solution,
    currentWord,
    setCurrentWord,
    totalAttemptsWords,
    setTotalAttemptsWords,
  } = WordleState();
  // const [currentWord, setCurrentWord] = useState<string>("");

  const [turn, setTurn] = useState<number>(0);

  const formatCurrentWord = async () => {
    const valid = await checkIfWordExists(currentWord);

    if (valid) {
      const currentSolution: any = solution.split("");
      const currentWordArray: any = currentWord.split("").map((l) => {
        return { letter: l, color: "gray" };
      });
      console.log(currentWordArray);

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
    } else {
      console.log("Word Not Found In Our Database!");
      return;
    }
  };

  const addToTotal = (currentObejct: any) => {
    totalAttemptsWords[turn] = currentObejct;

    setTotalAttemptsWords(totalAttemptsWords);

    setTurn((turn) => turn + 1);

    setCurrentWord("");
  };

  const handleKeyboardPressed = (key: string) => {
    if (turn > 5) {
      return;
    }

    if (key == "Enter") {
      console.log("Inside");
      if (turn > 5) {
        return;
      }

      if (currentWord.length !== 5) {
        return;
      }

      formatCurrentWord();
    }

    //to cleaar the current word
    if (key === "Backspace") {
      setCurrentWord((currentWord) => currentWord.slice(0, -1));
      return;
    }

    //Check of the word are only between a-z
    if (/^[A-Za-z]$/.test(key)) {
      console.log(currentWord.length);
      if (currentWord.length < 5) {
        setCurrentWord((currentWord) => currentWord + key);
      }
    }
  };

  const handleKeyPressed = ({ key }: KeyboardEvent) => {
    if (turn > 5) {
      return;
    }

    if (key === "Enter") {
      if (turn > 5) {
        return;
      }

      if (currentWord.length !== 5) {
        return;
      }

      formatCurrentWord();
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
    setCurrentWord,
    handleKeyboardPressed,
  };
};
