import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { RootTabScreenProps } from "../types";
import React, { useState, useEffect } from "react";

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const hours = Math.floor(time/3600);
  const mins = Math.floor((time - hours * 3600)/ 60);
  const secs = time - mins * 60;
  return { hours: formatNumber(hours), mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const [remainingSecs, setRemainingSecs] = useState(3600);
  const [isActive, setIsActive] = useState(false);
  const { hours, mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setRemainingSecs(3600);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && remainingSecs !==0) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.drugText}>Alcohol</Text>
      <Text style={styles.timerText}>{`${hours}:${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: "black",
    allignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  timerText: {
    color: "black",
    fontSize: 90,
    marginBottom: 20,
  },
  drugText: {
    color : 'black',
    fontSize: 50,
    marginBottom: 10,
  },
});
