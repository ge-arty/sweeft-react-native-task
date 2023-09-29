import { useState, useEffect } from "react";

const useShuffle = (incorrectAnswers, correctAnswer, loading) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    // Check if loading is false before shuffling
    if (!loading) {
      const allAnswers = [...incorrectAnswers, correctAnswer];
      const shuffled = allAnswers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
    }
  }, [incorrectAnswers, correctAnswer, loading]);

  return shuffledAnswers;
};

export default useShuffle;
