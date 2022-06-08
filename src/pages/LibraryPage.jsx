import React, { useEffect, useState } from 'react';
import LibraryDetail from '../components/LibraryDetail';
import Map from '../components/Map';
import axios from "axios";
import { useParams } from 'react-router-dom'


const LibraryPage = () => {
  const { id } = useParams();
  const [libraryInfo, setLibraryInfo] = useState({
    id: '',
    address: '',
    lat: '',
    long: '',
    image_url: ''}
    );

  let mapContainerStyleForDetailPage = {
    width: '100%',
    height: '616px'
  };

  useEffect(() => {
    axios.get(`api/libraries/${id}`)
      .then(res => {
        const {id, address, lat, long, image_url } = res.data;
        setLibraryInfo({id, address, lat, long, image_url});
      })
      .catch (err => {
        console.log(err)
      })
    }, [id]);
  return (
    <div className="library-page">
      <LibraryDetail libraryInfo={libraryInfo}/>
      <Map id={id} showSearch={false} mapStyle={mapContainerStyleForDetailPage}/>
    </div>
  )
}

export default LibraryPage
