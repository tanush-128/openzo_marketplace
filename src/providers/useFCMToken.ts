'use client'
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '~/app/firebase';
// import firebaseApp from '../firebase/firebase';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey:  "BHzgZo-lzEEwrFLvfeuYEYmqqIa8GmzclbCsFJPMue-GTHYouOlwsb5UcsgKxgYrYFzf3Q62WhPPBtU9g9oPsBA",
              serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js')
              // Replace with your Firebase project's VAPID key
            });
            if (currentToken) {
              setToken(currentToken);
              localStorage.setItem('fcmToken', currentToken);
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }

        }
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;