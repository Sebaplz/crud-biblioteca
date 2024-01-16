import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardPublic from "./pages/public/DashboardPublic";
import AddBook from "./pages/private/AddBook";
import { ProtectedRoute } from "./auth/rules/ProtectedRoute";
import DashboardPrivate from "./pages/private/DashboardPrivate";
import InfoBook from "./pages/public/InfoBook";
import EditBook from "./pages/private/EditBook";
import Register from "./pages/auth/Register";
import Layout from "./pages/Layout";
import { ProtectedAuth } from "./auth/rules/ProtectedAuth";
import AllUsers from "./pages/private/AllUsers";
import Statistics from "./pages/private/Statistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPublic />} />
          <Route path="/book/:id" element={<InfoBook />} />
        </Route>
        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPrivate />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
