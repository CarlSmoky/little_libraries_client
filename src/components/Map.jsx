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
  const originalMarkers = {...markers};

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
      setLocalMarkers(markers.filter(m => m.registered));
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
    mapRef.current.setZoom(17);
  }, []);

  // todo: move to helper file
  const hasCloseNeighbour = (existingMarkers, newMarker) => {
    // const threshold = 0.00001 // false for here
    // const threshold = 0.00005 // false
    // const threshold = 0.00008 // false
    // const threshold = 0.0001  // true for here
    const threshold = 0.00008  //
    const closeLat = existingMarkers.filter(m => Math.abs(newMarker.lat - m.lat) < threshold);
    const closeLatAndLong = closeLat.filter(m => Math.abs(newMarker.lng - m.lng) < threshold);
    return closeLatAndLong.length > 0;
  }

  // todo: refactor & combine with onMapClick
  const autoDropMarker = ({ lat, lng }) => {
    let newMarker = {
      lat: lat,
      lng: lng,
      time: new Date(),
      registered: false
    };

    const hasNeighbour = hasCloseNeighbour(markers, newMarker);
    console.log("has neighbour", hasNeighbour);

    if (hasNeighbour) { return; }

    setMarkers((current) => [
      ...current,
      newMarker,
    ]);
    setSelected(newMarker);
  }

  const addImageURL = (id, imageURL) => {
    const endpoints = {
      "LOGIN": "api/libraries/imageURL"
    }
    console.log("in addImageURL", imageURL);
    axios.post(endpoints.LOGIN, {id, imageURL})
      .then(response => {
        console.log(response.data);
        // navigate('/')
      })
      .catch(err => {
        const { message } = err.response.data;
        console.log(message);
      });
  }


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      {showSearch && <Search panTo={panTo} autoDropMarker={autoDropMarker} />}
      {/* {showSearch && <Locate panTo={panTo} autoDropMarker={autoDropMarker} />} */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={localMarkers.length > 1 ? 13 : 15}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {localMarkers.map(marker => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/pin.png',
              scaledSize: new window.google.maps.Size(36, 36),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
              console.log("MAP: marker object", marker);
              const storage = getStorage();
              if (marker.imageURL) {
                setSelectedImageUrl(marker.imageURL);
                console.log("MAP: we already have the url");
              } else {
                getDownloadURL(ref(storage, `images/${marker.id}.jpg`))
                .then(url => {
                  console.log("MAP: we had to fetch the URL");
                  console.log("fetched url", url);
                  setSelectedImageUrl(url);
                  addImageURL(marker.id, url);
                  // TODO: error handling when we figure out how!
                })
              }
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
              setSelectedImageUrl(null);
              setLocalMarkers(markers.filter(m => m.registered));
            }}
          >
            <div>
            {selected.registered &&
              <>
              <h3>{`${selected.name}`}</h3>
              <Link to={`/library/${selected.id}`}>
                <img className="photo" src={selectedImageUrl} alt="photo of library" width='100' height='100' />
              </Link>
              </>
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
