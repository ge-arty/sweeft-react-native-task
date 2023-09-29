import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/styles";
import useFetch from "../hooks/useFetch";
import useShuffle from "../hooks/useShuffle";
import { useScore } from "../context/useScore";
import he from "he";

const TriviaScreen = ({ route, navigation }) => {
  // -------- Getting values from home screen for Question requests
  const { selectedCategory, difficulty, numberOfQuestions } = route.params;

  // --------- Define
  const [allAnswers, setAllAnswers] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { score, setScore, questionCounter, setQuestionCounter } = useScore();

  const { response, error, loading, resendRequest } = useFetch(
    `https://opentdb.com/api.php?amount=1&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
  );

  const shuffledAnswers = useShuffle(
    response ? response[0].incorrect_answers : [],
    response ? response[0].correct_answer : "",
    loading
  );

  useEffect(() => {
    if (!loading && response) {
      setAllAnswers(shuffledAnswers);
    }
  }, [loading, response, shuffledAnswers]);

  const handleQuiz = () => {
    setSelectedAnswer(null);
    // ----- In case of Next
    if (selectedAnswer && questionCounter != numberOfQuestions) {
      if (selectedAnswer === response[0].correct_answer) setScore(score + 1);
      resendRequest();
      setQuestionCounter(questionCounter + 1);
    }
    // ------ In case of Finish
    if (selectedAnswer && questionCounter == numberOfQuestions) {
      navigation.navigate("Score");
      setSelectedAnswer(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {loading ? (
          <ActivityIndicator size="small" color="#009688" />
        ) : (
          <>
            {questionCounter}. <Text>{he.decode(response[0].question)}</Text>
          </>
        )}
      </Text>
      <View style={styles.answersContainer}>
        {allAnswers?.map((answer, answerIndex) => (
          <TouchableOpacity
            key={answerIndex}
            onPress={() => setSelectedAnswer(answer)}
            style={[
              styles.answerButton,
              {
                backgroundColor: selectedAnswer === answer ? "#009688" : "#ddd",
              },
            ]}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        onPress={() => handleQuiz()}
        title={
          numberOfQuestions == questionCounter ? "Finish Quiz" : "Next Question"
        }
      />
    </View>
  );
};

export default TriviaScreen;
