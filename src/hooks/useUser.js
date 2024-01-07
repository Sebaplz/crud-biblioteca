import { /* useEffect */ useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const useUser = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuthentication = async (data, url) => {
    const urlBase = `http://localhost:8080/api/user/${url}`;
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(urlBase, options);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }
      const data = await response.json();
      login();
      localStorage.setItem("userRol", data.role);
      localStorage.setItem("username", data.username);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales o inténtalo más tarde.",
      );
    }
  };

  return { handleAuthentication, error };
};

export default useUser;
