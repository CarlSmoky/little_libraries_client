import React from 'react';
import { formatDateFromSQL } from '../helpers/dateHelpers';
import { Link } from 'react-router-dom';

const MostRecentLibraryListItem = (props) => {
  return (
    <tr>
      <td class="libraryListTable-col1"><Link to={`/library/${props.id}`}><img src={(props.imageUrl && props.imageUrl)} /></Link></td>
      <td class="libraryListTable-col2"><Link to={`/library/${props.id}`}>{props.address}</Link></td>
      <td class="libraryListTable-col3">{formatDateFromSQL(props.lastVisited)}</td>
    </tr>
  )
};

export default MostRecentLibraryListItem;