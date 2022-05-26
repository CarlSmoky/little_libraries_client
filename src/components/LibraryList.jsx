import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MostRecentLibraryListItem from './MostRecentLibraryListItem';
import MostFrequentLibraryListItem from './MostFrequentLibraryListItem';




const LibraryList = () => {
  const [mostRecentlyVisitedLibrary, setMostRecentlyVisitedLibrary] = useState([]);
  const [mostFrequentlyVisitedLibrary, setmostFrequentlyVisitedLibrary] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { "x-access-token": token, };
    const endpoints = {
      "USER": `api/users/libraries`
    }
    axios.post(endpoints.USER, '', { headers })
      .then(response => {
        const { MostRecentlyVisitedLibrariesForUser, MostFrequentlyVisitedLibrariesForUser } = response.data;
        setMostRecentlyVisitedLibrary(MostRecentlyVisitedLibrariesForUser);
        setmostFrequentlyVisitedLibrary(MostFrequentlyVisitedLibrariesForUser);
      })
      .catch(err => {
        console.log(err.response.data);
      });

  }, []);

  const mostRecentlyVisitedLibraries = mostRecentlyVisitedLibrary.map(library => {
    return (
      <MostRecentLibraryListItem
        key={library.id}
        id={library.id}
        address={library.address}
        imageUrl={library.image_url}
        lastVisited={library.last_visited}
      />
    )
  });

  const mostFrequentlyVisitedLibraries = mostFrequentlyVisitedLibrary.map(library => {
    return (
      <MostFrequentLibraryListItem
        key={library.id}
        id={library.id}
        address={library.address}
        imageUrl={library.image_url}
        count={library.count}
      />
    )
  });



  return (
    <div className="libraryListForUser">
      <div className="mostRecentlyVisitedLibrary">
        <h2>Most Recenly Visited Library</h2>
        <table className="libraryListTable">
          <tr>
            <th>Photo</th>
            <th>Address</th>
            <th>Last visited</th>
          </tr>
          {mostRecentlyVisitedLibraries}
        </table>
      </div>
      <div className="mostFrequentlyVisitedLibrary">
        <h2>Most Frequently Visited Library</h2>
        <table className="libraryListTable">
          <tr>
            <th>Photo</th>
            <th>Address</th>
            <th>Count</th>
          </tr>
          {mostFrequentlyVisitedLibraries}
        </table>
      </div>
    </div>
  )
}

export default LibraryList;