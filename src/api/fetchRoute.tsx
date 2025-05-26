const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

export const fetchRoute = async (
  profile: string,
  coordinates: number[][],
  length: number,
  numberOfWaypoints: number,
) => {
  const url = `https://api.openrouteservice.org/v2/directions/${profile}/geojson`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: ORS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates: coordinates,
      options: {
        round_trip: {
          length: length,
          points: numberOfWaypoints,
          seed: Math.floor(Math.random() * 1000),
        },
      },
    }),
  });
  return response.json();
};
