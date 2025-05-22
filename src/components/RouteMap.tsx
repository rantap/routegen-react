import { useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Map,
  Source,
  Layer,
  NavigationControl,
  Marker,
} from 'react-map-gl/maplibre';
import type {
  LineLayerSpecification,
  MapLayerMouseEvent,
} from 'react-map-gl/maplibre';
import type { FeatureCollection } from 'geojson';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Pin from '@/assets/Pin';

const MAP_CENTER = { lon: 23.760830296, lat: 61.498164674 };

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [23.760830296, 61.49816467],
          [23.750830296, 61.48816467],
          [23.750830296, 61.47816467],
        ],
      },
      properties: {},
    },
  ],
};

const routeLine: LineLayerSpecification = {
  id: 'route-line',
  type: 'line',
  source: 'route-data',
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  paint: {
    'line-color': '#FF69B4',
    'line-width': 6,
  },
};

const RouteMap = () => {
  const [routeLength, setRouteLength] = useState(5);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [startingPoint, setStartingPoint] = useState({
    longitude: 0,
    latitude: 0,
  });

  const setStartingMarker = (e: MapLayerMouseEvent) => {
    setStartingPoint({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
    });
    setMarkerVisible(true);
  };

  return (
    <div>
      <div className='absolute z-50 flex w-full flex-col items-center space-x-2 bg-slate-50 p-4 lg:flex-row lg:items-end'>
        <div className='flex flex-row space-y-1 space-x-2 lg:flex-col'>
          <Label>Route Length (km)</Label>
          <Input
            className='w-36 bg-white'
            type='number'
            placeholder='Route Length (km)'
            value={routeLength}
            onChange={(e) => setRouteLength(Number(e.target.value))}
          />
        </div>
        <div className='margin-auto mt-2'>
          <Button className='mr-4' variant='outline' disabled={!markerVisible}>
            Generate Route
          </Button>
          <Button variant='outline'>Clear Route</Button>
        </div>
      </div>
      <Map
        initialViewState={{
          longitude: MAP_CENTER.lon,
          latitude: MAP_CENTER.lat,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100vh' }}
        mapStyle='https://tiles.stadiamaps.com/styles/alidade_smooth.json'
        cursor='crosshair'
        onClick={(e) => {
          setStartingMarker(e);
        }}
      >
        {markerVisible} && (
        <Marker
          longitude={startingPoint.longitude}
          latitude={startingPoint.latitude}
          style={{ cursor: 'crosshair' }}
          anchor='bottom'
        >
          <Pin />
        </Marker>
        )
        <NavigationControl position='bottom-left' />
        <Source id='route-data' type='geojson' data={geojson}>
          <Layer {...routeLine} />
        </Source>
      </Map>
    </div>
  );
};

export default RouteMap;
