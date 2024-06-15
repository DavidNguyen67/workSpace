'use client';
import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import process from 'process';
import 'dotenv/config';

const CustomMap = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <div className="map-container">
          <Map
            style={{ borderRadius: '20px' }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={'greedy'}
            disableDefaultUI
          >
            <Marker position={markerLocation} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default CustomMap;
