import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Author } from './types/author';
import Swal from 'sweetalert2';
import { BaseAPIURL } from '../../utils/constant';
import axios from 'axios';
import Loading from '../Shared/Loadinng';

function ListaAutor() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Author[]>(`${BaseAPIURL}/api/author`);
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error al obtener la lista de autores', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar este autor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            await axios.delete(`${BaseAPIURL}/api/author/${id}`);
            setAuthors(authors.filter((author) => author.id !== id));
            Swal.fire('¡Eliminado!', 'El autor ha sido eliminado.', 'success');
          } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error al eliminar el autor', 'error');
          } finally {
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al intentar eliminar el autor', 'error');
    }
  };

  return (
    <>
      <h1 className="my-5">Autores</h1>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => navigate('/authors/new')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Autor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">ID Libro</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Apellido</th>
              <th className="py-2 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {authors.map((author) => (
              <tr key={author.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{author.id}</td>
                <td className="py-2 px-4 border-b">{author.idBook}</td>
                <td className="py-2 px-4 border-b">{author.firstName}</td>
                <td className="py-2 px-4 border-b">{author.lastName}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => navigate(`/authors/${author.id}/edit`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/authors/${author.id}/edit`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(author.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center">
                  <Loading />
                </td>
              </tr>
            )}
            {authors.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                  No hay autores para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListaAutor;