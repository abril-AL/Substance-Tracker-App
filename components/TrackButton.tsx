import {
  Stack,
  Text,
  Button,
  Flex,
  Spacer,
  TextInput,
} from "@react-native-material/core";
import { useState } from "react";

export function TrackButton({
  substance,
  unit,
  step,
}: {
  substance: string;
  unit: string;
  step: number;
}) {
  const [count, setCount] = useState(0);

  function minus() {
    if (count >= step) {
      setCount(count - step);
    }
  }

  return (
    <Flex inline={true} justify="start" self="start" >
        <Spacer/>
        <Text variant="h6">{substance}</Text>
        <Spacer/>
        <Button
          title="+"
          variant="outlined"
          onPress={() => setCount(count + step)}
        />
        <Spacer/>
        {/* <TextInput variant="outlined" label="" input="number"/> */}
        <Text>
          {count.toFixed(1)} {unit}
        </Text>
        <Spacer/>
        <Button title="-" variant="outlined" onPress={() => minus()} />
        <Spacer/>
    </Flex>
  );
}
