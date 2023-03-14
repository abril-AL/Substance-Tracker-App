import React, { useState, useEffect, Component} from "react";
import { 
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import List from "../components/List";
import SearchBar from "../components/SearchBar";
import * as WebBrowser from 'expo-web-browser'

//export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) 
const SearchScreen = ({ navigation }: RootTabScreenProps<'Search'>) =>{
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

   // get data from the fake api endpoint
   useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/ssethu1886/SearchBarTutorial/substances"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  return (

    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Substances</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {  (
        <List
        searchPhrase={searchPhrase}
        data={fakeData}
        setClicked={setClicked}
      />

  )}
</SafeAreaView>
);
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});


