import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardPublic from "./pages/DashboardPublic";
import AddBook from "./pages/AddBook";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardPrivate from "./pages/DashboardPrivate";
import InfoBook from "./pages/InfoBook";
import EditBook from "./pages/EditBook";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPublic />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/:id",
    element: <InfoBook />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPrivate />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/edit/:id",
        element: <EditBook />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
