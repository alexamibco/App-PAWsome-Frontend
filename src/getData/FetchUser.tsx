const BASE_URL = "http://localhost:3000"; 

export const fetchUserById = async (userId:string) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
    return null; 
  }
};
