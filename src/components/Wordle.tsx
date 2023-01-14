import { useEffect } from "react";
import { useWordle } from "../wordle";
import { UseWordle } from "../Interface/interface";
import { WordleState } from "../context/WordleContext";

const Wordle = () => {
  const { solution, currentWord, selectedKeys, totalAttemptsWords } =
    WordleState();
  const { handleKeyPressed }: any = useWordle();

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
      <div>
        {totalAttemptsWords?.map((words: any, index: number) => (
          <div className="wordle-div" key={index}>
            {words?.map((word: any, index: number) => (
              <span className={word.color} key={index}>
                {word.letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="wordle-div">
        {currentWord.split("").map((word: string, index: number) => (
          <span key={index}>{word}</span>
        ))}
      </div>
      <div>
        {[...Array(6 - 0)].map((word: string, index: number) => (
          <div className="wordle-div" key={index}>
            {[...Array(5)].map((arr: any, index: number) => (
              <span key={index}></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wordle;
