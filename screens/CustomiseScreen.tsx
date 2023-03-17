import Checkbox from "expo-checkbox";
import { StyleSheet, ScrollView, Text } from "react-native";
import { readData, writeData } from "./firebase";
import { useState, useEffect } from "react";
import { MASTERID } from "../constants/userInfo";
import { View } from "../components/Themed";
import { Stack } from "@react-native-material/core";

export default function CustomiseScreen() {
  const [isAlcCheck, setAlcCheck] = useState(false);
  const [isAdderallCheck, setAdderallCheck] = useState(false);
  const [isBenzosCheck, setBenzosCheck] = useState(false);
  const [isCannabisCheck, setCannabisCheck] = useState(false);
  const [isCocaineCheck, setCocaineCheck] = useState(false);
  const [isIbuCheck, setIbuCheck] = useState(false);
  const [isKetCheck, setKetCheck] = useState(false);
  const [isKratomCheck, setKratomCheck] = useState(false);
  const [isLSDCheck, setLSDCheck] = useState(false);
  const [isMDMACheck, setMDMACheck] = useState(false);
  const [isMethCheck, setMethCheck] = useState(false);
  const [isNicCheck, setNicCheck] = useState(false);
  const [isPercCheck, setPercCheck] = useState(false);
  const [isPsiloCheck, setPsiloCheck] = useState(false);
  const [isRoidCheck, setRoidCheck] = useState(false);

  function alcFunc() {
    setAlcCheck(!isAlcCheck);
    writeData("/" + MASTERID + "/substancePrefs/Alcohol", !isAlcCheck);
  }
  function adderallFunc() {
    setAdderallCheck(!isAdderallCheck);
    writeData("/" + MASTERID + "/substancePrefs/Adderall", !isAdderallCheck);
  }
  function benzosFunc() {
    setBenzosCheck(!isBenzosCheck);
    writeData("/" + MASTERID + "/substancePrefs/Benzos", !isBenzosCheck);
  }
  function cannabisFunc() {
    setCannabisCheck(!isCannabisCheck);
    writeData("/" + MASTERID + "/substancePrefs/Cannabis", !isCannabisCheck);
  }
  function cokeFunc() {
    setCocaineCheck(!isCocaineCheck);
    writeData("/" + MASTERID + "/substancePrefs/Cocaine", !isCocaineCheck);
  }
  function ibuFunc() {
    setIbuCheck(!isIbuCheck);
    writeData("/" + MASTERID + "/substancePrefs/Ibuprofen", !isIbuCheck);
  }
  function ketFunc() {
    setKetCheck(!isKetCheck);
    writeData("/" + MASTERID + "/substancePrefs/Ketamine", !isKetCheck);
  }
  function KratomFunc() {
    setKratomCheck(!isKratomCheck);
    writeData("/" + MASTERID + "/substancePrefs/Kratom", !isKratomCheck);
  }
  function LSDFunc() {
    setLSDCheck(!isLSDCheck);
    writeData("/" + MASTERID + "/substancePrefs/LSD", !isLSDCheck);
  }
  function MDMAFunc() {
    setMDMACheck(!isMDMACheck);
    writeData("/" + MASTERID + "/substancePrefs/MDMA", !isMDMACheck);
  }
  function methFunc() {
    setMethCheck(!isMethCheck);
    writeData("/" + MASTERID + "/substancePrefs/Meth", !isMethCheck);
  }
  function nicFunc() {
    setNicCheck(!isNicCheck);
    writeData("/" + MASTERID + "/substancePrefs/Nicotine", !isNicCheck);
  }
  function percFunc() {
    setPercCheck(!isPercCheck);
    writeData("/" + MASTERID + "/substancePrefs/Percocet", !isPercCheck);
  }
  function psiloFunc() {
    setPsiloCheck(!isPsiloCheck);
    writeData("/" + MASTERID + "/substancePrefs/Psilocybin", !isPsiloCheck);
  }
  function roidFunc() {
    setRoidCheck(!isRoidCheck);
    writeData(
      "/" + MASTERID + "/substancePrefs/Steroid (Anabolic)",
      !isRoidCheck
    );
  }

  return (
    <View style={styles.container}>
      <Stack fill center spacing={5} direction="column">
        <View style={styles.row}>
          <Text style={styles.title}>Alcohol</Text>
          <Checkbox
            style={styles.checkbox}
            value={isAlcCheck}
            onValueChange={alcFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Adderall</Text>
          <Checkbox
            style={styles.checkbox}
            value={isAdderallCheck}
            onValueChange={adderallFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Benzos</Text>
          <Checkbox
            style={styles.checkbox}
            value={isBenzosCheck}
            onValueChange={benzosFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Cannabis</Text>
          <Checkbox
            style={styles.checkbox}
            value={isCannabisCheck}
            onValueChange={cannabisFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Cocaine</Text>
          <Checkbox
            style={styles.checkbox}
            value={isCocaineCheck}
            onValueChange={cokeFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Ibuprofen</Text>
          <Checkbox
            style={styles.checkbox}
            value={isIbuCheck}
            onValueChange={ibuFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Ketamine</Text>
          <Checkbox
            style={styles.checkbox}
            value={isKetCheck}
            onValueChange={ketFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Kratom</Text>
          <Checkbox
            style={styles.checkbox}
            value={isKratomCheck}
            onValueChange={KratomFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>LSD</Text>
          <Checkbox
            style={styles.checkbox}
            value={isLSDCheck}
            onValueChange={LSDFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>MDMA</Text>
          <Checkbox
            style={styles.checkbox}
            value={isMDMACheck}
            onValueChange={MDMAFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Meth</Text>
          <Checkbox
            style={styles.checkbox}
            value={isMethCheck}
            onValueChange={methFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Nicotine</Text>
          <Checkbox
            style={styles.checkbox}
            value={isNicCheck}
            onValueChange={nicFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Percocets</Text>
          <Checkbox
            style={styles.checkbox}
            value={isPercCheck}
            onValueChange={percFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Psilocybin</Text>
          <Checkbox
            style={styles.checkbox}
            value={isPsiloCheck}
            onValueChange={psiloFunc}
          ></Checkbox>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Steroids</Text>
          <Checkbox
            style={styles.checkbox}
            value={isRoidCheck}
            onValueChange={roidFunc}
          ></Checkbox>
        </View>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  scrollArea: {
    backgroundColor: "white",
    minHeight: 210,
    minWidth: 400,
    borderWidth: 2,
    borderColor: "transparent",
    marginHorizontal: 6,
    marginVertical: 7,
  },
});
