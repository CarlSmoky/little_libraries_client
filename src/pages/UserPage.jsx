import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import LibraryList from '../components/LibraryList';

const UserPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate(`/login`, { replace: true });
    }
  }, [])


  return (
    <div className="page-wrapper">
      <LibraryList endpointKey="USER"/>
    </div>
  )
}

export default UserPage
