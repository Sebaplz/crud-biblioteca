import { IconArrowBackUp, IconEdit } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import ToastError from "../../util/ToastError";
import Toast from "../../util/Toast";

const EditBook = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { email } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/books/book/${id}`,
        );
        const data = await response.json();

        setValue("title", data.title);
        setValue("author", data.author);
        setValue("pages", data.pages);
        setValue("synopsis", data.synopsis);
        setValue("image", data.image);
      } catch (error) {
        console.error("Error al obtener la información del libro:", error);
      }
    };

    fetchBook();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_EDITBOOK}/${id}?email=${email}`,
        options,
      );

      if (response.ok) {
        setMessage("Libro actualizado correctamente");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError("Error al actualizar el libro");
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
            placeholder="Harry Potter"
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
            placeholder="J. K. Rowling"
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
                message: "Ingresa solo números en el campo de páginas",
              },
            })}
            id="pages"
            type="number"
            placeholder="$5000"
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
          <IconEdit color="white" size={20} />
          Actualizar Libro
        </button>
      </form>
      {message && <Toast message={message} />}
      {error && <ToastError message={error} />}
    </main>
  );
};

export default EditBook;
