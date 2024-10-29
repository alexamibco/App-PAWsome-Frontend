import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DivIcon } from "leaflet";

const CustomMarkerIcon = () => {
  return new DivIcon({
    html: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="text-red-600"
    >
      <circle
        cx="256"
        cy="192"
        r="32"
        fill="currentColor"
      />
      <path
        fill="currentColor"
        d="M256 32c-88.22 0-160 68.65-160 153c0 40.17 18.31 93.59 54.42 158.78c29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0 0 51.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"
      />
    </svg>`,
    className: "svg-location-icon",
    iconSize: [36, 28],
    iconAnchor: [18, 10],
  });
};

interface MapComponentProps {
  market: string;
  position: [number, number];
  size?: { height?: string; width?: string };
}

export const MapComponent: React.FC<MapComponentProps> = ({
  position,
  size = { height: "100%", width: "100%" },
  market,
}) => {
  return (
    <div className="relative flex justify-center items-center">
      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: size.height,
          width: size.width,
          minHeight: "300px",
          minWidth: "300px",
          maxHeight: "500px",
          maxWidth: "600px",
        }}
        className="rounded-lg shadow-lg relative"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={CustomMarkerIcon()}>
          <Popup>{market}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
