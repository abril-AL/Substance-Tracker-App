import { Alert, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Component, useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import Colors from '../constants/Colors';

//parent function
function FuncScreen() {

  const [day, setDay] = useState(String(helper()));


  const CalProps = { setDay };
  const LogProps = { day };

  return (
    <View>
      <View style={styles.separator}></View>

      <Text style={styles.cal}>Calendar</Text>
      <CAL {...CalProps} ></CAL>

      <View style={styles.separator}></View>
      <View style={styles.separator}></View>

      <LogDisplay {...LogProps}></LogDisplay>
    </View>
  );
}

//calendar child, passed the setDay funtion 
function CAL(CalProps: any) {
  return (
    <Calendar
      style={{
        borderWidth: 3,
        borderColor: 'pink',
        height: 360,
        marginLeft: 3,
        marginRight: 3,
      }}
      onDayPress={day => { CalProps.setDay(day.dateString) }}
      //onDayPress={day => CalProps.setDay(day)}
      minDate='2023-01-01'
      maxDate='2025-01-31'
      hideExtraDays={true}
    ></Calendar>
  )
}
//log display child, passed the day value
function LogDisplay(LogDisplay: any) {
  const DAY = LogDisplay.day;
  //Alert.alert(DAY);
  //console.log(DAY);
  return (
    <View>
      <Text style={styles.log}> Log Summary for: {LogDisplay.day} </Text>
    </View >
  )
}

function helper() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var addzeroDate = '';
  if (date < 10)
    addzeroDate = '0';
  var addZeroMonth = '';
  if (month < 10)
    addZeroMonth = '0';
  return (year + '-' + addZeroMonth + month + '-' + addzeroDate + date);
}

export default FuncScreen;
//export default SCREEN;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 35,
    position: 'absolute',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  cal: {
    color: 'white',
    fontSize: 35,
  },
  log: {
    color: "white",
    fontSize: 25,
  }
});
