import React from 'react'

const Locate = ({ panTo, autoDropMarker }) => {

  const handleLocationSuccess =  (position) => {
    console.log(position);
    panTo({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    autoDropMarker({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  }

  const handleLocationFailure = (error) => {
    alert(error.code + ": " + error.message); 
  }

  return (
    <button
      className="locate"
      onClick={() => {
        console.log("LOCATE");
        navigator.geolocation.getCurrentPosition(
          handleLocationSuccess,
          handleLocationFailure,
          {enableHighAccuracy: true, maximumAge: 10000}
        );
      }}
    >
      <img src="/books.png" alt="compass" />
    </button>
  )
}

export default Locate
