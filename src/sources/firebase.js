import * as firebase from 'firebase/app';
import 'firebase/firestore';

let config = {
  apiKey: 'PUT_YOUR_API_KEY_HERE',
  authDomain: 'week-planner-dev.firebaseapp.com',
  databaseURL: 'https://week-planner-dev.firebaseio.com',
  projectId: 'week-planner-dev',
  storageBucket: 'week-planner-dev.appspot.com',
  messagingSenderId: '205542384572',
};

if (process.env.NODE_ENV === 'production') {
  config = {
    apiKey: 'PUT_YOUR_API_KEY_HERE',
    authDomain: 'week-planner-b8136.firebaseapp.com',
    databaseURL: 'https://week-planner-b8136.firebaseio.com',
    projectId: 'week-planner-b8136',
    storageBucket: 'week-planner-b8136.appspot.com',
    messagingSenderId: '319543449843',
  };
}

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
