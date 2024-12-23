import { Place } from "./PlaceInterface";

const API_BASE_URL = "https://app-pawsome-backend.onrender.com";

export const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};
