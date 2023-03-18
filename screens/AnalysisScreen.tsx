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

const Alcohol = new Map();
Alcohol.set("timespan", 1);
Alcohol.set("quantity", 1);
Alcohol.set("time", "2023-03-17T10:10:15");

const Cannabis = new Map();
Cannabis.set("timespan", 3);
Cannabis.set("quantity", 1);
Cannabis.set("time", "2023-03-17T10:10:15");

const LSD = new Map();
LSD.set("timespan", 12);
LSD.set("quantity", 1);
LSD.set("time", "2023-03-15T21:43:50");

const Shrooms = new Map();
Shrooms.set("timespan", 6);
Shrooms.set("quantity", 1);
Shrooms.set("time", "2023-03-13T11:43:50");

const antidepressants = new Map();
antidepressants.set("timespan", 24);
antidepressants.set("quantity", 1);
antidepressants.set("time", "2023-03-13T11:43:50");

const anxietyMedications = new Map();
anxietyMedications.set("timespan", 24);
anxietyMedications.set("quantity", 1);
anxietyMedications.set("time", "2023-03-13T11:43:50");

const Benzos = new Map();
Benzos.set("timespan", 2);
Benzos.set("quantity", 1);
Benzos.set("time", "2023-03-17T10:10:15");

const Cocaine = new Map();
Cocaine.set("timespan", 0.25);
Cocaine.set("quantity", 1);
Cocaine.set("time", "2023-03-17T10:10:15");

const heroine = new Map();
heroine.set("timespan", 0.5);
heroine.set("quantity", 1);
heroine.set("time", "2023-03-13T11:43:50");

const Ketamine = new Map();
Ketamine.set("timespan", 0.5);
Ketamine.set("quantity", 1);
Ketamine.set("time", "2023-03-13T11:43:50");

const Kratom = new Map();
Kratom.set("timespan", 3);
Kratom.set("quantity", 1);
Kratom.set("time", "2023-03-13T11:43:50");

const MDMA = new Map();
MDMA.set("timespan", 6);
MDMA.set("quantity", 1);
MDMA.set("time", "2023-03-13T11:43:50");

const Meth = new Map();
Meth.set("timespan", 8);
Meth.set("quantity", 1);
Meth.set("time", "2023-03-13T11:43:50");

const painReli = new Map();
painReli.set("timespan", 5);
painReli.set("quantity", 1);
painReli.set("time", "2023-03-13T11:43:50");

const perccs = new Map();
perccs.set("timespan", 5);
perccs.set("quantity", 1);
perccs.set("time", "2023-03-13T11:43:50");

const anabolicSteriods = new Map();
anabolicSteriods.set("timespan", 5);
anabolicSteriods.set("quantity", 1);
anabolicSteriods.set("time", "2023-03-13T11:43:50");

const nic = new Map();
nic.set("timespan", 0.5);
nic.set("quantity", 1);
nic.set("time", "2023-03-13T11:43:50");

const addy = new Map();
addy.set("timespan", 4);
addy.set("quantity", 1);
addy.set("time", "2023-03-13T11:43:50");

allDrugList.set("Alcohol", Alcohol);
allDrugList.set("Cannabis", Cannabis);
allDrugList.set("LSD", LSD);
allDrugList.set("Psilocybin", Shrooms);
allDrugList.set("Antidepressants", antidepressants);
allDrugList.set("Anxiety Medications", anxietyMedications);
allDrugList.set("Benzos", Benzos);
allDrugList.set("Cocaine", Cocaine);
allDrugList.set("Heroine", heroine);
allDrugList.set("Ketamine", Ketamine);
allDrugList.set("Kratom", Kratom);
allDrugList.set("MDMA", MDMA);
allDrugList.set("Meth", Meth);
allDrugList.set("Pain Relievers", painReli);
allDrugList.set("Percocets", perccs);
allDrugList.set("Anabolic Steriods", anabolicSteriods);
allDrugList.set("Nicotine", nic);
allDrugList.set("Adderall", addy);

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

  const userref = "/" + MASTERID + "/" + currY + "/" + currM + "/" + dayOfMonth + "/";
  let restamp = "hoe";
  let restamp2 = "hoe";
  let Timestamp: string[] = [];
  let DrName: string[] = [];
  let Quan: string[] = [];
  
  // create an array of Promises for each iteration of the loop
  const promises = [];
  for (var i = 0; i < 15; i++) {
    promises.push(calReadData(userref));
  }
  var Needit = '';
  var what = '';
  // use Promise.all() to wait for all of the Promises to resolve
  var Needit = '';
  var Needit2 = '';



  Promise.all(promises).then((values) => {
    values.forEach((value) => {
      var obj = JSON.parse(value);
      Datab = obj;
      Timestamp = Object.keys(Datab);
      restamp = currY + "-" + currM + "-" + dayBefore + "T" + Timestamp[0];
      Needit = restamp;
    });
    Alcohol.set("time", Needit);
    for (var x = 0; x < Timestamp.length; x++)
    {
    what = "/" + MASTERID + "/" + currY + "/" + currM + "/" + dayOfMonth + "/" + Timestamp[x]+ "/";
    restamp2 = currY + "-" + currM + "-" + dayBefore + "T" + Timestamp[x];
    Alcohol.set("time", Needit);
    const promises2 = [];
    for (var i = 0; i < 15; i++) {
      promises2.push(calReadData(what));
    }
  
  
  
     Promise.all(promises2).then((values) => {
      values.forEach((value) => {
        var obj = JSON.parse(value);
        Hoepls = obj;
        DrName = Object.keys(Hoepls)
        if(DrName[0] == "Adderall")
        Needit2 = restamp2;
        addy.set("time", Needit2);
        if(DrName[0] == "Alcohol")
        Needit2 = restamp2;
        Alcohol.set("time", Needit2);
        if(DrName[0] == "Benzos")
        Needit2 = restamp2;
        Benzos.set("time", Needit2);
        if(DrName[0] == "Nicotine")
        Needit2 = restamp2;
        nic.set("time", Needit2);
        if(DrName[0] == "Percocets")
        Needit2 = restamp2;
        perccs.set("time", Needit2);
        if(DrName[0] == "Anabolic Steriods")
        Needit2 = restamp2;
        anabolicSteriods.set("time", Needit2);
        if(DrName[0] == "Ibuprofen")
        Needit2 = restamp2;
        painReli.set("time", Needit2);
        
        if(DrName[0] == "Psilocybin")
        Needit2 = restamp2;
        Shrooms.set("time", Needit2);
        
        if(DrName[0] == "Steroid (Anabolic")
        Needit2 = restamp2;
        anabolicSteriods.set("time", Needit2);

        if(DrName[0] == "Cannabis")
        Needit2 = restamp2;
        Cannabis.set("time", Needit2);

        if(DrName[0] == "Cocaine")
        Needit2 = restamp2;
        Cocaine.set("time", Needit2);

        if(DrName[0] == "Ketamine")
        Needit2 = restamp2;
        Ketamine.set("time", Needit2);

        if(DrName[0] == "Kratom")
        Needit2 = restamp2;
        Kratom.set("time", Needit2);
        

      });
  
    });
  }
  });



  












  
  
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
