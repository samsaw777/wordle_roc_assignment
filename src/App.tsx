import React, { useEffect } from "react";
import "./App.css";
import { WordleState } from "./context/WordleContext";
import Header from "./components/Header";
import Wordle from "./components/Wordle";
import Keyboard from "./components/keyboard";

function App() {
  const { setSolution } = WordleState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "416fbecb1amsh9d477032fa6414dp11c18ejsn07784bb5eb92",
        "X-RapidAPI-Host": "wordle-answers-solutions.p.rapidapi.com",
      },
    };

    fetch("https://wordle-answers-solutions.p.rapidapi.com/answers", options)
      .then((response) => response.json())
      .then((response) => {
        const randomWordIndex = Math.floor(
          Math.random() * response.data.length
        );
        setSolution(response.data[randomWordIndex].answer);
      })
      .catch((err) => console.error(err));
  }, [setSolution]);

  return (
    <div className="app">
      <Header />
      <Wordle />
      <Keyboard />
    </div>
  );
}

export default App;
