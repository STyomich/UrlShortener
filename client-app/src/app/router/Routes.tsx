import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ShortUrlsList from "../../features/shortUrls/ShortUrlsList";
import LoginForm from "../identity/LoginForm";
import UrlDetails from "../../features/shortUrls/UrlDetails";
import CreateShortUrl from "../../features/shortUrls/CreateShortUrlForm";
import RegisterForm from "../identity/RegisterForm";
import AboutPage from "../layout/AboutPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ShortUrlsList /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/details/:id", element: <UrlDetails /> },
      { path: "/create-short-url", element: <CreateShortUrl /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
