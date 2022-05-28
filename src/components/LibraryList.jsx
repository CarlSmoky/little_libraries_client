import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LibraryListItem from './LibraryListItem';

const LibraryList = () => {
  // const [mostFrequentlyVisitedLibrary, setmostFrequentlyVisitedLibrary] = useState([]);
  const [displayedLibraries, setDisplayedLibraries] = useState([]);
  const mostFrequentlyVisited = useRef();
  const displayCount = useRef(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { "x-access-token": token, };
    const endpoints = {
      "USER": `api/users/libraries`
    }
    axios.post(endpoints.USER, '', { headers })
      .then(response => {
        mostFrequentlyVisited.current = response.data;
        setDisplayedLibraries(mostFrequentlyVisited.current.slice(0, displayCount.current));
      })
      .catch(err => {
        console.log(err.response.data);
      });

  }, []);

  const pressedShowAll = () => {
    displayCount.current += 10;
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
        <h2>Most Frequently Visited Library</h2>
        { topLibraries }
      </div>
      { displayShowMoreButton() &&
        <button className="button-basic bottom-margin button-narrow" onClick={pressedShowAll}>Show All</button> }
    </div>
  )
}

export default LibraryList;