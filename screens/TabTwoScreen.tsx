import { StyleSheet } from 'react-native';
import { Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { calReadData } from './firebase'
import { MASTERID } from '../constants/userInfo';
var calDatabase = {};

//parent function
export default function FuncScreen() {
  const [day, setDay] = useState(String(helper()));
  const userref = '/' + MASTERID + '/';

  var sessionDB = '';//string representation of DB
  //for some reason it needs to try to retrieve a few times, more reliable this way
  for (var i = 0; i < 15; i++) {
    calReadData(userref).then((value) => {
      sessionDB = value;
      var obj = (JSON.parse(sessionDB));
      calDatabase = obj;
    });
  }
  const CalProps = { setDay };
  const LogProps = { day };
  return (
    <View style={styles.bck}>
      <View style={styles.separator}></View>

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
      <View style={styles.container} />
    </View >
  );
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
  const components = day.split('-');
  const M = parseInt(components[1]);
  const D = parseInt(components[2]);
  return (months[M - 1] + ' ' + numberWords[D - 1]);
}

function getLogsv2(date: string, db: any) {
  var dayslogs = getDaysLogs(date, calDatabase);
  const totals = addSubstances(dayslogs);
  const ret = getSumStr(totals);
  console.log(ret);
  if (ret == '')
    return ("No data for the selected date");
  return ret;
}

//these are all the helper functions for getLogsv2 - v2 just uses the firebase data entries instead of dummy data
function getDaysLogs(dateString: string, dict_obj: Record<string, any>) {
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
function addSubstances(dict: Record<string, Record<string, string>>) {
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
      const unit = getUnit(key);
      ret += '  ' + key + ': ' + sub_dict[key] + ' ' + unit + '\n';
    }
    return (ret);
  }
  else {
    return ("No data for the selected date");
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#180E3E",
  },
  title: {
    backgroundColor: "#180E3E",
    color: 'violet',
    fontSize: 35,
    position: 'absolute',
  },
  separator: {
    backgroundColor: "#180E3E",
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  //style im using for the calendar title
  cal: {
    fontWeight: "bold",
    color: 'violet',
    fontSize: 35,
  },
  //style for the bottom, mainly just want a smaller font
  log: {
    color: "violet",
    fontWeight: "bold",
    justifyContent: 'center',
    fontSize: 25,
  },
  logBox: {
    backgroundColor: "#180E3E",
    borderWidth: 2,
    borderColor: 'pink',
    marginHorizontal: 6,
    marginVertical: 7,
  },
  scrollArea: {
    backgroundColor: 'white',
    maxHeight: 230,
    minHeight: 230,
    maxWidth: 400,
    minWidth: 400,
    borderWidth: 2,
    borderColor: 'purple',
    marginHorizontal: 6,
    marginTop: -20,
  },
  txtBox: {
    marginTop: 2,
    color: 'grey',
    fontSize: 20,
    marginBottom: 10,
  },
  bck: {
    backgroundColor: "#180E3E",
  }
});
