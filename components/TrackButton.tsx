import { Text, Button, Flex, Spacer } from "@react-native-material/core";

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
      <Text variant="h6">{substance}</Text>
      <Spacer />
      <Button title="+" variant="outlined" onPress={() => setValue(step)} />
      <Spacer />
      <Text>
        {getValue.toFixed(2)} {unit}
      </Text>
      <Spacer />
      <Button title="-" variant="outlined" onPress={() => minus()} />
      <Spacer />
    </Flex>
  );
}
