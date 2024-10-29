import { useState } from 'react';

interface UserCardProps {
  name: string;
  lastName: string;
  email: string;
  avatar?: string;
  userId: string | null; 
}

export const UserCard: React.FC<UserCardProps> = ({ name, lastName, email, avatar, userId }) => {
  const [currentAvatar, setCurrentAvatar] = useState(avatar);
  
  const changeProfileImage = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg, image/png';
    
    fileInput.onchange = async (event) => {
      const files = (event.target as HTMLInputElement).files; 
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        if (userId) {
          formData.append('userId', userId); 
        }

        try {
          const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload image');
          }

          const result = await response.json();
          console.log(result); 
          setCurrentAvatar(result.result.secure_url); 
        } catch (err) {
          console.error(err instanceof Error ? err.message : 'An error occurred');
        }
      }
    };

    fileInput.click(); 
  };

  return (
    <div className="flex flex-col md:flex-row mx-auto items-center justify-center bg-white max-w-[342px] p-5">
      <div className="flex flex-col items-center">
        <img
          src={currentAvatar}
          alt="Avatar"
          className="aspect-square rounded-3xl mb-2"
        />
        <button
          className="absolute mt-2 ml-60 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer hover:bg-accent-light"
          onClick={changeProfileImage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#811de5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 20h9M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854zM15 5l3 3"
            />
          </svg>
        </button>
        <h1 className="text-3xl text-accent font-bold mt-2 font-playpen text-center">
          {name} {lastName}
        </h1>
        <p className="text-xl text-center font-playpen text-text">{email}</p>
      </div>
    </div>
  );
};
