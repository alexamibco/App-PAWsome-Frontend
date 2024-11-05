export interface User {
  user_id: string;
  user_name: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  user_avatar: string;
}

export interface Review {
  review_id: string;
  user_id: string;
  place_id: string;
  review_title: string;
  review_rating: number;
  review_content: string;
  user: User;
}

export interface Place {
  place_id: string;
  place_name: string;
  place_latitude: number;
  place_longitude: number;
  place_rating: number;
  place_reviews: number;
  place_details: string;
  place_category: string;
  place_img: string;
  reviews: Review[];
}

export const fetchPlaceDetails = async (placeId: string): Promise<Place> => {
  try {
    const response = await fetch(
      `https://app-pawsome-backend.onrender.com/places/${placeId}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching place details: ${response.statusText}`);
    }
    const place: Place = await response.json();

    const reviewsResponse = await fetch(
      `https://app-pawsome-backend.onrender.com/places/${placeId}/reviews`
    );
    if (!reviewsResponse.ok) {
      throw new Error(`Error fetching reviews: ${reviewsResponse.statusText}`);
    }
    const reviews: Review[] = await reviewsResponse.json();

    return { ...place, reviews };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
