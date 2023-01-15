import React from "react";

const Row = ({ guess, currentWord }: any) => {
  if (guess) {
    return (
      <div className="wordle-div">
        {guess.map((g: any, index: number) => (
          <span className={g.color} key={index}>
            {g.letter}
          </span>
        ))}
      </div>
    );
  }
  if (currentWord) {
    return (
      <div className="wordle-div current">
        {currentWord.split("").map((word: string, index: number) => (
          <span key={index} className="filled">
            {word}
          </span>
        ))}
        {[...Array(5 - currentWord.length)].map((word: any, index: number) => (
          <span key={index}></span>
        ))}
      </div>
    );
  }

  return (
    <div className="wordle-div">
      {[...Array(5)].map((g: any, index: number) => (
        <span></span>
      ))}
    </div>
  );
};

export default Row;
