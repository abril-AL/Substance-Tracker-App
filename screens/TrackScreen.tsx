import { StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { View } from "../components/Themed";
import { Stack, Button } from "@react-native-material/core";
import { RootTabScreenProps } from "../types";
import { TrackButton } from "../components/TrackButton";
import { writeData } from "./firebase";

// const { control, handleSubmit } = useForm<SubstanceLog>({
//   defaultValues: {
//       numInDrive: '',
//       needPresentation: '',
//       needFlyers: '',
//       numFlyers: '',
//       approved: false
//   }
// })

// const onSubmit = handleSubmit((input) => {

// })

const value = (arg: any) => {
  console.log("accessing child state from parent callback: ", arg);
};

export default function TrackScreen({
  navigation,
}: RootTabScreenProps<"Track">) {
  const [alcoholCount, setAlcoholCount] = useState(0);
  const [adderallCount, setAdderallCount] = useState(0);
  const [benzosCount, setBenzosCount] = useState(0);
  const [cannabisCount, setCannabisCount] = useState(0);
  const [cocaineCount, setCocaineCount] = useState(0);
  const [ibuprofenCount, setIbuprofenCount] = useState(0);
  const [ketamineCount, setKetamineCount] = useState(0);
  const [kratomCount, setKratomCount] = useState(0);
  const [lsdCount, setLsdCount] = useState(0);
  const [mdmaCount, setMdmaCount] = useState(0);
  const [methamphetamineCount, setMethamphetamineCount] = useState(0);
  const [nicotineCount, setNicotineCount] = useState(0);
  const [percocetCount, setPercocetCount] = useState(0);
  const [psilocybinCount, setPsilocybinCount] = useState(0);
  const [steroidCount, setSteroidCount] = useState(0);

  const data = [
    {
      Name: "Alcohol",
      Unit: "oz",
      Step: 1,
      Count: alcoholCount,
      SetCount: function (amt: number) {
        setAlcoholCount(alcoholCount + amt);
      },
    },
    {
      Name: "Adderall",
      Unit: "mg",
      Step: 1,
      Count: adderallCount,
      SetCount: function (amt: number) {
        setAdderallCount(adderallCount + amt);
      },
    },
    {
      Name: "Benzos",
      Unit: "mg",
      Step: 5,
      Count: benzosCount,
      SetCount: function (amt: number) {
        setBenzosCount(benzosCount + amt);
      },
    },
    {
      Name: "Cannabis",
      Unit: "g",
      Step: 0.1,
      Count: cannabisCount,
      SetCount: function (amt: number) {
        setCannabisCount(cannabisCount + amt);
      },
    },
    {
      Name: "Cocaine",
      Unit: "mg",
      Step: 5,
      Count: cocaineCount,
      SetCount: function (amt: number) {
        setCocaineCount(cocaineCount + amt);
      },
    },
    {
      Name: "Ketamine",
      Unit: "mg",
      Step: 5,
      Count: ketamineCount,
      SetCount: function (amt: number) {
        setKetamineCount(ketamineCount + amt);
      },
    },
    {
      Name: "Kratom",
      Unit: "g",
      Step: 0.5,
      Count: kratomCount,
      SetCount: function (amt: number) {
        setKratomCount(kratomCount + amt);
      },
    },
    {
      Name: "LSD",
      Unit: "mcg",
      Step: 1,
      Count: lsdCount,
      SetCount: function (amt: number) {
        setLsdCount(lsdCount + amt);
      },
    },
    {
      Name: "MDMA",
      Unit: "mg",
      Step: 5,
      Count: mdmaCount,
      SetCount: function (amt: number) {
        setMdmaCount(mdmaCount + amt);
      },
    },
    {
      Name: "Meth",
      Unit: "mg",
      Step: 5,
      Count: methamphetamineCount,
      SetCount: function (amt: number) {
        setMethamphetamineCount(methamphetamineCount + amt);
      },
    },
    {
      Name: "Nicotine",
      Unit: "g",
      Step: 0.01,
      Count: nicotineCount,
      SetCount: function (amt: number) {
        setNicotineCount(nicotineCount + amt);
      },
    },
    {
      Name: "Ibuprofen",
      Unit: "g",
      Step: 0.1,
      Count: ibuprofenCount,
      SetCount: function (amt: number) {
        setIbuprofenCount(ibuprofenCount + amt);
      },
    },
    {
      Name: "Percocet",
      Unit: "mg",
      Step: 1,
      Count: percocetCount,
      SetCount: function (amt: number) {
        setPercocetCount(percocetCount + amt);
      },
    },
    {
      Name: "Psilocybin",
      Unit: "g",
      Step: 0.1,
      Count: psilocybinCount,
      SetCount: function (amt: number) {
        setPsilocybinCount(psilocybinCount + amt);
      },
    },
    {
      Name: "Steroid (Anabolic)",
      Unit: "mg",
      Step: 5,
      Count: steroidCount,
      SetCount: function (amt: number) {
        setSteroidCount(steroidCount + amt);
      },
    },
  ];

  const trackButtons: any = [];
  for (const item in data) {
    trackButtons.push(
      <TrackButton
        substance={data[item].Name}
        unit={data[item].Unit}
        step={data[item].Step}
        getValue={data[item].Count}
        setValue={data[item].SetCount}
      ></TrackButton>
    );
  }

  function submitData() {
    for (const item in data) {
      if (data[item].Count.toFixed(2) != "0.00") {
        //Abrils note for Kati: need to add something like '/user' as well to make it user specific
        // import {MASTERID} from '../constants/userInfo'; should give access to the userID from signing in :D
        let today = new Date();
        writeData(
          today.getFullYear() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getDate() +
            "/" +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds() +
            "/" +
            data[item].Name,
          Math.round(data[item].Count * 10) / 10
        );
        data[item].SetCount(-data[item].Count);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Stack fill center spacing={5} direction="column">
        <ScrollView style={styles.scrollArea}>{trackButtons}</ScrollView>
        <Button
          title="submit"
          style={{ alignSelf: "flex-end", margin: 30 }}
          onPress={() => {
            submitData();
          }}
        ></Button>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
