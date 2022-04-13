import Map from "../components/Map";
import Search from "../components/Search";

export default function HomePage() {
  const mapContainerStyleForFullMap = {
    width: '100%',
    height: '600px'
  };

  return (
    <div className="main-container">
      <Map showSearch mapStyle={mapContainerStyleForFullMap}/>
    </div>
  );
};
