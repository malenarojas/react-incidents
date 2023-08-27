importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyDNkapii0zK2_ek65HSa3O_-P5hDz9qYuQ',
  authDomain: 'crafty-shield-391119.firebaseapp.com',
  projectId: 'crafty-shield-391119',
  storageBucket: 'crafty-shield-391119.appspot.com',
  messagingSenderId: '619588656540',
  appId: '1:619588656540:web:7bedcfd3606f776848bc59',
  measurementId: 'G-CLWQJ0TFGX',
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log('Recibiste mensaje mientras estabas ausente');
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo_uagrm.jpg',
  };

  return self.ServiceWorkerRegistration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
