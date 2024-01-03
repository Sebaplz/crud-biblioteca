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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
