import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAuthentication, error } = useUser();

  const onSubmit = (data) => {
    handleAuthentication(data, "register");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", {
              required: "Username no puede estar vacio!",
            })}
            placeholder="username"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.username?.message}</p>
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
            Crear Cuenta
          </button>
          <p className="mb-5 text-red-500">{error && <span>{error}</span>}</p>
        </form>
        <div className="flex justify-between">
          <Link
            to={"/"}
            className="text-center font-bold text-black transition-colors hover:text-[#e02957] hover:underline"
          >
            Volver al dashboard
          </Link>
          <Link
            to={"/login"}
            className="text-center font-bold text-black transition-colors hover:text-[#e02957] hover:underline"
          >
            Ya tengo una cuenta!
          </Link>
        </div>
      </section>
    </main>
  );
}
