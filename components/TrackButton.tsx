import { Text, Button, Flex, Spacer } from "@react-native-material/core";
import React from "react";
import { StyleSheet, View} from "react-native";

export function TrackButton({
  substance,
  unit,
  step,
  getValue,
  setValue,
}: {
  substance: string;
  unit: string;
  step: number;
  getValue: number;
  setValue: Function;
}) {
  function minus() {
    if (getValue >= step) {
      setValue(-step);
    }
  }

  return (
<Flex inline={true} justify="start" self="start">
      <Spacer />
      <Text variant="h6" style={styles.substance}>{substance}
       </Text>
      <Spacer />
      <Button title="+" variant="outlined" color="#92EBE9" onPress={() => setValue(step)} />
      <Spacer />
      <Text style={styles.unit}>
        {getValue.toFixed(2)} {unit}
      </Text>
      <Spacer />
      <Button title="-" variant="outlined" color="#92EBE9" onPress={() => minus()} />
      <Spacer />
    </Flex>

  );
}

const styles = StyleSheet.create({
  substance: {
    color: "violet",
  },

  unit: {
    color: "white",
  },
});
