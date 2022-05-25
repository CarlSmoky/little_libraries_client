import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        setmostFrequentlyVisitedLibrary(MostFrequentlyVisitedLibrariesForUser)
      })
      .catch(err => {
        console.log(err.response.data);
      });

  }, []);

  return (
    <div>
      <h2>LibraryList</h2>
    </div>
  )
}

export default LibraryList