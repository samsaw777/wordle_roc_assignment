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

  const getTodayWord = async () => {
          const url = 'https://wordle-game-api1.p.rapidapi.com/word';
      const options = {
      	method: 'GET',
      	headers: {
      		'X-RapidAPI-Key': '416fbecb1amsh9d477032fa6414dp11c18ejsn07784bb5eb92',
      		'X-RapidAPI-Host': 'wordle-game-api1.p.rapidapi.com'
      	}
      };
      
      try {
      	const response = await fetch(url, options);
      	const result = await response.json();
      	console.log(result.word.toUpperCase());
        setSolution(result.word.toUpperCase())
      } catch (error) {
      	console.error(error);
      }
    
  }

  useEffect(() => {
      getTodayWord()
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
