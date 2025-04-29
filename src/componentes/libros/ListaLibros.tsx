import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from './types/book';
import Swal from 'sweetalert2';
import { BaseAPIURL } from '../../utils/constant';
import axios from 'axios';
import Loading from '../Shared/Loadinng';

const PAGE_SIZE = 10;

function ListaLibros() {

    const [books, setBooks] = useState<Array<Book>>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loadedPages = useRef<Set<number>>(new Set());
    const observer = useRef<IntersectionObserver | null>(null);
    const lastBookElementRef = useCallback((node: HTMLTableRowElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const navegador = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            if (loadedPages.current.has(page)) {
                return;
            }
            
            try {
                setLoading(true);
                await axios.get<Book[]>(`${BaseAPIURL}/api/book`).then((response) => {
                    setBooks(prevBooks => [...prevBooks, ...response.data.filter(book => !prevBooks.some(b => b.id === book.id))]);
                if (response.data.length < PAGE_SIZE) {
                    setHasMore(false);
                }
                loadedPages.current.add(page);
                }).catch((e) => {
                    console.error(e);
                    Swal.fire({
                        title: 'Hubo un error',
                        text: 'Error al obtener la lista de libros',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    setHasMore(false);
                }).finally(() => {
                    setLoading(false);
                });

            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Hubo un error',
                    text: 'Error al obtener la lista de libros',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        };

        fetchBooks();
    }, [page]);

    const handleDelete = async (id: number) => {
        try {
            Swal.fire({
                title: 'Esta seguro que desea eliminar el libro?',
                icon: 'info',
                confirmButtonText: 'Si',
                showCancelButton: true,
                cancelButtonText: "No, volver"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    Swal.showLoading();
                    await axios.delete(`${BaseAPIURL}/api/book/${id}`).then(() => {
                        setBooks(books.filter((book) => book.id !== id));
                    }).then(() => {
                        Swal.close();
                    }).catch((e) => {
                        console.error(e);
                        Swal.fire({
                            title: 'Hubo un error',
                            text: 'Error al intentar eliminar el libro',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }).finally(() => {
                        Swal.close();
                    });
                } else {
                    Swal.close();
                }
            })

        } catch (error) {
            console.error(error);
            alert('Error al eliminar el libro.');
        }
    };


    return (
        <>
            <h1 className="my-5">Libros</h1>
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => navegador('/books/new')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Agregar Libro
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">Título</th>
                            <th className="py-2 px-4 border-b text-left">Descripción</th>
                            <th className="py-2 px-4 border-b text-left">Fecha de Publicación</th>
                            <th className="py-2 px-4 border-b text-left">Páginas</th>
                            <th className="py-2 px-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {books.map((libro, index) => {
                            const isLastBook = index === books.length - 1;
                            return (
                                <tr key={libro.id} className="hover:bg-gray-50" ref={isLastBook ? lastBookElementRef : null}>
                                    <td className="py-2 px-4 border-b">{libro.id}</td>
                                    <td className="py-2 px-4 border-b">{libro.title}</td>
                                    <td className="py-2 px-4 border-b">{libro.description}</td>
                                    <td className="py-2 px-4 border-b">{libro.publishDate}</td>
                                    <td className="py-2 px-4 border-b">{libro.pageCount}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => { handleDelete(libro.id) }}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={() => navegador(`/books/${libro.id}/edit`)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => navegador(`/books/${libro.id}`)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {loading && (
                            <tr>
                                <td colSpan={6} className="py-4 px-4 text-center">
                                    <Loading />
                                </td>
                            </tr>
                        )}
                        {!loading && books.length === 0 && !hasMore && (
                            <tr>
                                <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                                    No hay libros para mostrar.
                                </td>
                            </tr>
                        )}
                        {!loading && !hasMore && books.length > 0 && (
                            <tr>
                                <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                                    No hay más libros para cargar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListaLibros;