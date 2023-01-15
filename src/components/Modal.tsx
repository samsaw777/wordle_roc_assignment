import React from "react";
import { MdCancel } from "react-icons/md";
import { WordleState } from "../context/WordleContext";

interface Props {
  isCorrect: boolean;
  solution: string;
  turn: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ isCorrect, solution, turn, setOpenModal }: Props) => {
  const { setTurn, setIsCorrect } = WordleState();

  const closeModal = () => {
    if (turn > 5) {
      setTurn(-1);

      setOpenModal(false);
    }
    if (isCorrect) {
      setTurn(-1);

      setOpenModal(false);
      setIsCorrect(false);
    }
  };
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <MdCancel className="cancel" onClick={() => closeModal()} />
          <p>Congratulations, You have guessed it correct</p>
          <p className="solution">{solution}</p>
          <p>You took {turn} to guess the word.</p>
        </div>
      )}
      {turn > 5 && (
        <div>
          <MdCancel className="cancel" onClick={() => closeModal()} />
          <p>Seem's you are out of turn's</p>
          <p className="solution">{solution}</p>
          <p>Better Luck Next Time!</p>
        </div>
      )}
    </div>
  );
};

export default Modal;
