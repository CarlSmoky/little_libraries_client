import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateFromSQL } from '../helpers/dateHelpers';

const LibraryListItem = (props) => {
  return (
    <Link to={`/library/${props.id}`}>
      <div class="card">
        {props.imageUrl && <img className="card_image" src={props.imageUrl} alt='little library image' />}
        {!props.imageUrl && <img className="card_image no-image" src='https://firebasestorage.googleapis.com/v0/b/little-libraries-ea3cb.appspot.com/o/images%2F1.jpg?alt=media&token=008505ad-0024-420c-888f-9f8b8f707efa' alt='little library image' />}
        <div class="text-container">
          <h3><b>{props.address}</b></h3>
          <p><i className="fas fa-street-view"></i> {props.count} visits</p>
          {props.lastVisited && <p><i className="fas fa-calendar-check"></i> Last visit: {formatDateFromSQL(props.lastVisited)} </p>}
        </div>
      </div>
    </Link>
  )
};

export default LibraryListItem;
