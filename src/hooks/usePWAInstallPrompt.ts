// hooks/usePWAInstallPrompt.ts

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
interface PWAInstallPrompt {
  isInstallPromptVisible: boolean;
  promptEvent: BeforeInstallPromptEvent | null;
  showInstallPrompt: () => void;
    setInstallPromptVisible: (visible: boolean) => void;

}

const usePWAInstallPrompt = (): PWAInstallPrompt => {
  const [isInstallPromptVisible, setInstallPromptVisible] = useState(false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect( () => {
    // Check if app is installed or prompt has been dismissed before
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const hasDismissedPrompt =  localStorage.getItem('pwaPromptDismissed') === 'true';

    if (isStandalone || hasDismissedPrompt) {
      return;
    }

    const handler = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setPromptEvent(event);
      setInstallPromptVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
    };
  }, []);

  const showInstallPrompt = () => {
    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult) => {
        setInstallPromptVisible(false);
        if (choiceResult.outcome === 'dismissed') {
          // Store dismissal state
          localStorage.setItem('pwaPromptDismissed', 'true');
        }
      });
    }
  };

  return {
    isInstallPromptVisible,
    promptEvent,
    showInstallPrompt,
    setInstallPromptVisible,
  };
};

export default usePWAInstallPrompt;



// interface PWAInstallPrompt {
//   isInstallPromptVisible: boolean;
//   promptEvent: BeforeInstallPromptEvent | null;
//   showInstallPrompt: () => void;
//     setInstallPromptVisible: (visible: boolean) => void;    
// }

// const usePWAInstallPrompt = (): PWAInstallPrompt => {
//   const [isInstallPromptVisible, setInstallPromptVisible] = useState(false);
//   const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

//   useEffect(() => {
//     const handler = (event: BeforeInstallPromptEvent) => {
//       event.preventDefault();
//       setPromptEvent(event);
//       setInstallPromptVisible(true);
//     };

//     window.addEventListener('beforeinstallprompt', handler);

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handler);
//     };
//   }, []);

//   const showInstallPrompt = () => {
//     if (promptEvent) {
//       promptEvent.prompt();
//       promptEvent.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the PWA install prompt');
//         } else {
//           console.log('User dismissed the PWA install prompt');
//         }
//         setInstallPromptVisible(false);
//       });
//     }
//   };

//   return {
//     isInstallPromptVisible,
//     promptEvent,
//     showInstallPrompt,
//     setInstallPromptVisible,
//   };
// };

// export default usePWAInstallPrompt;
