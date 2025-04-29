# React + TypeScript + Vite

# Frontend para Gestión de Libros y Autores

Este proyecto es la interfaz de usuario desarrollada con React y TypeScript para interactuar con el backend de gestión de libros y autores (LibrosWebAPI). Permite a los usuarios visualizar listas de libros y autores, crear nuevos registros, editar la información existente y eliminar elementos.

## Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario dinámicas y reutilizables.
* **TypeScript:** Superset de JavaScript que añade tipado estático, mejorando la mantenibilidad y detección de errores en tiempo de desarrollo.
* **React Router DOM:** Proporciona componentes para la navegación declarativa en aplicaciones React con enrutamiento dinámico.
* **Axios:** Cliente HTTP basado en promesas utilizado para realizar solicitudes al backend API.
* **SweetAlert2:** Biblioteca para mostrar alertas responsivas y personalizables, mejorando la experiencia del usuario para confirmaciones y notificaciones.
* **Tailwind CSS:** Framework de CSS utility-first que facilita la aplicación de estilos de manera rápida y consistente utilizando clases predefinidas.

## Funcionalidades

La aplicación frontend ofrece las siguientes vistas y funcionalidades para la gestión de libros y autores:

### Libros

* **Lista de Libros:** Muestra una lista paginada de libros, incluyendo título, descripción, fecha de publicación y número de páginas. Implementa lazy loading para mejorar el rendimiento al cargar grandes cantidades de datos.
* **Agregar Nuevo Libro:** Formulario para crear nuevos registros de libros.
* **Editar Libro:** Formulario para modificar la información de un libro existente.
* **Eliminar Libro:** Funcionalidad para eliminar un libro específico con confirmación del usuario.

### Autores

* **Lista de Autores:** Muestra una lista de todos los autores, incluyendo su ID, ID de libro, nombre y apellido.
* **Agregar Nuevo Autor:** Formulario para crear nuevos registros de autores, asociándolos a un ID de libro.
* **Editar Autor:** Formulario para modificar la información de un autor existente.
* **Eliminar Autor:** Funcionalidad para eliminar un autor específico con confirmación del usuario.

## Estructura del Proyecto
Asistente de programación
Markdown

# Frontend para Gestión de Libros y Autores

Este proyecto es la interfaz de usuario desarrollada con React y TypeScript para interactuar con el backend de gestión de libros y autores (LibrosWebAPI). Permite a los usuarios visualizar listas de libros y autores, crear nuevos registros, editar la información existente y eliminar elementos.

## Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario dinámicas y reutilizables.
* **TypeScript:** Superset de JavaScript que añade tipado estático, mejorando la mantenibilidad y detección de errores en tiempo de desarrollo.
* **React Router DOM:** Proporciona componentes para la navegación declarativa en aplicaciones React con enrutamiento dinámico.
* **Axios:** Cliente HTTP basado en promesas utilizado para realizar solicitudes al backend API.
* **SweetAlert2:** Biblioteca para mostrar alertas responsivas y personalizables, mejorando la experiencia del usuario para confirmaciones y notificaciones.
* **Tailwind CSS:** Framework de CSS utility-first que facilita la aplicación de estilos de manera rápida y consistente utilizando clases predefinidas.

## Funcionalidades

La aplicación frontend ofrece las siguientes vistas y funcionalidades para la gestión de libros y autores:

### Libros

* **Lista de Libros:** Muestra una lista paginada de libros, incluyendo título, descripción, fecha de publicación y número de páginas. Implementa lazy loading para mejorar el rendimiento al cargar grandes cantidades de datos.
* **Agregar Nuevo Libro:** Formulario para crear nuevos registros de libros.
* **Editar Libro:** Formulario para modificar la información de un libro existente.
* **Eliminar Libro:** Funcionalidad para eliminar un libro específico con confirmación del usuario.

### Autores

* **Lista de Autores:** Muestra una lista de todos los autores, incluyendo su ID, ID de libro, nombre y apellido.
* **Agregar Nuevo Autor:** Formulario para crear nuevos registros de autores, asociándolos a un ID de libro.
* **Editar Autor:** Formulario para modificar la información de un autor existente.
* **Eliminar Autor:** Funcionalidad para eliminar un autor específico con confirmación del usuario.

## Estructura del Proyecto
```typescript
frontend/
├── src/
│   ├── components/
│   ├── autor/
│   │   ├── types/
│   │   │   │   ├── autor.d.ts      (Definiciones de tipo para la entidad Autor)
│   │   ├── FormularioAutor.tsx      (Formulario para agregar/editar autores)
│   │   ├── ListaAutor.tsx      (Lista de autores)
│   │   └── ... otros componentes reutilizables
│   ├── book/
│   │   ├── types/
│   │   │   │   ├── book.d.ts    (Definiciones de tipo para la entidad Libro)
│   │   ├── FormularioLibro.tsx    (Formulario para agregar/editar libros)
│   │   ├── ListaLibros.tsx        (Lista de libros con lazy loading)
│   │   ├── ListaLibros.tsx        (Lista de libros con lazy loading)    
│   ├── shared/
│   │   ├── Loading.tsx         (Componente de carga visual)
│   ├── layout/
│   │   ├── Index.tsx         (Layout de la app web)
│   │   ├── Navbar.tsx         (Navegador de la app web)
│   ├── utils/
│   │   └── constant.ts         (Archivo para definir constantes como la URL base de la API)
│   │   ├── helper.ts       (Funciones generales de utilidad)    
│   ├── App.tsx                 (Componente principal de la aplicación)
│   ├── index.tsx               (Punto de entrada de la aplicación)
│   └── ... otros archivos de la aplicación
├── public/
├── ... otros archivos de configuración (package.json, tsconfig.json, etc.)
```

