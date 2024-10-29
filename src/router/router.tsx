import { createBrowserRouter } from "react-router-dom";
import { Login } from "../views/Login";
import { SignUp } from "../views/SignUp";
import { PawsomePlaces } from "../views/PawsomePlaces";
import { PlaceDetails } from "../views/PlaceDetails";
import { UserProfile } from "../views/UserProfile";
import { ErrorPage } from "../views/ErrorPage";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PawsomePlaces />,
    errorElement: <ErrorPage />,  
  },
  {
    path: "/place/:id",
    element: <PlaceDetails />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
