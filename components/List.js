// List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Button
} from "react-native";
import * as WebBrowser from 'expo-web-browser'

const url =["https://www.cdc.gov/alcohol/fact-sheets.htm",
            "https://my.clevelandclinic.org/health/treatments/11766-adhd-medication",
          "https://www.mind.org.uk/information-support/drugs-and-treatments/antipsychotics/taking-them-safely/",
          "https://www.mind.org.uk/information-support/drugs-and-treatments/sleeping-pills-and-minor-tranquillisers/about-sleeping-pills-and-minor-tranquillisers/",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#marijuana",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#central-nervous-system",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#cocaine",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#heroin",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#ketamine",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#kratom",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#lsd-acid",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#mdma",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#methamphetamine",
          "https://my.clevelandclinic.org/health/treatments/12058-pain-relievers",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#prescription-opioids",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#psilocybin",
          "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#steroids",
        "https://nida.nih.gov/research-topics/commonly-used-drugs-charts#tobacco" ]

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details, id}) => (
  <><View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
    <Text style={styles.details}>{id}</Text>
    <Button
      title= "Safety Info"
      color="#92EBE9"
      onPress={() => WebBrowser.openBrowserAsync(url[id-1])} />
  </View>
</>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item  name={item.name} details={item.details} id={item.id}/>;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} id={item.id}/>;
    }
    // filter of the description
    if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} id={item.id}/>;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#d9dbda"
  },
  title: {
    color: "violet",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
  details: {
    color: "white",
  }
});