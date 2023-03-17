import { StyleSheet } from 'react-native';
import { Text, View, ScrollView, Button } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import Day from 'react-native-calendars/src/calendar/day';
import { calReadData } from './firebase'

//TODO: import a unique id from authentification - this way it only pulls their data
import { MASTERID } from '../constants/userInfo';
//const userref = '/' + MASTERID + '/';
var calDatabase = {};

//parent function
export default function FuncScreen() {
  const [day, setDay] = useState(String(helper()));
  const userref = '/' + MASTERID + '/';

  var sessionDB = '';
  //for some reason it needs to try to retrieve a few times, more reliable this way
  for (var i = 0; i < 15; i++) {
    calReadData(userref).then((value) => {
      sessionDB = value;
      var obj = (JSON.parse(sessionDB));
      sessionDB = obj;
      calDatabase = sessionDB;
    });
  }
  console.log(sessionDB);

  const CalProps = { setDay };
  const LogProps = { day };

  return (
    <View>
      <View style={styles.separator}></View>
      <Button title='test' ></Button>

      <Text style={styles.cal}>Calendar</Text>
      <CAL {...CalProps} ></CAL>

      <View style={styles.separator}></View>

      <LogDisplay {...LogProps}></LogDisplay>
    </View>
  );
}

function CAL(CalProps: any) {
  return (
    <Calendar
      style={{
        borderWidth: 2,
        borderColor: 'purple',
        height: 360,
        marginLeft: 3,
        marginRight: 3,
      }}
      theme={{
        selectedDayTextColor: 'purple',
        todayTextColor: 'purple',
        dayTextColor: 'grey',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        arrowColor: 'purple',
        selectedDotColor: 'red',
        indicatorColor: 'blue',
      }}
      onDayPress={day => { CalProps.setDay(day.dateString) }}
      minDate='2023-01-01'
      maxDate='2025-01-31'
      hideExtraDays={true}
      enableSwipeMonths={true}
    ></Calendar>
  )
}

function LogDisplay(LogDisplay: any) {
  return (
    <View>
      <Text style={styles.log}> Logs For {getDayString(LogDisplay.day)} </Text>
      <Text style={styles.container}></Text>
      <Text style={styles.container}></Text>
      <View style={styles.container}>
        <ScrollView style={styles.scrollArea}>
          <Text style={styles.txtBox}>
            {getLogsv2(LogDisplay.day, calDatabase)}
          </Text>
        </ScrollView>
      </View>
    </View >
  );
}

function helper() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  console.log(date);
  var addzeroDate = '';
  if (date < 10)
    addzeroDate = '0';
  var addZeroMonth = '';
  if (month < 10)
    addZeroMonth = '0';
  //console.log(year + '-' + addZeroMonth + month + '-' + addzeroDate + date);
  return (year + '-' + addZeroMonth + month + '-' + addzeroDate + date);
}
const units: { [key: string]: string } = {
  'Alcohol': 'oz',
  'Adderal': 'mg',
  'Benzos': 'mg',
  'Cannabis': 'g',
  'Cocaine': 'mg',
  'Ketamine': 'mg',
  'Kratom': 'g',
  'LSD': 'mcg',
  'MDMA': 'mg',
  'Meth': 'mg',
  'Nicotine': 'g',
  'Ibuprofen': 'g',
  'Percocet': 'mg',
  'Psilocybin': 'g',
  'Steroid (Anabolic': 'mg',
};
function getUnit(s: string): string {
  if (units[s]) {
    return units[s];
  } else {
    return '';
  }
}
const numberWords = [
  "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th",
  "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"
];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function getDayString(day: string) {
  //YYYY-MM-DD
  const components = day.split('-');
  const M = parseInt(components[1]);
  const D = parseInt(components[2]);
  return (months[M - 1] + ' ' + numberWords[D - 1]);
}

function getLogsv2(date: string, db: any) {
  var dayslogs = getDaysLogs(date, calDatabase);
  const totals = addSubstances(dayslogs);
  const ret = getSumStr(totals);
  //TODO: add units, can do later
  console.log(ret);
  if (ret == '')
    return ("No data for the selected date");
  return ret;
}

