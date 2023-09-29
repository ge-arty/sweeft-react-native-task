import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 20,
    padding: 16,
  },
  btnLink: {
    textDecorationLine: "underline",
  },
  redText: {
    color: "red",
    fontWeight: "bold",
  },

  questionText: {
    fontSize: 20,
    marginBottom: 16,
  },
  answersContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 16,
  },
  answerButton: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  answerText: {
    fontSize: 16,
    color: "#333",
  },
});
