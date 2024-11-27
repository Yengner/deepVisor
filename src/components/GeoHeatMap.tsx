'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface GeoData {
  country: string;
  reach: number;
}

// Add typing to countryCoordinates
const countryCoordinates: Record<string, { lat: number; lng: number }> = {
  US: { lat: 37.0902, lng: -95.7129 },
  CA: { lat: 56.1304, lng: -106.3468 },
  UK: { lat: 55.3781, lng: -3.436 },
};

const GeoHeatMap = ({ data }: { data: GeoData[] }) => {
  // Merge coordinates into data
  const enrichedData = data
    .filter((item) => countryCoordinates[item.country])
    .map((item) => ({
      ...item,
      ...countryCoordinates[item.country],
    }));

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4 text-center py-2 bg-gray-100 dark:bg-gray-700">
        Audience by Location
      </h2>
      <MapContainer
        center={[20, 0] as [number, number]} // Explicitly typing as [number, number]
        zoom={2}
        scrollWheelZoom={false}
        style={{
          height: '300px',
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {enrichedData.map((item, index) => (
          <CircleMarker
            key={index}
            center={[item.lat, item.lng]}
            radius={Math.sqrt(item.reach) / 2000} // Dynamically adjust radius
            fillColor="rgba(30,144,255,0.7)"
            color="rgba(30,144,255,0.8)"
            fillOpacity={0.6}
            stroke={false}
          >
            <Popup>
              <strong>{item.country}</strong>
              <br />
              Reach: {item.reach.toLocaleString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeoHeatMap;
