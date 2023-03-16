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
import moment from 'moment';
import {Checkingalc, styles2} from "../components/checks"

const allDrugList = new Map();

const Alc = new Map();
Alc.set("timespan", 1);
Alc.set("quantity", 1);
Alc.set("time", "2023-03-15T20:43:50");

const Weed = new Map();
Weed.set("timespan", 3);
Weed.set("quantity", 1);
Weed.set("time", "2023-03-15T20:43:50");

const LSD = new Map();
LSD.set("timespan", 12);
LSD.set("quantity", 0);
LSD.set("time", "2023-03-13T11:43:50");

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
benzos.set("quantity", 0);
benzos.set("time", "2023-03-13T11:43:50");

const coke = new Map();
coke.set("timespan", 0.25);
coke.set("quantity", 0);
coke.set("time", "2023-03-08 08:38:00");

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
kratom.set("quantity",  0);
kratom.set("time", "2023-03-13T11:43:50");

const molly = new Map();
molly.set("timespan", 6);
molly.set("quantity" , 0);
molly.set("time", "2023-03-13T11:43:50");

const crystalMeth = new Map();
crystalMeth.set("timespan", 8);
crystalMeth.set("quantity" , 0);
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


allDrugList.set('Alcohol', Alc);
allDrugList.set('Marijuana', Weed);
allDrugList.set('LSD', LSD);
allDrugList.set('Shrooms', Shrooms);
allDrugList.set('Antidepressants', antidepressants);
allDrugList.set('Anxiety Medications', anxietyMedications);
allDrugList.set('Benzos', benzos);
allDrugList.set('Cocaine', coke);
allDrugList.set('Heroine', heroine);
allDrugList.set('Ketamine', ketamine);
allDrugList.set('Kratom', kratom);
allDrugList.set('Molly', molly);
allDrugList.set('Crystal Meth', crystalMeth);
allDrugList.set('Pain Relievers', painReli);
allDrugList.set('Percocets', perccs);
allDrugList.set('Anabolic Steriods', anabolicSteriods);
allDrugList.set('Nicotine', nic);




export function TimingCheck({
  endTime, 
  currTime
 }: {
    endTime: string;
    currTime: string;
 }) {



return (
  moment(endTime).isAfter(currTime)
  
);
}

export function QuanCheck({
  num, 
 }: {
    num: number;
 }) {



return (
  (num > 0)
  
);
}


export default function SearchScreen({ navigation }: RootTabScreenProps<"Search">) {
  let myArray: string[] = [];
  for (const [outerKey, outerValue] of allDrugList) {
      var endT = (allDrugList.get(`${outerKey}`).get("time"));
      var startdate = moment(endT);
      var span = (allDrugList.get(`${outerKey}`).get("timespan"));
      var endT2 = moment(startdate).add(span, 'hours').format();
      var dispT = moment(startdate).add(span, 'hours').format('LT');
      var curT = moment().format('LTS');
      if ((allDrugList.get(`${outerKey}`).get("quantity")) > 0)
      {
        if (moment(`${endT2}`).isAfter(`${moment().format()}`, 'seconds'))
        myArray.push(`${outerKey}`);
        myArray.push(`${dispT}`);

      }

  }
  return(
    <View style={styless.container}>
    <Text style = {styless.title}>{"Current Substances"}</Text>
    {myArray.map((item, index) => (
        <Text key={index} style={index % 2 === 0 ? styless.alc : styless.time}>
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
    fontFamily: 'Helvetica Neue',

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
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    height: 50,
  },


});
