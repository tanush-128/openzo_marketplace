// components/BottomNavBar.tsx
"use client";

import { useEffect } from "react";
import { handleUserData } from "~/lib/user_util";
import useSalesStore from "~/providers/salesStore";

const LoginAndLoadOrders = () => {
  const fetchOrders = useSalesStore((state) => state.fetchOrders);
  useEffect(() => {
    const initializeUserData = async () => {
      try {
        // handleUserData(null);
        await handleUserData().then((data) => {
          console.log(data);
          fetchOrders();
        });
      } catch (error) {
        console.error("Error initializing user data:", error);
      }
    };

    initializeUserData().then();
  }, []);

  return <div></div>;
};

export default LoginAndLoadOrders;
