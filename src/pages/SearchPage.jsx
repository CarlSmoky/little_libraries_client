import Map from "../components/Map";
import LibraryList from "../components/LibraryList";

export default function SearchPage() {

  return (
    <div className="page-wrapper">
      <h2>All Libraries</h2>
        <LibraryList endpointKey="ALL_LIBRARIES"/>
    </div>
  );
};
