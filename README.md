# Blog de Jonathan Leiva - Frontend

## Descripción

Este es el frontend para el Blog de Jonathan Leiva, desarrollado con Next.js 15, React 19 y TypeScript. El proyecto
utiliza varias tecnologías modernas para ofrecer una experiencia de usuario fluida y una interfaz atractiva.

## Requisitos previos

- Node.js (versión recomendada: 20.x o superior)
- npm (incluido con Node.js)
- Una cuenta en Cloudinary para la gestión de imágenes

## Instalación

1. Clona este repositorio:

```shell script
git clone https://github.com/tu-usuario/jonathanleivag-blog-fronted.git
   cd jonathanleivag-blog-fronted
```

2. Instala las dependencias:

```shell script
npm install
```

3. Crea un archivo `.env.local` basado en `.env.example`:

```shell script
cp .env.example .env.local
```

4. Configura las variables de entorno en el archivo `.env.local` con tus credenciales.

## Variables de entorno

El proyecto requiere las siguientes variables de entorno:

| Variable                          | Descripción                                     |
|-----------------------------------|-------------------------------------------------|
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Nombre de la nube de Cloudinary                 |
| BACKEND_URL                       | URL del backend para conexiones internas        |
| BACKEND_URL_WEB                   | URL del backend para conexiones web             |
| NEXT_PUBLIC_BACKEND_URL           | URL pública del backend                         |
| NODE_ENV                          | Entorno de ejecución (production o development) |
| SAMESITE                          | Política SameSite para cookies (lax o strict)   |
| NEXT_PUBLIC_TINY_API_KEY          | Clave API para TinyMCE                          |
| NEXT_PUBLIC_UPLOADPRESET          | Preset de carga para Cloudinary                 |
| NEXT_PUBLIC_SITE_URL              | URL pública del sitio                           |
| CLOUDINARY_CLOUD_NAME             | Nombre de la nube de Cloudinary                 |
| CLOUDINARY_API_KEY                | Clave API de Cloudinary                         |
| CLOUDINARY_API_SECRET             | Secreto API de Cloudinary                       |
| FORLDER                           | Carpeta para almacenar archivos en Cloudinary   |

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo con Turbopack
- `npm run build`: Compila el proyecto para producción
- `npm run start`: Inicia el servidor en modo producción
- `npm run lint`: Ejecuta el linter para verificar errores de código

## Tecnologías principales

- **Next.js 15**: Framework React con renderizado del lado del servidor
- **React 19**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Redux Toolkit**: Gestión de estado
- **Tailwind CSS**: Framework CSS utilitario
- **Cloudinary**: Servicio de gestión de imágenes
- **TinyMCE**: Editor de texto enriquecido
- **Formik + Yup**: Gestión y validación de formularios

## Características

- Interfaz de usuario moderna con animaciones usando Framer Motion
- Gestión de estado global con Redux
- Editor de markdown para creación de contenido
- Carga y gestión de imágenes con Cloudinary
- Diseño responsive y optimizado

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

## Contacto

Jonathan Leiva - [github.com/jonathanleivag](https://github.com/jonathanleivag)
[@jonathanleivag](https://www.instagram.com/jonathanleivag/)
