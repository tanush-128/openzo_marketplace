// components/BottomNavBar.tsx
"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { handleUserData } from "~/lib/user_util";
import useSalesStore from "~/providers/salesStore";
import FcmTokenComp from "~/services/firebaseForeground";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const navItems = [
  { label: "Home", href: "/", icon: "/icons/Home.png" },
  { label: "Categories", href: "/category", icon: "/icons/Categories.png" },
  { label: "Bytes", href: "/bytes", icon: "/icons/Bytes.png" },
  { label: "Carts", href: "/cart", icon: "/icons/Bags.png" },
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: "/icons/Local marketplace.png",
  },
];

const BottomNavBar = () => {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.href === pathname);
    if (currentIndex >= 0) setSelectedIndex(currentIndex);
  }, [pathname]);

  return (
    <div
      className={
        "fixed bottom-0 mx-auto w-full max-w-lg border-t border-gray-200 bg-white py-2 " +
        poppins.className
      }
    >
      <FcmTokenComp />
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <Link key={item.label} href={item.href} passHref>
            <div
              className={`flex cursor-pointer flex-col items-center py-2 ${
                selectedIndex === index ? "text-primary" : "text-gray-500"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              {/* <span className="text-xs">{item.label}</span> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
