import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDBUkemQfN255YnhDOgz-849amDRz_xgnQ",
  authDomain: "todoist-f16b5.firebaseapp.com",
  projectId: "todoist-f16b5",
  storageBucket: "todoist-f16b5.appspot.com",
  messagingSenderId: "1070382793997",
  appId: "1:1070382793997:web:e480e21b86a601b9151c44"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebaseConfig as firebase}