## Configuración

La URL base del backend API (.NET LibrosWebAPI) se define en el archivo `src/utils/constant.ts`. Necesitas actualizar la variable `BaseAPIURL` con la URL correcta donde se está ejecutando tu backend.

```typescript
export const BaseAPIURL = 'TU_URL_DEL_BACKEND_NET'; // Reemplaza con la URL de la API .NET

Asistente de programación
Markdown

# Frontend para Gestión de Libros y Autores

Este proyecto es la interfaz de usuario desarrollada con React y TypeScript para interactuar con el backend de gestión de libros y autores (LibrosWebAPI). Permite a los usuarios visualizar listas de libros y autores, crear nuevos registros, editar la información existente y eliminar elementos.

## Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario dinámicas y reutilizables.
* **TypeScript:** Superset de JavaScript que añade tipado estático, mejorando la mantenibilidad y detección de errores en tiempo de desarrollo.
* **React Router DOM:** Proporciona componentes para la navegación declarativa en aplicaciones React con enrutamiento dinámico.
* **Axios:** Cliente HTTP basado en promesas utilizado para realizar solicitudes al backend API.
* **SweetAlert2:** Biblioteca para mostrar alertas responsivas y personalizables, mejorando la experiencia del usuario para confirmaciones y notificaciones.
* **Tailwind CSS:** Framework de CSS utility-first que facilita la aplicación de estilos de manera rápida y consistente utilizando clases predefinidas.

## Funcionalidades

La aplicación frontend ofrece las siguientes vistas y funcionalidades para la gestión de libros y autores:

### Libros

* **Lista de Libros:** Muestra una lista paginada de libros, incluyendo título, descripción, fecha de publicación y número de páginas. Implementa lazy loading para mejorar el rendimiento al cargar grandes cantidades de datos.
* **Agregar Nuevo Libro:** Formulario para crear nuevos registros de libros.
* **Editar Libro:** Formulario para modificar la información de un libro existente.
* **Eliminar Libro:** Funcionalidad para eliminar un libro específico con confirmación del usuario.

### Autores

* **Lista de Autores:** Muestra una lista de todos los autores, incluyendo su ID, ID de libro, nombre y apellido.
* **Agregar Nuevo Autor:** Formulario para crear nuevos registros de autores, asociándolos a un ID de libro.
* **Editar Autor:** Formulario para modificar la información de un autor existente.
* **Eliminar Autor:** Funcionalidad para eliminar un autor específico con confirmación del usuario.

## Estructura del Proyecto

frontend/
├── src/
│   ├── components/
│   │   ├── AuthorForm.tsx      (Formulario para agregar/editar autores)
│   │   ├── AuthorList.tsx      (Lista de autores)
│   │   ├── BookForm.tsx        (Formulario para agregar/editar libros)
│   │   ├── BookList.tsx        (Lista de libros con lazy loading)
│   │   ├── Loading.tsx         (Componente de carga visual)
│   │   └── ... otros componentes reutilizables
│   ├── hooks/
│   │   └── useApi.ts           (Hook personalizado para simplificar llamadas a la API)
│   ├── types/
│   │   ├── author.ts           (Definiciones de tipo para la entidad Autor)
│   │   └── book.ts             (Definiciones de tipo para la entidad Libro)
│   ├── utils/
│   │   └── constant.ts         (Archivo para definir constantes como la URL base de la API)
│   ├── App.tsx                 (Componente principal de la aplicación)
│   ├── index.tsx               (Punto de entrada de la aplicación)
│   └── ... otros archivos de la aplicación
├── public/
├── ... otros archivos de configuración (package.json, tsconfig.json, etc.)


## Configuración

La URL base del backend API (.NET LibrosWebAPI) se define en el archivo `src/utils/constant.ts`. Necesitas actualizar la variable `BaseAPIURL` con la URL correcta donde se está ejecutando tu backend.

```typescript
export const BaseAPIURL = 'TU_URL_DEL_BACKEND_NET'; // Reemplaza con la URL de tu API .NET
```
Ejecución
Navega al directorio frontend en tu terminal:


cd frontend
Instala las dependencias del proyecto utilizando npm:

```bash
npm install

```
Inicia la aplicación en modo de desarrollo:
```bash
npm run dev
```

Esto abrirá la aplicación en tu navegador (generalmente en http://localhost:3000).
