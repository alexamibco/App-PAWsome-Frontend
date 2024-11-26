import { Link } from "react-router-dom";
import { Stars } from '../../components';

interface PlaceCardProps {
  imageUrl: string;
  placeName: string;
  details: string;
  rating: number;
  reviewNumbers: number;
  id: string;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  imageUrl,
  placeName,
  details,
  rating,
  reviewNumbers,
  id
}) => {
  return (
    <Link to={`/place/${id}`} className="block">
    <div className="max-w-[340px] min-w-[300px] min-h-[200px] my-4 mx-2 items-center justify-center bg-cover bg-center cursor-pointer rounded-3xl hover:scale-105 hover:shadow-xl">
      <div
        className="bg-pink-300 min-h-[200px] sm:min-w-[300px] rounded-3xl bg-cover bg-center "
        style={{ backgroundImage: `url("${imageUrl}")` }}
        aria-label="Place Card"
      ></div>
      <div className="bg-white px-6 rounded-3xl">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <p className="font-semibold text-base text-title truncate">{placeName}</p>
          </div>
          <div className="flex flex-row items-center font-normal text-xs text-text">
            <p className="truncate pb-2">{details}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};
