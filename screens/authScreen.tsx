import { getExistingUsers, addUser, writeData } from "./firebase";
import "firebase/auth";
import { Button, Text } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { setM } from "../constants/userInfo";
//note: have fb app imported, dont care at clients taking api config stuff
var meta: Record<string, string> = {};
getExistingUsers().then((value) => {
  meta = JSON.parse(value);
});

export function AuthScreen(authProps: any) {
  const [signingIn, setSI] = useState(true);
  if (signingIn) {
    const [uninput, setUN] = useState("");
    const [pwinput, setPW] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const alias = authProps.setAuth;
    return (
      <SafeAreaProvider>
        <Text style={styles.separator} />
        <Text style={styles.title}>Welcome! Please Sign In</Text>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Text>Username</Text>
          <TextInput
            onChangeText={(text) => setUN(text)}
            leading={(props) => <Icon name="account" {...props} />}
          />
          <Text>Password</Text>
          <TextInput onChangeText={(text) => setPW(text)} variant="outlined" />
        </Stack>
        <Button
          title="Sign In"
          style={styles.buttonRight}
          onPress={() => {
            alias(authSignIn(uninput, pwinput, setErrorMsg));
          }}
        ></Button>
        <Text style={styles.errmsg}>{errorMsg}</Text>
        <Text style={styles.separator} />
        <Text style={styles.switch}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          style={styles.buttonMid}
          onPress={() => {
            setSI(false), setErrorMsg("");
          }}
        ></Button>
      </SafeAreaProvider>
    );
  } else {
    const [uninput, setUN] = useState("");
    const [pwinput, setPW] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const alias = authProps.setAuth;
    return (
      <SafeAreaProvider>
        <Text style={styles.separator} />
        <Text style={styles.title}>Welcome! Please Sign Up</Text>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Text>Username</Text>
          <TextInput
            onChangeText={(text) => setUN(text)}
            leading={(props) => <Icon name="account" {...props} />}
          />
          <Text>Password</Text>
          <TextInput onChangeText={(text) => setPW(text)} variant="outlined" />
        </Stack>
        <Button
          title="Sign Up"
          style={styles.buttonRight}
          onPress={() => {
            alias(authSignUp(uninput, pwinput, setErrorMsg)), setPrefs(uninput);
          }}
        ></Button>
        <Text style={styles.errmsg}>{errorMsg}</Text>
        <Text style={styles.separator} />
        <Text style={styles.switch}>Already Have An Account?</Text>
        <Button
          style={styles.buttonMid}
          title="Sign In"
          onPress={() => {
            setSI(true), setErrorMsg("");
          }}
        ></Button>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonRight: {
    marginLeft: 260,
    marginRight: 17,
  },
  switch: {
    marginHorizontal: 92,
  },
  buttonMid: {
    marginHorizontal: 150,
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  title: {
    marginTop: 140,
    marginLeft: 15,
    color: "Black",
    fontSize: 29,
    position: "absolute",
  },
  separator: {
    marginVertical: 10,
    marginTop: 177,
    height: 1,
    width: "80%",
  },
  txtBox: {
    marginTop: 2,
    color: "grey",
    fontSize: 50,
  },
  errmsg: {
    color: "red",
    marginTop: 15,
    marginLeft: 70,
  },
});

function authSignIn(
  un: string,
  pw: string,
  err: React.Dispatch<React.SetStateAction<string>>
) {
  if (un == "" || pw == "") {
    err("");
    return false;
  }
  if (acctExists(un) && pwmatch(un, pw)) {
    setM(un);
    return true;
  }
  err("Wrong Username or Password");
  return false;
}

function acctExists(un: string) {
  const allUsers = Object.keys(meta);
  return allUsers.includes(un);
}
function pwmatch(un: string, pw: string) {
  return meta[un] == pw;
}

function authSignUp(
  un: string,
  pw: string,
  err: React.Dispatch<React.SetStateAction<string>>
) {
  if (un == "" || pw == "") {
    err("Please Enter a Valid Username and Password");
    return false;
  }
  if (acctExists(un)) {
    err("This username is already in use");
    return false;
  } else {
    setM(un);
    console.log("ehrm");
    addUser(un, pw);
    return false;
  }
  err("wut the... how ??");
  return false;
}

function setPrefs(uninput: string) {
  writeData("/" + uninput + "/substancePrefs/Alcohol", true);
  writeData("/" + uninput + "/substancePrefs/Adderall", true);
  writeData("/" + uninput + "/substancePrefs/Benzos", false);
  writeData("/" + uninput + "/substancePrefs/Cannabis", true);
  writeData("/" + uninput + "/substancePrefs/Cocaine", false);
  writeData("/" + uninput + "/substancePrefs/Ketamine", false);
  writeData("/" + uninput + "/substancePrefs/Kratom", false);
  writeData("/" + uninput + "/substancePrefs/LSD", false);
  writeData("/" + uninput + "/substancePrefs/MDMA", false);
  writeData("/" + uninput + "/substancePrefs/Meth", false);
  writeData("/" + uninput + "/substancePrefs/Nicotine", true);
  writeData("/" + uninput + "/substancePrefs/Ibuprofen", true);
  writeData("/" + uninput + "/substancePrefs/Percocet", false);
  writeData("/" + uninput + "/substancePrefs/Psilocybin", false);
  writeData("/" + uninput + "/substancePrefs/Steroid (Analbolic", false);
}
