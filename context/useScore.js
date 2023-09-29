import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(1);

  return (
    <ScoreContext.Provider
      value={{ score, setScore, questionCounter, setQuestionCounter }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  return useContext(ScoreContext);
};
