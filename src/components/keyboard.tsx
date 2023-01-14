import React from "react";
import { WordleState } from "../context/WordleContext";
import { UseWordle } from "../Interface/interface";
import { useWordle } from "../wordle";
const keyboardKeys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
];

const Keyboard = () => {
  const { handleKeyboardPressed }: any = useWordle();
  const { selectedKeys } = WordleState();

  console.log(selectedKeys);
  return (
    <>
      <div className="keyboard-div">
        {keyboardKeys[0].map((key: string, index: number) => {
          const color = selectedKeys[key];
          return (
            <span
              key={index}
              onClick={() => handleKeyboardPressed(key)}
              className={color}
            >
              {key}
            </span>
          );
        })}
      </div>
      <div className="keyboard-div">
        {keyboardKeys[1].map((key: string, index: number) => {
          const color = selectedKeys[key];
          return (
            <span
              key={index}
              onClick={() => handleKeyboardPressed(key)}
              className={color}
            >
              {key}
            </span>
          );
        })}
      </div>
      <div className="keyboard-div">
        {keyboardKeys[2].map((key: string, index: number) => {
          const color = selectedKeys[key];
          return (
            <span
              key={index}
              onClick={() => handleKeyboardPressed(key)}
              className={color}
            >
              {key}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Keyboard;
