# CS 35L Winter 23 Project

## Team Karmacoma
- Our Team Members
    - Kati Rady Pentek
    - Rama Das
    - Swetha Sethuraj
    - Abril Aguilar Lopez

## Overview 
- Our goal is to provide a simple way for users to track their intake of varying substances
- We prioritized an easy to use application that neither shames users for their intake, nor ecourages their intake
- We used React Native as the framework of our application in order to run it on ios devices\
- Our backend is uses firebase framework with a simple tree that maps users to a timestamped calendar tree of substance logs

## Installation
- To install the app, follow these commands

- First clone the source code from our github repository
```
git clone git@github.com:katirp/35L-TrackerApp.git
```
- Then move into the directory with:
```
cd 35L-TrackerApp
```

## Running the program
- To run the program, follow these commands

- Make sure you have Node.js installed
    - [or download here](https://nodejs.org/en/download/)
- Next, you will need to have expo-cli installed 
- To install expo-cli:
```
npm install expo-cli
```
- or for yarn installation:
```
yarn add expo-cli
```
- Finally, the app can be ran by the following command:
```
npx expo start
```
- Troubleshotting
    - This command should work on a windows 10 machine
    - Mac or Linux might require `sudo`, so try `sudo npx expo start`

- If on windows, to open the app on ios, you will be presented with qr code
    - make sure you have Expo Go downloaded from the app store
    - scan the rq code in the terminal
    - click the link and allow the js to download
    - also note that the app is built for lightmode on ios

- If on Mac, 
    - make sure you have Xcode installed 
    - set your desired device as the default emulator 
    - after running 'npm start' in the terminal, press 'i' to run the app on the emulator on your local device.
    - Expo Go can also be used 

## Using the application
- The user will first be presented with an authentification screen, there is the option to sign up with a new account, or sign into an existing account
    - Sign Up
        - To Sign Up, simply press the sign up button and type a unique username and password, if the username is already in use it will prompt for a different name, upon successful sign up the user will then see the rest of the app
    - Sign In
        - To sign in, simply input the username ans password that were created previously, is either are wrong it will prompt for the user to try again. Upon successful sign in, the user will see the rest of the app
        
- At the bottom off the screen there will be a bar to switch betweent the 4 main pages
    - Log
        - This page allows users to log the substances they took and send it to the database
        - There are total 18 substances for the user to choose from
        - Users can log more than one substance taken in a single log instance
    - Analysis
        - The analysis page allows users to see the most current log time for each substance
        - For example, if in a day, there were two logs of Benzos, the most recent time will be displayed
    - Calendar
        - The calendar page allows users to check the total substance logs for any given day
        - Upon the user selecting a day from the calendar component, the box at the bottom of the screen will display the sum of each substance taken that day
        - If there were no logs on that day, or if the day is in the future, the log display box will say "no logs for the selected day"
    - Search
        - The search page allows users to find more information about the substances 
        - This includes other names or brands, for example antidepressants include Lexapro and Prozac, or LSD is also called acid
        - Each substance also has a link for additional safety information via a link to the National Institute on Drug Abuse website, which lists possible health effects and treatment options
        
- More features
    - On the calendar page, there is a button at the top that allows users to check if any of their sustance intakes for the current day are above the reccomemded safe amount. This feature is implemented by reading the logs of the current day from firebase, summing them, and comparing it to a threshold.

## Credits
- Our master repository can be found here on [GitHub](https://github.com/katirp/35L-TrackerApp)

#### Contact Information and Githubs
- Kati Rady Pentek 
    - email: katiradypentek@g.ucla.edu
    - github: @katirp
- Rama Das
    - email: ramadas@g.ucla.edu
    - github: @ramafications
- Swetha Sethuraj
    - email: swethaxsethuraj@gmail.com
    - github: @ssethu1886
- Abril Aguilar Lopez
    - email: abril124@ucla.edu
    - github: @abril-AL
