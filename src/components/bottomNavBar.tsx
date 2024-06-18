// components/BottomNavBar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { getLocation } from '../services/LocationService';
import UserService from '~/models/user_data';
import useSalesStore from '~/providers/salesStore';
import { stat } from 'fs';
import FcmTokenComp from '~/services/firebaseForeground';
// import UserService from '../services/UserData';
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const navItems = [
  { label: 'Home', href: '/', icon: '/icons/Home.png' },
  { label: 'Categories', href: '/category', icon: '/icons/Categories.png' },
  { label: 'Bytes', href: '/bytes', icon: '/icons/Bytes.png' },
  { label: 'Carts', href: '/cart', icon: '/icons/Bags.png' },
  { label: 'Profile', href: '/profile', icon: '/icons/Local marketplace.png' },
];

const BottomNavBar = () => {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);
   const fetchOrders =  useSalesStore((state) =>state.fetchOrders )
    useEffect(() => {
    const initializeUserData = async () => {
      try {
        const fcmToken = localStorage.getItem('fcmToken');
        let userDataId = localStorage.getItem('user_data_id');
        console.log('fcmToken:', fcmToken);
        console.log('userDataId:', userDataId);
        // const user = await handleUserLogin();
        
        if (!userDataId) {
          const position = await getLocation();
          if (!position) return;
          
          const userData = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
            notificationToken: fcmToken || '',
            // userId: user.id,
          };
          const createdUserData = await UserService.createUserData(userData);
          if (createdUserData) {
            localStorage.setItem('user_data_id', createdUserData.id);
          }
        } else {
          const userData = await UserService.getUserData(userDataId);
          if (userData.notificationToken !== fcmToken ) {
            userData.notificationToken = fcmToken || '';
            // userData.userId = user.id;
            await UserService.updateUserData(userData);
          }
        }
        fetchOrders();
      } catch (error) {
        console.error('Error initializing user data:', error);
      }
    };

    initializeUserData().then(

    );
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.href === pathname);
    if (currentIndex >= 0) setSelectedIndex(currentIndex);
  }, [pathname]);

  return (
    <div className={"fixed bottom-0 w-full max-w-lg mx-auto bg-white border-t border-gray-200 " +poppins.className }>
        <FcmTokenComp/>
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <Link key={item.label} href={item.href} passHref>
            <div
              className={`flex flex-col items-center py-2 cursor-pointer ${
                selectedIndex === index ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              <span className="text-xs">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
