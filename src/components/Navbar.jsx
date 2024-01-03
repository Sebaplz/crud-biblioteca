import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const handleCerrarSesion = () => {
    logout();
  };

  return (
    <nav className="fixed w-full bg-white p-4 text-black lg:py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/Logo_rojo.webp" alt="Logo ACL" className="w-20" />
          <Link
            to={"/dashboard"}
            className="hidden font-bold text-black transition-colors hover:text-[#e02957] hover:underline md:block"
          >
            Biblioteca Virtual
          </Link>
        </div>
        {isAuthenticated ? (
          <Link
            to={"/"}
            onClick={handleCerrarSesion}
            className="rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105 lg:p-3"
          >
            Cerrar Sesión
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105 lg:p-3"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
