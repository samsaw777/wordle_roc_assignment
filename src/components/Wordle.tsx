import { useEffect } from "react";
import { useWordle } from "../wordle";
import { UseWordle } from "../Interface/interface";
import { WordleState } from "../context/WordleContext";

const Wordle = () => {
  const { solution } = WordleState();
  const { handleKeyPressed, currentWord, totalAttemptsWords }: UseWordle =
    useWordle();

  console.log(totalAttemptsWords);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPressed);

    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
    };
  }, [handleKeyPressed]);
  return (
    <div>
      <div>Solution : {solution}</div>
      <div>Wordle: {currentWord}</div>
    </div>
  );
};

export default Wordle;
