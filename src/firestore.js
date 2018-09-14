import * as firebase from 'firebase/app';
import 'firebase/firestore';




const config = {
  apiKey: "AIzaSyDeSjVLasCiUsKwC1TPWsTjKvhz-FSQkCY",
  authDomain: "week-planner-b8136.firebaseapp.com",
  databaseURL: "https://week-planner-b8136.firebaseio.com",
  projectId: "week-planner-b8136",
  storageBucket: "week-planner-b8136.appspot.com",
  messagingSenderId: "319543449843"
};
firebase.initializeApp(config);
export default firebase;