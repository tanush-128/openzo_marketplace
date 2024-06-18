'use client'
// import useFcmToken from "@/utils/hooks/useFCMToken";
import { getMessaging, onMessage } from 'firebase/messaging';
// import firebaseApp from '../firebase/firebase';
import { useEffect } from 'react';
import firebaseApp from '~/app/firebase';
import useSalesStore from '~/providers/salesStore';
import useFcmToken from '~/providers/useFCMToken';

export default function FcmTokenComp() {
  const { token, notificationPermissionStatus } = useFcmToken();
  const updateOrderStatus = useSalesStore((state) => state.updateOrderStatus)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Foreground push notification received:', payload);
            if (payload.data)
                if (payload.data.order_id && payload.data.status)
                    updateOrderStatus(payload.data.order_id, payload.data.status);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
}