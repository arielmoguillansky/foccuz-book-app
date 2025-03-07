# Personal Book Shelf

Esta es una aplicación hecha en NextJs v15 con app router.

## Setup

1. Instalar dependencias de Node

```bash
npm install
```

2. Crear archivo .env y definir la variable de entorno ```NEXT_PUBLIC_DATA_URL``` con la url de data

3. Inicializar el servidor

```bash
npm run dev
```

## Mejoras

- Esta primera versión es un MVP funcional con las funcionalidades mínimas necesarias.
- Algunas mejoras a introducir en próximos releases:

- Refactorización de código: componentizar elementos repetidos
- Filtrado por otras propiedades del libro: género, autor, año
- Funcionalidad de paginación o infinit-scrolling en la página de catálogo de libros
- Funcionalidad de ordenamiento por titulo o año
- Mejoras en la UI
- Aprovechar el lazyloading nativo de NextJs, utilizando Suspense para generar un skeleton durante el tiempo de cargado y asi mejorar la experiencia ante cargas lentas.
