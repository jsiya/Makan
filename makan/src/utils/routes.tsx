import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
          {
            path: '/Home',
            element: <HomePage/>,
            errorElement: <ErrorPage/>
          },
        ],
        errorElement: <ErrorPage/>
      },
]);