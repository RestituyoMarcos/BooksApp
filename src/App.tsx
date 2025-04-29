import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './componentes/layout/Index'
import ListaLibros from './componentes/libros/ListaLibros'
import FormularioLibro from './componentes/libros/FormularioLibro'
import DetallesLibro from './componentes/libros/DetallesLibro'
import ListaAutor from './componentes/author/ListaAutor'
import FormularioAutor from './componentes/author/FormularioAutor'

function App() {

  return (
    <>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<ListaLibros />} />
                <Route path="/books" element={<ListaLibros />} />
                <Route path="/books/new" element={<FormularioLibro />} />
                <Route path="/books/:id" element={<DetallesLibro />} />
                <Route path="/books/:id/edit" element={<FormularioLibro />} />
                <Route path="/authors" element={<ListaAutor />} />
                <Route path="/authors/new" element={<FormularioAutor />} />
                <Route path="/authors/:id" element={<DetallesLibro />} />
                <Route path="/authors/:id/edit" element={<FormularioAutor />} />
              </Route>
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
