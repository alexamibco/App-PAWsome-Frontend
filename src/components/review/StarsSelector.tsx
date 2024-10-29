import { useState } from 'react';

interface StarsSelectorProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

export const StarsSelector: React.FC<StarsSelectorProps> = ({ rating, onRatingChange }) => {
  const totalStars = 5;
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleClick = (index: number) => {
    onRatingChange(index + 1);
  };

  const getStarClassName = (index: number) => {
    const isFilled = hoveredRating !== null ? index < hoveredRating : index < rating;
    return isFilled ? 'text-pink-500 text-xl' : 'text-gray-400 text-xl';
  };

  return (
    <div className="flex cursor-pointer">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={getStarClassName(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};
