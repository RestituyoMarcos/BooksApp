import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Book } from './types/book';
import { BaseAPIURL } from '../../utils/constant';
import { formatDateLocaleString } from '../../utils/helper';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loadinng';

const DetallesLibro = () => {
  const { id } = useParams();
  const navegador = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(`${BaseAPIURL}/api/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Hubo un error',
          text: 'Error al obtener el libro.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: '¿Estás seguro que deseas eliminar el libro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, volver'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.showLoading();
          try {
            await axios.delete(`${BaseAPIURL}/api/book/${book!.id}`);
            Swal.fire(
              '¡Eliminado!',
              'El libro ha sido eliminado.',
              'success'
            );
            navegador('/books');
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: 'Hubo un error',
              text: 'Error al intentar eliminar el libro.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          } finally {
            Swal.close();
          }
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Hubo un error',
        text: 'Error al intentar eliminar el libro.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  if (!book) {
    return <div className="flex justify-center items-center h-48 text-gray-500"><Loading /></div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto mt-8">
      <div className="bg-gray-100 py-4 px-6 border-b border-gray-200">
        <h5 className="text-xl font-semibold text-gray-800">{book.title}</h5>
        <p className="text-sm text-gray-500 mt-1">{formatDateLocaleString(book.publishDate)}</p>
      </div>
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed">{book.description}</p>
        {book.excerpt && (
          <blockquote className="mt-4 border-l-4 border-blue-500 italic pl-4 text-gray-600">
            {book.excerpt}
          </blockquote>
        )}
        <p className="text-gray-600 mt-2">Páginas: {book.pageCount}</p>
      </div>
      <div className="bg-gray-100 py-3 px-6 border-t border-gray-200 flex justify-between items-center">
        <button
          onClick={() => navegador('/books')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
        >
          Volver
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DetallesLibro;