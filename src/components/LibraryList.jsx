import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LibraryListItem from './LibraryListItem';

const LibraryList = ({ endpointKey }) => {
  const [displayedLibraries, setDisplayedLibraries] = useState([]);
  const mostFrequentlyVisited = useRef();
  const displayCount = useRef(10);

  useEffect(() => {
    displayCount.current = sessionStorage.getItem("userpage-display-items") || 10;

    const token = localStorage.getItem("token");
    const headers = { "x-access-token": token, };
    const endpoints = {
      "USER": `api/users/libraries`,
      "ALL_LIBRARIES": `api/libraries/all`
    }

    axios.post(endpoints[endpointKey], '', { headers })
      .then(response => {
        mostFrequentlyVisited.current = response.data;
        setDisplayedLibraries(mostFrequentlyVisited.current.slice(0, displayCount.current));
      })
      .catch(err => {
        console.log(err.response.data);
      });

  }, []);

  const pressedShowAll = () => {
    displayCount.current += 200;
    sessionStorage.setItem("userpage-display-items", displayCount.current);
    setDisplayedLibraries(mostFrequentlyVisited.current.slice(0,displayCount.current));
  }

  const topLibraries = displayedLibraries.map(library => {
    return (
      <LibraryListItem
        key={library.id}
        id={library.id}
        address={library.address}
        imageUrl={library.image_url}
        count={library.count}
        lastVisited={library.last_visited}
      />
    )
  });

  const displayShowMoreButton = () => {
    return mostFrequentlyVisited.current && displayedLibraries.length < mostFrequentlyVisited.current.length;
  }

  return (
    <div className="libraryListForUser">
      <div className="mostFrequentlyVisitedLibrary">
        { topLibraries }
      </div>
      { displayShowMoreButton() &&
        <button className="button-basic bottom-margin button-narrow" onClick={pressedShowAll}>Show All</button> || <div className='bottom-spacer'></div>}
    </div>
  )
}

export default LibraryList;
