import React, { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import './Map.css';
import { formatRelative } from "date-fns";
import Search from './Search';
import Locate from './Locate';
import axios from 'axios';
import firebaseApp from './../Firebase.js'; // temp, probably
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { markerContext } from '../providers/MarkerProvider';
import lightFormat from 'date-fns/lightFormat';


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

const Map = ({ id, showSearch, mapStyle }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { markers, setMarkers } = useContext(markerContext);
  const [localMarkers, setLocalMarkers ] = useState(markers);
  const [center, setCenter] = useState(defaultCenter);
  const [selected, setSelected] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const [mapContainerStyle, setMapContainerStyle] = useState(mapStyle);


  const markerById = (id) => {
    const result = markers.filter(e => e.id === Number(id));
    return result;
  }

  const usingLibraryDetail = () => {
    return localMarkers.length == 1;
  }

  useEffect(() => {
    // when markers fetch completes, this code runs
    handleSingleMarker();
  }, [markers]);

  const handleSingleMarker = () => {
    if (id && markers.length > 0) {
      const singleMarker = markerById(id);
      setLocalMarkers(singleMarker);
      setCenter({
        lat: singleMarker[0].lat,
        lng: singleMarker[0].lng,
      });
    } else {
      // if either id is missing or markers is still empty:
      setLocalMarkers(markers);
    }
  }

  const onMapClick = useCallback((event) => {
    if (usingLibraryDetail()) {
      return;
    }
    let newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
      registered: false
    };
    console.log(newMarker);
    setMarkers((current) => [
      ...current,
      newMarker,
    ]);
    setSelected(newMarker);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      {showSearch && <Search panTo={panTo} />}
      {showSearch && <Locate panTo={panTo} />}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={localMarkers.length > 1 ? 12 : 15}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {localMarkers.map(marker => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={{
            //   url: '/books.png',
            //   scaledSize: new window.google.maps.Size(24, 24),
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 15),
            // }}
            onClick={() => {
              setSelected(marker);
              const storage = getStorage();
              getDownloadURL(ref(storage, `images/${marker.id}.jpg`))
                .then(url => {
                  setSelectedImageUrl(url);
                })
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
              setSelectedImageUrl(null);
            }}
          >
            <div>
            {selected.registered &&
              <><h3>{`Little Library ${selected.name}`}</h3><img src={selectedImageUrl} alt="photo of library" width='100' height='100' /><Link to={`/library/${selected.id}`}>Library detail</Link></>
            }
            {!selected.registered &&
            <Link
              to="/libraryForm"
              state={{ lat: selected.lat,
                      lng: selected.lng}}
            >
              Register Library
            </Link>}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}
export default Map;
