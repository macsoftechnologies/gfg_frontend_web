import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const libraries = ['marker'];

const MapComponent = ({ initialPosition, onPositionChange, apiKey }) => {
  const [mapMarkerPosition, setMapMarkerPosition] = useState({
    lat: initialPosition[0],
    lng: initialPosition[1],
  });
  const [address, setAddress] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  
      // Example icon configuration
      const faBusIcon = {
        path: 'M16,0C7.16,0,0,7.16,0,16s16,32,16,32s16-14.36,16-16S24.84,0,16,0z M16,24c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6 S19.31,24,16,24z',
        fillColor: '#0000ff',
        fillOpacity: 1,
        anchor: new window.google.maps.Point(8, 32), // Adjust anchor point as needed
        strokeWeight: 1,
        strokeColor: '#ffffff',
        scale: 0.5,
      };

  useEffect(() => {
    console.log('Initial position set:', initialPosition);
    setMapMarkerPosition({
      lat: initialPosition[0],
      lng: initialPosition[1],
    });
  }, [initialPosition]);

  useEffect(() => {
    if (map && isLoaded && !marker) {
      console.log('Creating new marker with custom icon');


      const newMarker = new window.google.maps.Marker({
        position: mapMarkerPosition,
        map,
        icon: faBusIcon,
        title: 'FontAwesome SVG Marker',
      });

      newMarker.addListener('dragend', (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log('Marker dragged to:', lat, lng);
        updatePosition(lat, lng);
      });

      setMarker(newMarker);
    } else if (marker) {
      console.log('Updating marker position');
      marker.setPosition(mapMarkerPosition);
    }
  }, [map, marker, mapMarkerPosition, isLoaded]);

  const updatePosition = async (lat, lng) => {
    setMapMarkerPosition({ lat, lng });
    try {
      const address = await reverseGeocode(lat, lng);
      setAddress(address);
      onPositionChange(lat, lng, address);
      console.log('Updated address:', address);
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      setAddress('Failed to fetch address');
    }
  };

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error('No address found');
    }
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log('Map clicked at:', lat, lng);
    updatePosition(lat, lng);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapMarkerPosition}
      zoom={15}
      onClick={handleMapClick}
      onLoad={(mapInstance) => setMap(mapInstance)}
    >
      {/* Marker with custom icon */}
      {marker && <Marker position={mapMarkerPosition} map={map} icon={faBusIcon} title="FontAwesome SVG Marker" />}
    </GoogleMap>
  );
};

export default MapComponent;
