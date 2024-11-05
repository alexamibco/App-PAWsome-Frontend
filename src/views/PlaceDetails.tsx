import { useParams } from "react-router-dom";
import { MapComponent } from "../components/map/MapComponent";
import { SingleReview } from "../components/review/SingleReview";
import { ReviewPopUp } from "../components/review/ReviewPopUp";
import { BackButton } from "../components/shared/BackButton";
import { useEffect, useState } from "react";
import { fetchPlaceDetails, Place, Review } from "../getData/FetchPlaceDetails";
import { fetchUserById } from "../getData/FetchUser";
import { useAuthStore } from "../store/AuthStore";

export const PlaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("");
  const userId = useAuthStore((state) => state.userId);
  const [reviewToEdit, setReviewToEdit] = useState<{
    id: string;
    title: string;
    content: string;
    rating: number;
  } | null>(null);

  const handleEdit = (
    reviewId: string,
    title: string,
    content: string,
    rating: number
  ) => {
    setReviewToEdit({ id: reviewId, title, content, rating });
  };

  const handleReviewSubmit = async () => {
    if (reviewToEdit) {
      const updatedReview = {
        ...reviewToEdit,
        user_id: userId,
        place_id: id,
      };

      try {
        const response = await fetch(
          `https://app-pawsome-backend.onrender.com/reviews/${reviewToEdit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedReview),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update review");
        }
        if (!id) return;
        const updatedPlace = await fetchPlaceDetails(id);
        setPlace(updatedPlace);
        setReviewToEdit(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (userId) {
        const userData = await fetchUserById(userId);
        if (userData) {
          setCurrentUser(userData.user_name);
        }
      }
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    const getPlaceDetails = async () => {
      if (!id) return;
      try {
        const data = await fetchPlaceDetails(id);
        setPlace(data);
      } catch (error) {
        setError("This PAWsome place is not available");
        console.error("Error fetching place details:", error);
      }
    };

    getPlaceDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const handleDelete = async (reviewId: string) => {
    try {
      await fetch(
        `https://app-pawsome-backend.onrender.com/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      setPlace((prevPlace) => {
        if (!prevPlace) return null;
        return {
          ...prevPlace,
          reviews: prevPlace.reviews.filter(
            (review) => review.review_id !== reviewId
          ),
        };
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!place) {
    return <div>This PAWsome place is not available</div>;
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 px-10 py-10">
      <BackButton />
      <div className="flex flex-col max-w-[600px]">
        <h1 className="block md:hidden font-bold font-playpen text-accent text-4xl mb-3">
          {place.place_name}
        </h1>
        <img
          src={place.place_img}
          alt={place.place_name}
          className="w-full h-auto rounded-lg"
        />
        <div className="w-full px-4 py-4">
          <h3 className="font-dosis text-2xl font-semibold text-title mb-4">
            Place Details
          </h3>
          <p className="text-text font-dosis text-base">
            {place.place_details}
          </p>
        </div>
        <h3 className="font-dosis text-2xl font-semibold text-title mb-4">
          Location
        </h3>
        <div className="relative z-10">
          <MapComponent
            market="Mexico"
            position={[place.place_latitude, place.place_longitude]}
          />
        </div>
      </div>
      <div className="flex flex-col max-w-[600px]">
        <h1 className="hidden md:block font-bold font-playpen text-accent text-4xl mb-3">
          {place.place_name}
        </h1>
        <h3 className="font-dosis text-2xl font-semibold text-title mb-4">
          Reviews
        </h3>
        {place.reviews?.length > 0 ? (
          place.reviews.map((review: Review) => (
            <SingleReview
              key={review.review_id}
              avatar={review.user?.user_avatar || "default-avatar.png"}
              userName={review.user?.user_name || "Anonymous"}
              rating={review.review_rating}
              review={review.review_content}
              title={review.review_title}
              currentUser={currentUser}
              reviewId={review.review_id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-text font-dosis">
            No reviews available for this PAWsomePlace. You could be the first!
          </p>
        )}
        <div className="w-full max-w-md mx-auto mt-4">
          <ReviewPopUp
            placeId={id}
            userId={userId}
            reviewToEdit={reviewToEdit}
            onSubmit={handleReviewSubmit}
          />
        </div>
      </div>
    </div>
  );
};
