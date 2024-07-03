// // services/LocationService.ts

// export async function requestLocationPermission(): Promise<boolean> {
//   if (!('geolocation' in navigator)) {
//     console.error('Geolocation is not supported by your browser');
//     return false;
//   }

//   return new Promise((resolve) => {
//     navigator.permissions.query({ name: 'geolocation' }).then((result) => {
//       if (result.state === 'granted' || result.state === 'prompt') {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     });
//   });
// }

// export async function getLocation(): Promise<GeolocationPosition | null> {
//   const permissionGranted = await requestLocationPermission();

//   if (!permissionGranted) {
//     console.error('Location permission denied');
//     return null;
//   }

//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log(`Location: ${position.coords.latitude}, ${position.coords.longitude}`);
//         resolve(position);
//       },
//       (error) => {
//         console.error(`Error getting location: ${error.message}`);
//         reject(error);
//       },
//       {
//         enableHighAccuracy: true,
//       }
//     );
//   });
// }



import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Typography, Box, Backdrop, Paper } from '@mui/material';
import { createRoot } from 'react-dom/client';
// import { getPosition, checkPermission, requestPermission } from '~/services/LocationService';

interface LocationContextProps {

}

const LocationModal: React.FC<LocationContextProps> = () => {
  const [open, setOpen] = useState(true);

  const handleGrantPermission = async () => {
    const position = await getLocation();
    if (position) {
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="location-permission-modal"
      aria-describedby="location-permission-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        component={Paper}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" id="location-permission-modal" gutterBottom>
          Location permission is required for the app to work. Please grant permission.
        </Typography>
        <Button variant="contained" onClick={handleGrantPermission}>
          Grant Permission
        </Button>
      </Box>
    </Modal>
  );
};

export async function getLocation() {
  let position: GeolocationPosition | null = null;
  let granted = false;
  
console.log('Location:', position);

  while (!granted) {
    const permission = await requestLocationPermission();
    if (permission === 'granted') {
      position = await getPosition();
      console.log('Location:', position);
      granted = true; // Permission granted, exit loop
    } else {
      // Show modal to request permission again
      await new Promise<GeolocationPosition | null>((resolve) => {
        const handleClose = (pos: GeolocationPosition | null) => resolve(pos);
        // ReactDOM.render(<LocationModal />, document.getElementById('root'));
        const container = document.getElementById('root');
        if (container) {
        createRoot(container).render(<LocationModal />);
        // root.render(<LocationModal />);
        }


        

      });
      granted = position !== null;
    }
  }
  return position;
}

async function requestLocationPermission() {
  let permission = await checkPermission();
  if (permission === 'prompt') {
    permission = await requestPermission();
  }
  return permission;
}

// Assuming LocationService.ts contains functions for getting position and handling permissions.
export async function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
    });
  });
}

export async function checkPermission(): Promise<PermissionState> {
  const status = await navigator.permissions.query({ name: 'geolocation' });
  console.log('Permission:', status.state);
  return status.state;
}

export async function requestPermission(): Promise<PermissionState> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      () => resolve('granted'),
      () => resolve('denied')
    );
  });
}
