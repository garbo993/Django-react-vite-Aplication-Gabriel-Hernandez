# Documentación del Proyecto

## Descripción
Este repositorio contiene una aplicación web desarrollada con Django en el backend y React con Vite en el frontend. La aplicación proporciona una consola de administración para gestionar usuarios y estadísticas de actividad.

## Tecnologías Utilizadas
- **Backend:** Django rest-framework
- **Frontend:** React con Vite
- **Base de Datos:** SQLite para desarrollo
- **Autenticación:** Django Authentication

## Requisitos Previos
Antes de instalar el proyecto, asegúrate de tener instalado:
- Python 3.x
- Node.js y npm

## Instalación y Configuración

### Backend (Django)
```sh
# Clonar el repositorio
git clone https://github.com/garbo993/Django-react-vite-Aplication-Gabriel-Hernandez.git
cd Django-react-vite-Aplication-Gabriel-Hernandez/backend

# Crear y activar un entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar la base de datos en settings.py

# Aplicar migraciones
python manage.py migrate

### En caso de que la base de datos aparezca vacia

ejecutar el archivo createusers.py
el cual creara los 35 ususarios y el super usuario
la plantilla de usuario sera

Username  = user#iteracion
            ej: user1
password = 1234 para todos los usuarios


# Ejecutar el servidor
python manage.py runserver
```

### Frontend (React con Vite)
```sh
# Moverse al directorio del frontend
cd ../frontend

# Instalar dependencias
npm install

# Ejecutar la aplicación
npm run dev
```

## Uso de la Aplicación
1. Acceder al backend en `http://127.0.0.1:8000/admin/` para gestionar usuarios.
2. Abrir el frontend en `http://localhost:5173/` para la interfaz de usuario.
3. Los usuarios pueden iniciar sesión y ver estadísticas sobre su actividad.

