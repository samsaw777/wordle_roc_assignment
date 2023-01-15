import { useEffect } from "react";
import { useWordle } from "../wordle";
import { UseWordle } from "../Interface/interface";
import { WordleState } from "../context/WordleContext";
import Row from "./Row";

const Wordle = () => {
  const { solution, currentWord, turn, totalAttemptsWords, isCorrect } =
    WordleState();
  const { handleKeyPressed }: any = useWordle();

  console.log(totalAttemptsWords);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPressed);

    if (turn > 5) {
      window.removeEventListener("keydown", handleKeyPressed);
    }

    if (isCorrect) {
      window.removeEventListener("keydown", handleKeyPressed);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
    };
  }, [handleKeyPressed]);
  return (
    <div className="wordle">
      {/* <div>{solution}</div> */}
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
