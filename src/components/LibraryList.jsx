import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MostFrequentLibraryListItem from './MostFrequentLibraryListItem';

const LibraryList = () => {
  const [mostFrequentlyVisitedLibrary, setmostFrequentlyVisitedLibrary] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { "x-access-token": token, };
    const endpoints = {
      "USER": `api/users/libraries`
    }
    axios.post(endpoints.USER, '', { headers })
      .then(response => {
        setmostFrequentlyVisitedLibrary(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });

  }, []);

  const mostFrequentlyVisitedLibraries = mostFrequentlyVisitedLibrary.map(library => {
    return (
      <MostFrequentLibraryListItem
        key={library.id}
        id={library.id}
        address={library.address}
        imageUrl={library.image_url}
        count={library.count}
        lastVisited={library.last_visited}
      />
    )
  });

  return (
    <div className="libraryListForUser">
      <div className="mostFrequentlyVisitedLibrary">
        <h2>Most Frequently Visited Library</h2>
        <table className="libraryListTable">
          <tr>
            <th>Photo</th>
            <th>Address</th>
          </tr>
          {mostFrequentlyVisitedLibraries}
        </table>
      </div>
    </div>
  )
}

export default LibraryList;