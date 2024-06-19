importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj3OhJV4C4wn--ODhRbdPjRc7W5IiPNV4",
  authDomain: "openzo-rt.firebaseapp.com",
  projectId: "openzo-rt",
  storageBucket: "openzo-rt.appspot.com",
  messagingSenderId: "53179141705",
  appId: "1:53179141705:web:e10484bae0a6173afc3998",
  measurementId: "G-QSG3L0RN9P"
};




// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/Openzo User App final.png',
    
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});