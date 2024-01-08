import { IconArrowBackUp } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddBook = () => {
  const [info, setInfo] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/books/new",
        options,
      );

      if (response.ok) {
        setInfo("Libro agregado correctamente");
        reset();
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
            htmlFor="nombre"
            className="mb-1 block font-semibold text-gray-700"
          >
            Nombre del Libro:
          </label>
          <input
            {...register("nombre", {
              required: "Nombre no puede estar vacío",
            })}
            id="nombre"
            placeholder="Harry Potter"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.nombre?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="autor"
            className="mb-1 block font-semibold text-gray-700"
          >
            Autor:
          </label>
          <input
            {...register("autor", {
              required: "Autor no puede estar vacío",
            })}
            id="autor"
            placeholder="J. K. Rowling"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.autor?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="precio"
            className="mb-1 block font-semibold text-gray-700"
          >
            Precio:
          </label>
          <input
            {...register("precio", {
              required: "Precio no puede estar vacío",
              pattern: {
                value: /^[0-9]+$/,
                message: "Ingresa solo números en el campo de precio",
              },
            })}
            id="precio"
            type="number"
            placeholder="$5000"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.precio?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="sinopsis"
            className="mb-1 block font-semibold text-gray-700"
          >
            Sinopsis:
          </label>
          <textarea
            {...register("sinopsis", {
              required: "Sinopsis no puede estar vacía",
            })}
            id="sinopsis"
            placeholder="lorem ipsum..."
            className="w-full rounded-lg border p-2"
            maxLength={200}
          />
          <p className="text-red-500">{errors.sinopsis?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="imagen"
            className="mb-1 block font-semibold text-gray-700"
          >
            URL de la Imagen:
          </label>
          <input
            {...register("imagen", {
              required: "Imagen no puede estar vacía",
            })}
            id="imagen"
            placeholder="url/imagen"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.imagen?.message}</p>
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105"
        >
          Agregar Libro
        </button>
      </form>
      {info && <p className="mt-4 text-center">{info}</p>}
    </main>
  );
};

export default AddBook;
