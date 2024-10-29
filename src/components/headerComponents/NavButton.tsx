import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

export const NavButton = () => {
  const { isAuthenticated } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
  }));
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/place'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className="rounded-full aspect-square flex items-center justify-center"
    >
         <Button text={""} className="rounded-full aspect-square flex items-center justify-center md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10"/>
      {isAuthenticated ? 'Profile' : 'Login/Signup'}
    </button>
  );
};

