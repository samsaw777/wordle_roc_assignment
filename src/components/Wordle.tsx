import { useEffect } from "react";
import { useWordle } from "../wordle";
import { UseWordle } from "../Interface/interface";
import { WordleState } from "../context/WordleContext";
import Row from "./Row";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wordle = ({ setOpenModal }: Props) => {
  const {
    solution,
    currentWord,
    turn,
    totalAttemptsWords,
    isCorrect,
    setIsCorrect,
  } = WordleState();
  const { handleKeyPressed }: any = useWordle();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPressed);

    if (turn > 5) {
      setIsCorrect(false);
      setTimeout(() => {
        setOpenModal(true);
      }, 2000);
      window.removeEventListener("keydown", handleKeyPressed);
    }

    if (isCorrect) {
      setIsCorrect(true);
      setTimeout(() => {
        setOpenModal(true);
      }, 2000);
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
