// BookForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from './types/book';
import { BaseAPIURL } from '../../utils/constant';
import Swal from 'sweetalert2';

const FormularioLibro: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    description: '',
    excerpt: '',
    pageCount: 0,
    publishDate: '',
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          Swal.showLoading();
          await axios.get<Book>(`${BaseAPIURL}/api/book/${id}`).then((res) => {
            setBook(res.data);
          }).catch((e) => {
            console.error(e);
            Swal.fire({
              title: 'Hubo un error',
              text: 'Error al intentar cargar el libro',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }).finally(() => {
            Swal.close();
          });
        } catch (error) {
          console.error(error);
          Swal.close();
        }
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBook({
      ...book,
      [name]: name === 'pageCount' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      Swal.showLoading();
      if (id) {
        await axios.put(`${BaseAPIURL}/api/book/${id}`, book).then(() => {
          Swal.fire({
            title: 'Libro actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }).catch((e) => {
          console.error(e);
          Swal.fire({
            title: 'Hubo un error',
            text: 'Error al intentar actualizar el libro',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }).finally(() => {
          Swal.close();
        });
      } else {
        await axios.post(`${BaseAPIURL}/api/book`, book).then(() => {
          Swal.fire({
            title: 'Libro guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }).catch((e) => {
          console.error(e);
          Swal.fire({
            title: 'Hubo un error',
            text: 'Error al intentar guardar el libro',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }).finally(() => {
          Swal.close();
        });
      }
      navigate('/books');
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className=" bg-gray-300 shadow-md shadow-white rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            value={book.title}
            onChange={handleChange}
            placeholder="Título del libro"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            value={book.description}
            onChange={handleChange}
            placeholder="Descripción del libro"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="excerpt">
            Extracto:
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            value={book.excerpt}
            onChange={handleChange}
            placeholder="Extracto del libro"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pageCount">
            Páginas:
          </label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            value={book.pageCount}
            onChange={handleChange}
            placeholder="Número de páginas"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishDate">
            Fecha de publicación:
          </label>
          <input
            type="date"
            id="publishDate"
            name="publishDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            value={book.publishDate ? new Date(book.publishDate).toISOString().split('T')[0] : ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioLibro;