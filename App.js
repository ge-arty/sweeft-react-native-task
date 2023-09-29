import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TriviaScreen from "./screens/TriviaScreen";
import { StyleSheet } from "react-native";
import ScoreScreen from "./screens/ScoreScreen";
import { ScoreProvider } from "./context/useScore";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ScoreProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Menu" component={HomeScreen} />
          <Stack.Screen
            name="Trivia"
            component={TriviaScreen}
            options={{ headerLeft: null }}
          />
          <Stack.Screen
            name="Score"
            component={ScoreScreen}
            options={{ headerLeft: null }}
          />
        </Stack.Navigator>
      </ScoreProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
