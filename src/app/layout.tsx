import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import { Metadata, Viewport } from "next";
import BottomNavBar from "~/components/bottomNavBar";
import PWAInstallPrompt from "~/components/PWAInstallPrompt";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Openzo",
    template: "%s | Openzo"
  },
  description: "Marketplace for locality",
  manifest: "/manifest.json",

  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">


      <body className={`overflow-x-hidden w-full max-w-lg mx-auto ${poppins.className} `}>
        <div className="mb-12">
        {children}

        </div>
          <PWAInstallPrompt />
      <BottomNavBar  />
      
      </body>
   
    </html>
  );
}
