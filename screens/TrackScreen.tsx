import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Stack, Button } from "@react-native-material/core";
import { RootTabScreenProps } from "../types";
import { TrackButton } from "../components/TrackButton";

export default function TrackScreen({
  navigation,
}: RootTabScreenProps<"Track">) {
  return (
    <View style={styles.container}>
      <Stack fill center spacing={5} direction="column">
        <TrackButton substance="Alcohol" unit="drinks" step={1}></TrackButton>
        <TrackButton substance="Cannabis" unit="g" step={0.1}></TrackButton>
        <TrackButton substance="Nicotine" unit="g" step={0.1}></TrackButton>
        <TrackButton substance="Ibuprofen" unit="g" step={0.1}></TrackButton>
        <TrackButton substance="Psilocybin" unit="g" step={0.1}></TrackButton>
        <Button
          title="submit"
          style={{ alignSelf: "flex-end", margin: 30 }}
        ></Button>
      </Stack>
    </View>
  );
}

// const onSubmit = handleSubmit((input) => {
  
// })

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
});
