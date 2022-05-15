import axios from 'axios';
const { useState, createContext, useEffect } = require("react");

export const markerContext = createContext();

const MarkerProvider = props => {
  const [markers, setMarkers] = useState([]);
  const [typedAddress, setTypedAddress] = useState("");

  const fetchMarkers = () => {
    axios.get('/api/libraries')
      .then(result => {
        const dbMarkers = result.data.map(entry => ({
          lat: entry.lat,
          lng: entry.long,
          time: new Date(),
          name: entry.address,
          id: entry.id,
          key: entry.id,
          registered: true,
          imageURL: entry.image_url
        }))

        setMarkers(dbMarkers);
      })
      .catch();
  }
  useEffect(() => {
    fetchMarkers();
  }, []);

  const provideData = { markers, setMarkers, fetchMarkers, typedAddress, setTypedAddress };

  return (
    <markerContext.Provider value={provideData}>
      {props.children}
    </markerContext.Provider>
  );

};

export default MarkerProvider;
