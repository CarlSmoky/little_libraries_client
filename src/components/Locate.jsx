import React from 'react'

const Locate = ({ panTo, autoDropMarker }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        console.log("LOCATE");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            autoDropMarker({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => {console.log("geolocation error")}
        );
      }}
    >
      <img src="/books.png" alt="compass" />
    </button>
  )
}

export default Locate
