import { useEffect } from "react";
import { useWordle } from "../wordle";
import { UseWordle } from "../Interface/interface";
import { WordleState } from "../context/WordleContext";
import Row from "./Row";

const Wordle = () => {
  const { solution, currentWord, turn, totalAttemptsWords } = WordleState();
  const { handleKeyPressed }: any = useWordle();

  console.log(totalAttemptsWords);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPressed);

    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
    };
  }, [handleKeyPressed]);
  return (
    <div className="wordle">
      <div>
        {totalAttemptsWords?.map((words: any, index: number) => {
          if (turn === index) {
            return <Row currentWord={currentWord} />;
          }
          return <Row guess={words} />;
        })}
      </div>
    </div>
  );
};

export default Wordle;
