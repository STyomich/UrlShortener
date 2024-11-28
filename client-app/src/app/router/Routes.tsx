import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ShortUrlsList from "../../features/shortUrls/ShortUrlsList";
import LoginForm from "../identity/LoginForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ShortUrlsList /> },
      { path: "/login", element: <LoginForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);