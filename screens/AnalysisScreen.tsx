import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { RootTabScreenProps } from "../types";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Checkingalc, styles2 } from "../components/checks";
import { calReadData } from "./firebase";
import { MASTERID } from "../constants/userInfo";
import { getDaysLogs, addSubstances } from "./TabTwoScreen";
var Datab = {};
var Hoepls = {};
var snoop = {};

const allDrugList = new Map();

const Alc = new Map();
Alc.set("timespan", 1);
Alc.set("quantity", 1);
Alc.set("time", "2023-03-17T10:10:15");

const Weed = new Map();
Weed.set("timespan", 3);
Weed.set("quantity", 1);
Weed.set("time", "2023-03-17T10:10:15");

const LSD = new Map();
LSD.set("timespan", 12);
LSD.set("quantity", 1);
LSD.set("time", "2023-03-15T21:43:50");

const Shrooms = new Map();
Shrooms.set("timespan", 6);
Shrooms.set("quantity", 0);
Shrooms.set("time", "2023-03-13T11:43:50");

const antidepressants = new Map();
antidepressants.set("timespan", 24);
antidepressants.set("quantity", 0);
antidepressants.set("time", "2023-03-13T11:43:50");

const anxietyMedications = new Map();
anxietyMedications.set("timespan", 24);
anxietyMedications.set("quantity", 0);
anxietyMedications.set("time", "2023-03-13T11:43:50");

const benzos = new Map();
benzos.set("timespan", 2);
benzos.set("quantity", 1);
benzos.set("time", "2023-03-17T10:10:15");

const coke = new Map();
coke.set("timespan", 0.25);
coke.set("quantity", 1);
coke.set("time", "2023-03-17T10:10:15");

const heroine = new Map();
heroine.set("timespan", 0.5);
heroine.set("quantity", 0);
heroine.set("time", "2023-03-13T11:43:50");

const ketamine = new Map();
ketamine.set("timespan", 0.5);
ketamine.set("quantity", 0);
ketamine.set("time", "2023-03-13T11:43:50");

const kratom = new Map();
kratom.set("timespan", 3);
kratom.set("quantity", 0);
kratom.set("time", "2023-03-13T11:43:50");

const molly = new Map();
molly.set("timespan", 6);
molly.set("quantity", 0);
molly.set("time", "2023-03-13T11:43:50");

const crystalMeth = new Map();
crystalMeth.set("timespan", 8);
crystalMeth.set("quantity", 0);
crystalMeth.set("time", "2023-03-13T11:43:50");

const painReli = new Map();
painReli.set("timespan", 5);
painReli.set("quantity", 0);
painReli.set("time", "2023-03-13T11:43:50");

const perccs = new Map();
perccs.set("timespan", 5);
perccs.set("quantity", 0);
perccs.set("time", "2023-03-13T11:43:50");

const anabolicSteriods = new Map();
anabolicSteriods.set("timespan", 5);
anabolicSteriods.set("quantity", 0);
anabolicSteriods.set("time", "2023-03-13T11:43:50");

const nic = new Map();
nic.set("timespan", 0.5);
nic.set("quantity", 0);
nic.set("time", "2023-03-13T11:43:50");

allDrugList.set("Alcohol", Alc);
allDrugList.set("Cannabis", Weed);
allDrugList.set("LSD", LSD);
allDrugList.set("Psilocybin", Shrooms);
allDrugList.set("Antidepressants", antidepressants);
allDrugList.set("Anxiety Medications", anxietyMedications);
allDrugList.set("Benzos", benzos);
allDrugList.set("Cocaine", coke);
allDrugList.set("Heroine", heroine);
allDrugList.set("Ketamine", ketamine);
allDrugList.set("Kratom", kratom);
allDrugList.set("MDMA", molly);
allDrugList.set("Meth", crystalMeth);
allDrugList.set("Pain Relievers", painReli);
allDrugList.set("Percocets", perccs);
allDrugList.set("Anabolic Steriods", anabolicSteriods);
allDrugList.set("Nicotine", nic);

export function TimingCheck({
  endTime,
  currTime,
}: {
  endTime: string;
  currTime: string;
}) {
  return moment(endTime).isAfter(currTime);
}

export function QuanCheck({ num }: { num: number }) {
  return num > 0;
}

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const currY = moment().format("YYYY");
  const currM = moment().format("MM");
  const dayOfMonth = moment().format("DD");
  const dayBefore = moment().subtract(1, "day").format("DD");

  const userref =
    "/" + MASTERID + "/" + currY + "/" + currM + "/" + dayOfMonth + "/";

  var restamp = "hoe";
  let Timestamp: string[] = [];
  let DrName: string[] = [];
  let Quan: string[] = [];
  //for some reason it needs to try to retrieve a few times, more reliable this way
  for (var i = 0; i < 15; i++) {
    calReadData(userref).then((value) => {
      var obj = JSON.parse(value);
      Datab = obj;
      Timestamp = Object.keys(Datab);
      restamp = currY + "-" + currM + "-" + dayBefore + "T" + Timestamp[0];
      const reconfigure =
        "/" +
        MASTERID +
        "/" +
        currY +
        "/" +
        currM +
        "/" +
        dayOfMonth +
        "/" +
        Timestamp[0];
    });
  }

  let myArray: string[] = [];

  for (const [outerKey, outerValue] of allDrugList) {
    var endT = allDrugList.get(`${outerKey}`).get("time");
    var startdate = moment(endT);
    var span = allDrugList.get(`${outerKey}`).get("timespan");
    var endT2 = moment(startdate).add(span, "hours").format();
    var dispT = moment(startdate).add(span, "hours").format("LT");
    var curT = moment().format("LTS");
    if (allDrugList.get(`${outerKey}`).get("quantity") > 0) {
      if (moment(`${endT2}`).isAfter(`${moment().format()}`, "seconds"))
      myArray.push(`${dispT} ${outerKey}`);
    }
  }
  if (myArray.length === 0) {
    myArray.push("No Substances Currently in System");
  }

  //sve = String(Object.keys(addSubstances(Datab)));
  return(
    <View style={styless.container}>
    {/* <Button
        title="test"
        onPress={() => {
          console.log(JSON.stringify(Datab));
          console.log(currY);
          console.log(currM);
          console.log(dayBefore);
          console.log(Timestamp);
          console.log(restamp);
          console.log(addSubstances(Datab));
          console.log();
        }}
      ></Button> */}
    <Text style = {styless.title}>{"Current Substances"}</Text>
    {myArray.map((item, index) => (
        <Text key={index} style={styless.alc}>
        {item}
      </Text>
      ))}
    </View>
  );
}


const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  alc: {
    fontSize: 35,
    color: "white",
    textAlign: "left",
    fontFamily: "Helvetica Neue",

    justifyContent: "space-evenly",
    marginTop: 30,
  },
  time: {
    fontSize: 30,
    color: "white",
    textAlign: "right",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginTop: 30,
  },
});
