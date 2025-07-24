import { useEffect, useState } from "react";

export const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocation({
          latitude,
          longitude,
        });
        setError(null);
      },
      () => {
        setError("위치를 불러오지 못했습니다.");
      }
    );
  }, []);

  return { ...location, error };
};
