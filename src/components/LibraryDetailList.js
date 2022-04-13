import React, { useState, useContext } from 'react';
import LibraryDetail from './LibraryDetail';
import { markerContext } from '../providers/MarkerProvider';

const LibraryDetailList = () => {
  const { markers, setMarkers } = useContext(markerContext);
  console.log("list", markers);

  return (
    <>
      <div className="library-detail-list-container">
        {markers.map(marker => (<LibraryDetail listView libraryInfo={marker} key={marker.id} loading="lazy"/>))}
      </div>
    </>
  )
}

export default LibraryDetailList;
