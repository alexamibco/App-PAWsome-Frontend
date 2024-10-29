import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="absolute top-40 left-4 w-16 h-16 md:top-4 bg-white text-accent rounded-full shadow-xl flex items-center justify-center hover:bg-accent-light hover:text-title"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M8.3 11.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 1 1 1.1 1.02L4.773 8zm4 0a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 1 1 1.1 1.02L8.773 8z"
        />
      </svg>
    </button>
  );
};
