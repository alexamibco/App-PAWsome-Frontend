import { useState , useEffect} from "react";
import { PlaceCard } from "../components/cards/PlaceCard";
import { Header } from "../layouts/Header";
import { fetchPlaces } from "../getData/FetchPlaces";
import { Place } from "../getData/PlaceInterface";
import { fetchUserById } from "../getData/FetchUser";
import { useAuthStore } from "../store/AuthStore"; 

export const PawsomePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.userId);
  const [avatar, setAvatar] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {

    const getPlaces = async () => {
      try {
        const fetchedPlaces = await fetchPlaces();
        setPlaces(fetchedPlaces); 
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    getPlaces();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (userId) {
        const userData = await fetchUserById(userId);
        if (userData) {
          setAvatar(userData.user_avatar); 
          setUserName(userData.user_name);
        }
      }
    };

    getUserData();
  }, [userId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string | null) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredPlaces = places.filter((place) => {
    const matchesCategory = selectedCategory ? place.place_category === selectedCategory : true;
    const matchesSearch = place.place_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="font-playpen max-w-[1500px] mx-auto my-0 pt-5">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4">
        <Header
          avatar={avatar || "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd_cpvOb8ukzVtTrvl7-_f8s3z8lqGb5-RlfMwDud78ZSZJ59SxRLyHI07jn3osJe8IvoWmzCVBbphl62UPjw8v7RU2DvPf2SpbIygl74DHE0tflvjH1G_Gj6S9E1grdLsbbJnrPTTjlM3IsSOD09CFEdOcff-u1oPOAuZCyHeah1bokCXXlJaFVQHTWU/s3100/pets.png"}
          userName={userName || " "}
          onCategorySelect={handleCategorySelect} 
          onSearch={handleSearch}
        />
      </div>
      <div className="mx-6">
        <h2 className="font-playpen text-accent font-bold text-3xl mt-2">Pawsome Places</h2>
        <div className="grid grid-cols-1 sm-800:grid-cols-2 sm-970:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
          {filteredPlaces.map(place => (
            <PlaceCard
            key={place.place_id}
            id={place.place_id}
            imageUrl={place.place_img}
            placeName={place.place_name}
            details={place.place_details}
            rating={place.place_rating}
            reviewNumbers={place.place_reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
