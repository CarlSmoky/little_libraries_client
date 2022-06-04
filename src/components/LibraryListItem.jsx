import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateFromSQL } from '../helpers/dateHelpers';

const LibraryListItem = (props) => {
  return (
    <Link to={`/library/${props.id}`}>
      <div className='library-list-item'>
        <div className="library-list-item__image">
          <img src={props.imageUrl} alt='little library image'/>
        </div>
        <div className="library-list-item__details">
          <div className="library-list-item__details--top">
            <h3>{props.address}</h3>
          </div>
          <div className="library-list-item__details--bottom">
            <p>{props.count} visits</p>
            {props.lastVisited && <p>Last visit: {formatDateFromSQL(props.lastVisited)} </p>}
          </div>
        </div>
      </div>
    </Link>
  )
};

export default LibraryListItem;
