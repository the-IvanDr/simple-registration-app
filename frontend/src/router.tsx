import { createBrowserRouter } from "react-router";
import { RegistrationPage } from "./pages/regisratration/registration.page";

export const router = createBrowserRouter([
  { index: true, Component: RegistrationPage },
]);
