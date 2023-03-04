import { Alert, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { Component, useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import Colors from '../constants/Colors';

//parent function
function FuncScreen() {
  //State - selected day / currently viewing logs of, today by default
  const [day, setDay] = useState(String(helper()));

  //Props
  //Calender will setDay based on clicked day
  const CalProps = { setDay };
  //log section will read the currently selected day
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

//calendar child, passed the setDay function 
function CAL(CalProps: any) {
  return (
    <Calendar
      style={{
        borderWidth: 2,
        borderColor: 'pink',
        height: 360,
        marginLeft: 3,
        marginRight: 3,
      }}
      theme={{
        selectedDayTextColor: '#ffc0cb',
        todayTextColor: '#ffc0cb',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        arrowColor: '#ffc0cb',
        selectedDotColor: 'red',
        indicatorColor: 'blue',
      }}
      onDayPress={day => { CalProps.setDay(day.dateString) }}
      //onDayPress={day => CalProps.setDay(day)}
      minDate='2023-01-01'
      maxDate='2025-01-31'
      hideExtraDays={true}
      enableSwipeMonths={true}
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
      <Text style={styles.log}> Log Summary for {LogDisplay.day} </Text>
    </View >
  )
}

//helper function to get current day as string, mostly for initializing 'day' in default function
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
  //form YYYY-MM-DD
  return (year + '-' + addZeroMonth + month + '-' + addzeroDate + date);
}
//return the log for the passed day, returns a dictionary of info for that day
function getLogs(day: any) {
  const Y = day.substring(0, 4);
  const M = day.substring(5, 7);
  const D = day.substring(9);
  console.log(D + ',' + M + ',' + Y);
  const obj = DATA[Y][M][D];
  //TODO, return the dict at DATA[Y[M[D]]]
}

//Important, returns the screen :o
export default FuncScreen;

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
  //style im using for the calendar title
  cal: {
    color: 'white',
    fontSize: 35,
  },
  //style for the bottom, mainly just want a smaller font
  log: {
    color: "white",
    fontSize: 25,
  }
});


// Dummy data set since no backend yet
// year->month->day->substances
type Substance = Record<string, number>;
type Day = Record<string, Substance>;
type Month = Record<string, Day>;
type Year = Record<string, Month>;

const DATA: Year = {
  '2023': {
    '01': { '01': { 'mdma': 2 }, '03': { 'alcohol': 12 } },
    '02': {},
    '03': { '01': { 'Marijuana': 1 }, '02': { 'Marijuana': 2 }, '03': { 'alcohol': 4, 'Marijuana': 1 }, '04': { 'alcohol': 4, 'Xanax': 1 } },
    '04': {},
    '05': {},
  },
  '2024': {},
};
/*
// Accessing an item in January 1st, 2023
console.log(DATA['2023']['01']['01']['mdma']); // Output: 2

// Modifying an item in March 3rd, 2023
DATA['2023']['03']['03']['alcohol'] = 5;
console.log(DATA['2023']['03']['03']); // Output: { 'alcohol': 5, 'Marijuana': 1 }
*/


/*
TO DO later
  - access dictionary 
  - make it pretty
  - mark days with logs, recall cal documentation 
*/