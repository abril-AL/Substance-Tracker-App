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
import {Timerthings, getRemaining, formatNumber, styles} from "../components/timer"
import moment from 'moment';




export function Checkingalc({
    quantity
   }: {
      quantity: number;
   }) {

  var a = moment().format('LT');; 
 

  return (
    <View style={styles2.container}>
    <Text style={styles.drugText}>Alcohol</Text>
    <Text style={styles.buttonText}>{`${moment().add((quantity), 'hours').format('LT')}`}</Text>
    </View>
  );
}

export function Checkingweed({
    quantity
   }: {
      quantity: number;
   }) {

  var a = moment().format('LT');; 
 

  return (
    <View style={styles2.container}>
    <Text style={styles.drugText}>Marijuana</Text>
    <Text style={styles.buttonText}>{`${moment().add((quantity * 2), 'hours').format('LT')}`}</Text>
    </View>
  );
}
export const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  drugText: {
    color : 'black',
    fontSize: 50,
    marginBottom: 10,
  },
});
