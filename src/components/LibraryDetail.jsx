import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { formatDateFromSQL } from '../helpers/dateHelpers';
import ImageLoadTest from './ImageLoadTest';
import axios from 'axios';


const LibraryDetail = ({ libraryInfo }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const navigate = useNavigate();
  const libraryId = libraryInfo.id;
  const [count, setCount] = useState("");
  const [countByUser, setCountByUser] = useState("");
  const [lastVisitByUser, setLastVisitByUser] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (libraryInfo.id) {
      setSelectedImageUrl(libraryInfo.image_url)
    }
  },[libraryInfo]);

  useEffect(() => {
    if (!token) {
      //When user not logged in
      const endpoints = {
        "VISITS": `api/visits/library/${libraryId}`
      }
      axios.get(endpoints.VISITS)
        .then(response => {
          const { count} = response.data;
          setCount(count);
        });
    } else {
      //When user logged in
      const endpoints = {
        "VISITS": `api/visits/library/`
      }
      axios.post(endpoints.VISITS, { libraryId }, {
        headers: {
          "x-access-token": token,
        }
      })
        .then(response => {
          const { count, countByUser, lastVisitByUser } = response.data;
          setCount(count);
          setCountByUser(countByUser);
          setLastVisitByUser(lastVisitByUser);
        });
    }
  }, [lastVisitByUser, libraryId, token, selectedImageUrl])

  const handleClickRecordVisit = () => {
    const endpoints = {
      "RECORD_VISITS": `api/visits/`
    }

    axios.post(endpoints.RECORD_VISITS, { libraryId }, {
      headers: {
        "x-access-token": token,
      }
    })
      .then(response => {
        const { count, countByUser, lastVisitByUser } = response.data;
        setCount(count);
        setCountByUser(countByUser);
        setLastVisitByUser(lastVisitByUser);
      });
  }

  const handleClickEdit = () => {
    navigate("/upload", { state: { libraryId } })
  }

  function formatCountableNoun(noun, count) {
    return count === '1' ? noun : noun + "s";
  }

  const imageUploadLink = {
    pathname: "/upload",
    libraryId
  }

  return (
    <div className="library-detail">
      <h4 className="library-detail-address">{libraryInfo.address}</h4>
      {selectedImageUrl && !showImageUpload && <img className="library-detail-image" src={selectedImageUrl} alt="photo of library" />}
      {token && !selectedImageUrl && <p className="library-detail-image">No photos!</p>}
      {!token && !selectedImageUrl && <p className="library-detail-image">No photos!</p>}
      <div className="library-detail-visit">
          <p>{token && countByUser && `You have visited ${countByUser} ${formatCountableNoun("time", countByUser)}.`}</p>
          <p>{token && lastVisitByUser && `Last visit: ${formatDateFromSQL(lastVisitByUser)}.`}</p>
          <p className='library-detail-visit-spacer'>&nbsp;</p>
          <p>In total, this library has been visted {count} {formatCountableNoun("time", count)}.</p>

      </div>

      {token && <button className="button-small" onClick={handleClickRecordVisit}>Record Visit</button>}
      <br/>
      {token && <button className="button-small" onClick={handleClickEdit }>Edit Image</button>}

      {!token && !selectedImageUrl && <Link to="/login"> Log In</Link>}
      {token && !selectedImageUrl && <Link to={imageUploadLink} state={{ libraryId }}>Upload image</Link>}
    </div>
  )
}

export default LibraryDetail;
