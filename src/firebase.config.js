import 'firebase/database';
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCRR5HxF8X2yPjj2YQsbC50qHfDQJb0dE4',
  authDomain: 'chitchat-app-159f8.firebaseapp.com',
  databaseURL:
    'https://chitchat-app-159f8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chitchat-app-159f8',
  storageBucket: 'chitchat-app-159f8.appspot.com',
  messagingSenderId: '542059694019',
  appId: '1:542059694019:web:e9723e840bc4fffcb7df76',
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const realtimeDB = getDatabase();
