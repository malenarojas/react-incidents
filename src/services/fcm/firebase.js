import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDNkapii0zK2_ek65HSa3O_-P5hDz9qYuQ',
  authDomain: 'crafty-shield-391119.firebaseapp.com',
  projectId: 'crafty-shield-391119',
  storageBucket: 'crafty-shield-391119.appspot.com',
  messagingSenderId: '619588656540',
  appId: '1:619588656540:web:7bedcfd3606f776848bc59',
  measurementId: 'G-CLWQJ0TFGX',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
