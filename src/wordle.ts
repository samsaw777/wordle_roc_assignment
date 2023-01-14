import React, { useState } from "react";
import { WordleState } from "./context/WordleContext";
import { Obj } from "./Interface/interface";

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
    setSelectedKeys,
    turn,
    setTurn,
    setIsCorrect,
    isCorrect,
  } = WordleState();

  const formatCurrentWord = async () => {
    const valid = await checkIfWordExists(currentWord);

    if (valid) {
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
    } else {
      console.log("Word Not Found In Our Database!");
      return;
    }
  };

  const addToTotal = (currentObject: any) => {
    if (currentWord === solution) {
      setIsCorrect(true);
    }
    totalAttemptsWords[turn] = currentObject;

    setTotalAttemptsWords(totalAttemptsWords);

    setTurn((turn) => turn + 1);

    setSelectedKeys((previousKeys: Obj) => {
      let newKeys: any = previousKeys === undefined ? {} : { ...previousKeys };
      currentObject.forEach((each: any) => {
        const currentColor = newKeys[each.letter];

        if (each.color === "green") {
          newKeys[each.letter] = "green";
          return;
        } else if (each.color === "yellow" && currentColor !== "green") {
          newKeys[each.letter] = "yellow";
          return;
        } else if (
          each.color === "gray" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[each.letter] = "gray";
        }
      });

      return newKeys;
    });

    setCurrentWord("");
  };

  const handleKeyboardPressed = (key: string) => {
    if (isCorrect) {
      return;
    }
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
    if (key === "Back") {
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
