import React, { useEffect, useState } from "react";
import "./App.css";
import { WordleState } from "./context/WordleContext";
import Header from "./components/Header";
import Wordle from "./components/Wordle";
import Keyboard from "./components/keyboard";
import Modal from "./components/Modal";

function App() {
  const { setSolution, turn, isCorrect, solution } = WordleState();
  const [openModal, setsOpenModal] = useState<boolean>(false);

  // console.log(openModal);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "416fbecb1amsh9d477032fa6414dp11c18ejsn07784bb5eb92",
        "X-RapidAPI-Host": "wordle-answers-solutions.p.rapidapi.com",
      },
    };

    fetch("https://wordle-game-api1.p.rapidapi.com/word", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setSolution(response.word);
        // const randomWordIndex = Math.floor(
        //   Math.random() * response.data.length
        // );
        // console.log(response.data);
        // setSolution(response.data[randomWordIndex].answer);
      })
      .catch((err) => console.error(err));
    
  }, [setSolution]);

  console.log(solution)

  return (
    <div className="app">
      <Header />
      <Wordle setOpenModal={setsOpenModal} />
      <div>
        <Keyboard />
      </div>
      {openModal && (
        <Modal
          turn={turn}
          isCorrect={isCorrect}
          solution={solution}
          setOpenModal={setsOpenModal}
        />
      )}
    </div>
  );
}

export default App;
