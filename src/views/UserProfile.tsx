import { useEffect, useState } from "react";
import { BackButton } from "../components/shared/BackButton";
import { Button } from "../components/shared/Button";
import { UserCard } from "../components/userInfo/UserCard";
import { UserConfigurations } from "../components/userInfo/UserConfigurations";
import { fetchUserById } from "../getData/FetchUser";
import { useAuthStore } from "../store/AuthStore";

interface User {
  user_name: string;
  user_lastname: string;
  user_email: string;
  user_avatar: string;
}

export const UserProfile = () => {
  const userId = useAuthStore((state) => state.userId);
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      if (userId) {
        const data = await fetchUserById(userId);
        setUser(data);
        setUpdatedUser(data);
      } else {
        console.error("User ID is null");
      }
      setLoading(false);
    };

    getUserData();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdatedUser((prevUser) =>
      prevUser ? { ...prevUser, [id]: value } : null
    );
  };

  const handleSaveChanges = async () => {
    if (updatedUser && userId) {
      try {
        const response = await fetch(
          `https://app-pawsome-backend.onrender.com/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to update user");
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const handleDeleteUser = async () => {
    if (userId) {
      try {
        const response = await fetch(
          `https://app-pawsome-backend.onrender.com/users/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          logout();
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div className="md:h-screen flex items-center justify-center">
        <BackButton />
        <div className="flex flex-col items-center justify-center bg-white md:flex-row md:w-[906px] mx-auto my-auto px-10 py-10 md:shadow-md rounded-[20px]">
          <div className="flex items-center justify-center md:p-10">
            <UserCard
              name={user.user_name}
              lastName={user.user_lastname}
              email={user.user_email}
              avatar={user.user_avatar}
              userId={userId}
            />
          </div>
          <div>
            <UserConfigurations
              name={updatedUser?.user_name ?? ""}
              lastName={updatedUser?.user_lastname ?? ""}
              email={updatedUser?.user_email ?? ""}
              onInputChange={handleInputChange}
            />
            <div className="flex flex-col items-center justify-center space-y-6">
              <Button
                text="Save Changes"
                className="w-[15.625rem] h-[3.75rem]"
                onClick={handleSaveChanges}
              />
              <button
                className="font-medium hover:text-primary font-playpen text-base"
                onClick={handleLogout}
              >
                Close my session
              </button>
              <button
                className="text-accent font-medium font-playpen text-base"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete my user
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center mb-4">
              Confirm Deletion
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-around">
              <Button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-white text-title border-2 border-principal hover:bg-accent-light"
                text="Confirm "
              />
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2"
                text="Cancel  "
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
