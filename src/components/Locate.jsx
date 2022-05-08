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

  const handleLocationFailure = () => {

  }

  return (
    <button
      className="locate"
      onClick={() => {
        console.log("LOCATE");
        navigator.geolocation.getCurrentPosition(
          handleLocationSuccess,
          handleLocationFailure,
          {}
        );
      }}
    >
      <img src="/books.png" alt="compass" />
    </button>
  )
}

export default Locate
