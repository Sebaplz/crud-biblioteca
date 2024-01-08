import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashboardPublic from "./pages/DashboardPublic";
import AddBook from "./pages/AddBook";
import { ProtectedRoute } from "./auth/rules/ProtectedRoute";
import DashboardPrivate from "./pages/DashboardPrivate";
import InfoBook from "./pages/InfoBook";
import EditBook from "./pages/EditBook";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
/* import { ProtectedDashboard } from "./auth/rules/ProtectedDashboard"; */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPublic />} />
          <Route path="/:id" element={<InfoBook />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPrivate />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
