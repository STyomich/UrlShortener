import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/redux/stores/index.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
