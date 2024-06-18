// services/LocationService.ts

export async function requestLocationPermission(): Promise<boolean> {
  if (!('geolocation' in navigator)) {
    console.error('Geolocation is not supported by your browser');
    return false;
  }

  return new Promise((resolve) => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export async function getLocation(): Promise<GeolocationPosition | null> {
  const permissionGranted = await requestLocationPermission();

  if (!permissionGranted) {
    console.error('Location permission denied');
    return null;
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(`Location: ${position.coords.latitude}, ${position.coords.longitude}`);
        resolve(position);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
        reject(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  });
}
