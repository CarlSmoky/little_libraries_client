import React, { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import './Map.css';
import Search from './Search';
import Locate from './Locate';
import lightFormat from 'date-fns/lightFormat'; // ?

let mapContainerStyleForFullMap = {
  width: '100%',
  height: '600px'
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}
const defaultCenter =  {
  lat: 43.6884244,
  lng: -79.3137875
}
const libraries = ["places"];

const UserHomeMap = ({ mapStyle }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [center, setCenter] = useState(defaultCenter); // main value to set here
  const [mapContainerStyle, setMapContainerStyle] = useState(mapStyle); // ?

  useEffect(() => {
    const startLocation = JSON.parse(localStorage.getItem('user-map-center')) || defaultCenter;
    setCenter(startLocation);
  },[])

  const onMapClick = useCallback((event) => {
    let newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    console.log(newMarker);
    panTo(newMarker);
    setTimeout(() => {setCenter(newMarker)}, 300);
    localStorage.setItem('user-map-center', JSON.stringify(newMarker));
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    // mapRef.current.setZoom(17);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      {/* <Search panTo={panTo} autoDropMarker={onMapClick} /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={9}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
      <Marker 
        key={`${center.lat}-${center.lng}`}
        position={{ lat: center.lat, lng: center.lng }}
      /> 
      </GoogleMap>
    </>
  );


}

export default UserHomeMap;