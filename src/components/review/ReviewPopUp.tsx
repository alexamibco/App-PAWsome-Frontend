import { useEffect, useState } from "react";
import { Button, StarsSelector } from "../../components";
import { useAuthStore } from "../../store/AuthStore";

interface ReviewPopUpProps {
  placeId: string | undefined;
  userId: string | undefined | null;
  reviewToEdit: {
    id: string;
    title: string;
    content: string;
    rating: number;
  } | null;
  onSubmit: () => void;
}

export const ReviewPopUp: React.FC<ReviewPopUpProps> = ({
  placeId,
  userId,
  reviewToEdit,
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(reviewToEdit?.rating || 0);
  const [reviewTitle, setReviewTitle] = useState(reviewToEdit?.title || "");
  const [reviewContent, setReviewContent] = useState(
    reviewToEdit?.content || ""
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const togglePopup = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setReviewTitle(reviewToEdit.title);
      setReviewContent(reviewToEdit.content);
    } else {
      setRating(0);
      setReviewTitle("");
      setReviewContent("");
    }
  }, [reviewToEdit]);

  const handleSubmitReview = async () => {
    if (!reviewTitle || !reviewContent || rating === 0) {
      alert("Please fill out all fields and select a rating.");
      return;
    }

    const newReview = {
      user_id: userId,
      place_id: placeId,
      review_title: reviewTitle,
      review_rating: rating,
      review_content: reviewContent,
    };

    try {
      if (reviewToEdit) {
        // Editar
        const response = await fetch(
          `https://app-pawsome-backend.onrender.com/reviews/${reviewToEdit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update review");
        }
      } else {
        // Crear
        const response = await fetch(
          "https://app-pawsome-backend.onrender.com/reviews",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
      }

      setIsOpen(false);
      setReviewTitle("");
      setReviewContent("");
      setRating(0);
      onSubmit();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="w-full relative">
      <div className="cursor-pointer" onClick={togglePopup}>
        <Button
          text={reviewToEdit ? "Edit Review" : "Write a Review"}
          className="w-full"
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white min-w-[300px] md:min-w-[500px] max-w-[800px] shadow-md rounded-[20px] p-4 relative">
            <button
              className="absolute top-4 right-4 text-text hover:text-gray-700"
              onClick={togglePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 7l10 10M7 17L17 7"
                />
              </svg>
            </button>

            <div className="mt-4 mb-4">
              <h1 className="font-semibold font-playpen text-center text-3xl text-title my-3">
                {reviewToEdit ? "Edit My PAWsome Review" : "My PAWsome Review"}
              </h1>
              <div className="flex flex-row justify-between">
                <span className="font-dosis text-accent font-semibold text-xl">
                  My PAWsome Rating
                </span>
                <StarsSelector
                  rating={rating}
                  onRatingChange={setRating}
                ></StarsSelector>
              </div>
              <div className="flex flex-col justify-center items-center">
                <input
                  className="border-2 rounded-xl border-principal text-base text-text font-dosis p-4 min-w-[290px] w-full m-2 focus:border-accent focus:outline-none"
                  placeholder="My review title"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
                <textarea
                  className="border-2 rounded-xl border-principal text-base text-text font-dosis p-4 min-w-[290px] min-h-[200px] w-full m-2 focus:border-accent focus:outline-none"
                  placeholder="My review"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
                <Button
                  text={reviewToEdit ? "Update Review" : "Submit Review"}
                  className="mt-4"
                  onClick={handleSubmitReview}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
