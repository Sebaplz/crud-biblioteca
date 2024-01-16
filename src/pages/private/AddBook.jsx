import { IconArrowBackUp, IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const AddBook = () => {
  const [info, setInfo] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { email } = useAuth();

  const onSubmit = async (data) => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_ADDBOOK}?email=${email}`,
        options,
      );

      if (response.ok) {
        setInfo("Libro agregado correctamente");
        reset();
        setTimeout(() => {
          setInfo(null);
        }, 1000);
      } else {
        setInfo("Error al agregar el libro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pt-36 lg:px-0 lg:pt-40">
      <div className="mb-4 flex lg:mb-0">
        <Link to={"/dashboard"}>
          <IconArrowBackUp color="#e02957" size={30} />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="mb-1 block font-semibold text-gray-700"
          >
            Nombre del Libro:
          </label>
          <input
            {...register("title", {
              required: "Nombre no puede estar vacío",
            })}
            id="title"
            placeholder="Clean Code"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.title?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="author"
            className="mb-1 block font-semibold text-gray-700"
          >
            Autor:
          </label>
          <input
            {...register("author", {
              required: "Autor no puede estar vacío",
            })}
            id="author"
            placeholder="Robert C. Martin"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.author?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="pages"
            className="mb-1 block font-semibold text-gray-700"
          >
            Páginas:
          </label>
          <input
            {...register("pages", {
              required: "Páginas no puede estar vacío",
              pattern: {
                value: /^[0-9]+$/,
                message: "Ingresa solo números en el campo de pginas",
              },
            })}
            id="pages"
            type="number"
            placeholder="500"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.pages?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="synopsis"
            className="mb-1 block font-semibold text-gray-700"
          >
            Sinopsis:
          </label>
          <textarea
            {...register("synopsis", {
              required: "Sinopsis no puede estar vacía",
            })}
            id="synopsis"
            placeholder="lorem ipsum..."
            className="w-full rounded-lg border p-2"
            maxLength={200}
          />
          <p className="text-red-500">{errors.synopsis?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="image"
            className="mb-1 block font-semibold text-gray-700"
          >
            URL de la Imagen:
          </label>
          <input
            {...register("image", {
              required: "Imagen no puede estar vacía",
            })}
            id="image"
            placeholder="url/imagen"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.image?.message}</p>
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105"
        >
          <IconCirclePlus color="white" size={20} />
          Agregar Libro
        </button>
      </form>
      {info && <p className="mt-4 text-center">{info}</p>}
    </main>
  );
};

export default AddBook;
