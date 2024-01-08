import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashboardPublic from "./pages/DashboardPublic";
import AddBook from "./pages/AddBook";
import { ProtectedRoute } from "./auth/rules/ProtectedRoute";
import DashboardPrivate from "./pages/DashboardPrivate";
import InfoBook from "./pages/InfoBook";
import EditBook from "./pages/EditBook";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { ProtectedAuth } from "./auth/rules/ProtectedAuth";

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
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
