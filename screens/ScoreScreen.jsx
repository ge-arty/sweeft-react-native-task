import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useScore } from "../context/useScore";

const ScoreScreen = ({ navigation }) => {
  // ---------- Getting global values from  Context storage
  const { score, setScore, questionCounter, setQuestionCounter } = useScore();
  // ---------- Reseting my global values
  const onTryAgain = () => {
    setScore(0);
    setQuestionCounter(1);
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Correct answers: {score}</Text>
      <Text style={styles.text}>Questions amount: {questionCounter}</Text>
      <Button onPress={() => onTryAgain()} title="Try again" />
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});
