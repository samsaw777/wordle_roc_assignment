import { createContext, useContext, useState } from "react";
import { Context } from "../Interface/interface";

const WordleContext = createContext<Context>({
  solution: "",
  setSolution: () => "",
});

const WordleProvider = ({ children }: any) => {
  const [solution, setSolution] = useState<string>("");

  return (
    <WordleContext.Provider value={{ solution, setSolution }}>
      {children}
    </WordleContext.Provider>
  );
};

export const WordleState = () => {
  return useContext(WordleContext);
};

export default WordleProvider;
