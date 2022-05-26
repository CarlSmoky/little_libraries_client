import React from 'react';
import { Link } from 'react-router-dom';

const MostFrequentLibraryListItem = (props) => {
  return (
    <tr>
      <td className="libraryListTable-col1"><Link to={`/library/${props.id}`}><img src={(props.imageUrl && props.imageUrl)} /></Link></td>
      <td className="libraryListTable-col2"><Link to={`/library/${props.id}`}>{props.address}</Link></td>
      <td className="libraryListTable-col3">{props.count}</td>
    </tr>

  )
};

export default MostFrequentLibraryListItem;