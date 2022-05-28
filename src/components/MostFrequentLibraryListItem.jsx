import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateFromSQL } from '../helpers/dateHelpers';

const MostFrequentLibraryListItem = (props) => {
  return (
    <tr>
      <td className="libraryListTable-col1"><Link to={`/library/${props.id}`}><img src={(props.imageUrl && props.imageUrl)} /></Link></td>
      <td className="libraryListTable-col2">
        <Link to={`/library/${props.id}`}>
          {props.address}
          <p>
            {props.count}<span> Visits</span>
            <span>Last Visit: </span>{formatDateFromSQL(props.lastVisited)}
          </p>
        </Link>
      </td>
    </tr>

  )
};

export default MostFrequentLibraryListItem;