import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Author } from './types/author';
import { BaseAPIURL } from '../../utils/constant';
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthorForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author>({
    id: 0,
    idBook: 0,
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      if (id) {
        Swal.showLoading();
        try {
          const response = await axios.get<Author>(`${BaseAPIURL}/api/author/${id}`);
          setAuthor(response.data);
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Error al cargar el autor', 'error');
        } finally {
          Swal.close();
        }
      }
    };

    fetchAuthor();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthor({
      ...author,
      [name]: name === 'idBook' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    Swal.showLoading();
    try {
      if (id) {
        await axios.put(`${BaseAPIURL}/api/author/${id}`, author);
        Swal.fire('Autor actualizado', '', 'success');
      } else {
        await axios.post(`${BaseAPIURL}/api/author`, author);
        Swal.fire('Autor creado', '', 'success');
      }
      navigate('/authors');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Hubo un problema al guardar el autor', 'error');
    } finally {
        Swal.close();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">{id ? 'Editar Autor' : 'Agregar Nuevo Autor'}</h2>
      <form onSubmit={handleSubmit} className="bg-gray-300 shadow-md shadow-white rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="idBook" className="block text-gray-700 text-sm font-bold mb-2">ID Libro:</label>
          <input type="number" id="idBook" name="idBook" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" value={author.idBook} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input type="text" id="firstName" name="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" value={author.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Apellido:</label>
          <input type="text" id="lastName" name="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" value={author.lastName} onChange={handleChange} required />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {id ? 'Actualizar' : 'Guardar'}
          </button>
          <button type="button" onClick={() => navigate('/authors')} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;