const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

export const fetchRoute = async (profile: string, coordinates: number[][]) => {
  const url = `https://api.openrouteservice.org/v2/snap/${profile}/geojson`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: ORS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates: coordinates,
    }),
  });
  return response.json();
};
