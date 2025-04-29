import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Author } from './types/author';
import { BaseAPIURL } from '../../utils/constant';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loadinng';

function AuthorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Author>(`${BaseAPIURL}/api/author/${id}`);
        setAuthor(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Error al cargar los detalles del autor', 'error');
        navigate('/authors');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthor();
    }
  }, [id, navigate]);

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
            Swal.fire('¡Eliminado!', 'El autor ha sido eliminado.', 'success').then(() => {
              navigate('/authors');
            });
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

  if (loading) {
    return <Loading />;
  }

  if (!author) {
    return <div className="text-center mt-8 text-gray-500">Autor no encontrado.</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Detalles del Autor</h2>
      <div className="mb-4">
        <strong>ID:</strong> {author.id}
      </div>
      <div className="mb-4">
        <strong>ID Libro:</strong> {author.idBook}
      </div>
      <div className="mb-4">
        <strong>Nombre:</strong> {author.firstName}
      </div>
      <div className="mb-4">
        <strong>Apellido:</strong> {author.lastName}
      </div>
      <div className="flex justify-end">
        <button onClick={() => navigate('/authors')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Volver
        </button>
        <button onClick={() => navigate(`/authors/${author.id}/edit`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
          Editar
        </button>
        <button onClick={() => handleDelete(author.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default AuthorDetails;