//these are all the helper functions for getLogsv2 - v2 just uses the firebase data entries instead of dummy data
export function getDaysLogs(dateString: string, dict_obj: Record<string, any>) {
  const dateArray = dateString.split('-');
  let level: Record<string, any> = dict_obj;

  for (let i = 0; i < dateArray.length; i++) {
    const key = dateArray[i];
    if (level.hasOwnProperty(key)) {
      level = level[key];
    } else {
      return {};
    }
  }
  return level;
}
export function addSubstances(dict: Record<string, Record<string, string>>) {
  const totals: Record<string, number> = {};
  if (dict == null) {
    return {};
  }
  for (const time of Object.keys(dict)) {
    const substances = dict[time];

    for (const [substance, amount] of Object.entries(substances)) {
      if (totals[substance] === undefined) {
        totals[substance] = Number(amount);
      } else {
        totals[substance] += Number(amount);
      }
    }
  }
  return totals;
}
function getSumStr(sub_dict: any) {
  if (sub_dict != null) {
    var ret = '';
    const subKeys = Object.keys(sub_dict);
    for (let i = 0; i < subKeys.length; i++) {
      const key = subKeys[i];
      ret += '  ' + key + ': ' + sub_dict[key] + '\n';
    }
    return (ret);
  }
  else {
    return ("No data for the selected date");
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'grey',
    fontSize: 35,
  },
  //style for the bottom, mainly just want a smaller font
  log: {
    color: "grey",
    justifyContent: 'center',
    fontSize: 25,
  },
  logBox: {
    backgroundColor: 'grey',
    borderWidth: 2,
    borderColor: 'pink',
    marginHorizontal: 6,
    marginVertical: 7,
  },
  scrollArea: {
    backgroundColor: 'white',
    minHeight: 210,
    minWidth: 400,
    borderWidth: 2,
    borderColor: 'purple',
    marginHorizontal: 6,
    marginVertical: 7,
  },
  txtBox: {
    marginTop: 2,
    color: 'grey',
    fontSize: 20,
    //fontFamily: 'Serif',
  }
});

//////old stuff - keeping for reference

//{getLogs(LogDisplay.day)}
//<Button title='testdb' onPress={() => { console.log(getLogsv2('2023-03-08', calDatabase)) }}></Button>

//old function for getting fake data
function getLogs(day: string) {

  const components = (String(day)).split('-');
  const Y = components[0];
  const M = components[1];
  const D = components[2];
  if (DATA[Y] && DATA[Y][M] && DATA[Y][M][D]) {
    var ret = '  ';
    const subDict = DATA[Y][M][D];
    const subKeys = Object.keys(subDict);

    for (let i = 0; i < subKeys.length; i++) {
      const key = subKeys[i];
      ret += key + ': ' + DATA[Y][M][D][key] + ' ' + getUnit(key) + '\n  ';
    }
    return (ret);
  }
  else {
    return ("No data for the selected date");
  }
}
// Dummy data set for testing display - year->month->day->substances
type Substance = Record<string, number>; type Day = Record<string, Substance>;
type Month = Record<string, Day>; type Year = Record<string, Month>;
const DATA: Year = {
  '2023': {
    '01': { '05': { 'MDMA': 2 }, '06': { 'Alcohol': 12 } },
    '02': {},
    '03': {
      '01': { 'Cannabis': 1 }, '02': { 'Cannabis': 2 }, '03': { 'Alcohol': 4, 'Cannabis': 1 },
      '04': { 'Alcohol': 4, 'Xanax': 1 }, '05': { 'MDMA': 2 }, '06': { 'Alcohol': 12 }
    },
    '04': {},
    '05': {},
  },
  '2024': {},
};

//i just never ended up using these 2 functions
function getDatRef(s: string) {
  const components = s.split('-');
  const Y = components[0];
  const M = components[1];
  const D = components[2];
  return '/' + Y + '/' + M + '/' + D;
}
function fixJSON(str: string) {
  // Remove any backslashes
  str = str.replace(/\\/g, '');
  // Remove quotes around property names
  str = str.replace(/"([^"]+)":/g, '$1:');
  // Replace single quotes with double quotes
  str = str.replace(/'/g, '"');
  // Parse the string as JSON
  return JSON.parse(str);//recall alter: go to ['_z']
}
