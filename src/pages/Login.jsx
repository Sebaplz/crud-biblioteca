import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const loginUser = async (data) => {
    const url = "http://localhost:8080/api/user/login";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }
      const data = await response.text();
      localStorage.setItem("tokenPrueba", data);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales o inténtalo más tarde.",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="m-5 w-full rounded-lg bg-white p-5 shadow-lg md:w-[450px]">
        <div className="flex justify-end p-2">
          <img src="Logo_rojo.webp" alt="Logo" className="w-20" />
        </div>
        <h1 className="mb-8 text-center text-4xl font-semibold italic">
          Biblioteca Virtual
        </h1>
        <form onSubmit={handleSubmit(loginUser)}>
          <input
            {...register("email", {
              required: "Email no puede estar vacio!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Debe ser un email valido!",
              },
            })}
            autoComplete="email"
            placeholder="email@email.com"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.email?.message}</p>
          <input
            {...register("password", {
              required: "Password no puede estar vacio!",
            })}
            type="Password"
            placeholder="********"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.password?.message}</p>
          <button
            className="h-12 w-full rounded-lg bg-[#e02957] font-bold text-white"
            type="submit"
          >
            Iniciar Sesión
          </button>
          <p className="mb-5 text-red-500">{error && <span>{error}</span>}</p>
        </form>
        <Link
          to={"/"}
          className="font-bold text-black transition-colors hover:text-[#e02957] hover:underline"
        >
          Volver al dashboard
        </Link>
      </section>
    </main>
  );
}
