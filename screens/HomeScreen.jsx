import React, { useState } from "react";
import {
  Text,
  Button,
  SafeAreaView,
  TextInput,
  View,
  Linking,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/styles";
import useFetch from "../hooks/useFetch";

const HomeScreen = ({ navigation }) => {
  // --------------- Here i define values for question req
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");

  // ------ Requesting categories with custom Fetch Hook
  const { response, error, loading, resendRequest } = useFetch(
    "https://opentdb.com/api_category.php"
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Choose Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        {response?.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>

      <Text>Choose Difficulty:</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      <Text>Number of Questions:</Text>
      <TextInput
        value={numberOfQuestions}
        onChangeText={(text) => setNumberOfQuestions(text)}
        keyboardType="numeric"
        placeholder="Enter number of questions"
        style={styles.input}
      />

      <Button
        title="Start Quiz"
        onPress={() => {
          navigation.navigate("Trivia", {
            selectedCategory,
            difficulty,
            numberOfQuestions,
          });
        }}
      />

      <View>
        <Text style={styles.redText}>Attention: You can't skip question!</Text>
        <Text>
          &copy; 2023 Sweeft React Native Task by{" "}
          <Text
            style={styles.btnLink}
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/george-arutinyan/")
            }
          >
            Giorgi Arutiniani
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
