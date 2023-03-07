import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPwu9ySQTCTeavCmdC0vb6deAlpAJitN4",
  authDomain: "cs35l-tracker-app.firebaseapp.com",
  projectId: "cs35l-tracker-app",
  storageBucket: "cs35l-tracker-app.appspot.com",
  messagingSenderId: "814224832456",
  appId: "1:814224832456:web:41bd44dcdd83690f5cf2fd",
  measurementId: "G-S77LBBWY57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

//function to read firebase data
export async function readData(table: string) {
  const data = ref(database, table);
  try {
    const snapshot = await get(data);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

//function to write firebase data
export function writeData(table: string, key_data: Object) {
  set(ref(database, table), key_data);
}
