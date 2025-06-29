import { createBrowserRouter } from "react-router";
import { LoginPage, ProfilePage, RegistrationPage } from "./pages";

export const router = createBrowserRouter([
  { index: true, Component: RegistrationPage },
  { path: "/registration", Component: RegistrationPage },
  { path: "/login", Component: LoginPage },
  { path: "/profile", Component: ProfilePage },
]);
