import { ProfilePicture } from "../components/headerComponents/ProfilePicture";
import { SayHi } from "../components/headerComponents/SayHi";
import { WelcomeMessage } from "../components/headerComponents/WelcomeMessage";
import { InputSearch } from "../components/search/InputSearch";
import { CategoryList } from "../components/tags/CategoryList";
import { Button } from "../components/shared/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

interface HeaderProps {
  userName?: string;
  avatar: string;
  onCategorySelect: (category: string | null) => void;
  onSearch: (search: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "",
  avatar,
  onCategorySelect,
  onSearch,
}) => {

  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile"); 
    } else {
      navigate("/login");   
    }
  };

  return (
    <div className="flex flex-col sm-380:flex-row sm-380:justify-between items-center px-4 w-full max-w-7xl mx-auto transition-all duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row md:items-center w-full transition-all duration-300 ease-in-out">
        <div className="flex flex-grow justify-between items-start w-full transition-all duration-300 ease-in-out">
          <div className="flex-grow transition-all duration-300 ease-in-out">
            <div className="flex flex-row gap-2">
                <Button
                  text={""}
                  onClick={handleProfileClick}
                  className="rounded-full aspect-square flex items-center justify-center md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10"
                />
              <WelcomeMessage
                userName={userName}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl transition-all duration-300 ease-in-out"
              />
            </div>
            <SayHi className="text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 ease-in-out" />
            <InputSearch
              className="my-2 w-full max-w-md transition-all duration-300 ease-in-out"
              onSearch={onSearch}
            />
          </div>
          <div className="block md:hidden absolute right-4 h-12 w-12 transition-all duration-300 ease-in-out">
            <ProfilePicture
              avatar={avatar}
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>
        <div className="w-full md:w-auto mx-auto my-2 md:my-0 transition-all duration-300 ease-in-out">
          <CategoryList
            className="flex flex-wrap justify-center transition-all duration-300 ease-in-out"
            onCategorySelect={onCategorySelect}
          />
        </div>
      </div>
      <div className="hidden aspect-square mx-4 sm-800:flex sm-800:items-center sm-800:justify-end w-full sm-800:w-auto mt-4  sm-800:mx-4 transition-all duration-300 ease-in-out">
        <ProfilePicture
          avatar={avatar}
          className="max-w-[180px] rounded-[24px]"
        />
      </div>
    </div>
  );
};
