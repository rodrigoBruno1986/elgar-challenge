# Challenge SSR - Gestión de Usuarios

## Descripción
Esta aplicación de React cuenta con un sistema de autenticación con roles (admin y usuario), permitiendo la navegación a distintas secciones según los permisos. Incluye un preloader que aparece mientras los datos de la API se están cargando. Además, permite la gestión de datos desde un panel de administración, y la búsqueda y paginación de datos.

### Funcionalidades
- **Autenticación**: Sistema de login con control de acceso por roles (Admin/Usuario).
- **Preloader**: Muestra un indicador de carga mientras los datos de la API se están obteniendo.
- **Panel de Administración**: Los administradores pueden crear, editar y eliminar datos.
- **Paginación**: Implementada para datos obtenidos desde la API y para datos locales.
- **Búsqueda**: Filtrado de datos tanto en la API como en los datos locales.

## Instalación

### Requisitos
- **Node.js**: Asegúrate de tener instalado Node.js en tu máquina. [Descargar Node.js](https://nodejs.org/).

### Pasos para la instalación
1. **Clonar el repositorio**:
   ```bash
   git clone git@github.com:rodrigoBruno1986/elgar-challenge.git

   npm install

   npm start
