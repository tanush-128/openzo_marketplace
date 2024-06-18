// components/PWAInstallPrompt.tsx
"use client";
import { X } from 'lucide-react';
import usePWAInstallPrompt from '../hooks/usePWAInstallPrompt';

const PWAInstallPrompt = () => {
  const { isInstallPromptVisible, showInstallPrompt, setInstallPromptVisible } = usePWAInstallPrompt();

  if (!isInstallPromptVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-16 right-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg z-50">
      <p className="mb-2">Install our app for a better experience.</p>
    

      <button
        onClick={showInstallPrompt}
        className="px-4 py-2 bg-white text-blue-600 rounded-lg"
        >
        Install
      </button >
 
              <button className='absolute right-4 bottom-4' onClick={
                     () =>{
                          setInstallPromptVisible(false);
                          localStorage.setItem('pwaPromptDismissed', 'true');

                     }               
              }>
        {/* <img src="/assets/icons/close.svg" alt="Close" /> */}
        <X  />
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
