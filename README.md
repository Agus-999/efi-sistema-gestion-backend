# ⚙️ Enterprise Management API (Backend - Node.js)

Esta es la capa de servicios y lógica de negocio para un sistema integral de gestión de proyectos y tareas. Desarrollada con **Node.js** y **Express**, esta API REST proporciona una arquitectura robusta para la administración de recursos, autenticación basada en roles y persistencia de datos relacional.

### 🛠️ Stack Tecnológico
* **Runtime:** Node.js
* **Framework:** Express.js
* **Base de Datos:** MySQL / PostgreSQL (Gestionado a través de modelos relacionales).
* **Seguridad:** Middleware de autenticación y control de acceso por roles (RBAC).
* **Notificaciones:** Sistema de utilidades para envío de correos electrónicos.

### 🌟 Capacidades Técnicas y Arquitectura
* **Patrón de Diseño MVC:** Separación estricta entre modelos de datos, controladores de lógica y rutas de exposición.
* **Seguridad Avanzada:** Implementación de middlewares para la protección de rutas y validación de permisos de usuario.
* **Gestión de Entidades Complejas:** Endpoints especializados para la administración de proyectos, tareas, recursos y usuarios.
* **Persistencia Escalable:** Uso de migraciones para el control de versiones de la estructura de la base de datos.
* **API RESTful:** Comunicación estandarizada mediante JSON para el consumo desde clientes Frontend.

### 📁 Estructura del Ecosistema
```
backend/
├── controllers/    # Lógica de negocio (Projects, Tasks, Users, Auth)
├── models/         # Definición de esquemas de datos (Sequelize/ORM)
├── routes/         # Definición de endpoints y métodos HTTP
├── middleware/     # Control de autenticación y validación de roles
├── db/             # Configuración y conexión a la base de datos
└── utils/          # Funciones auxiliares (Emailing, Helpers)
```

### 🚀 Conectividad
* **Este servidor está diseñado específicamente para alimentar al:** 👉Repositorio Frontend del Sistema

### ⚙️ Instalación

1. Clonar el repositorio.

2. Configurar variables de entorno en un archivo .env(DB_HOST, DB_USER, etc.).

3. Instalar dependencias: npm install.

4. Iniciar servidor: npm run dev.

Desarrollado por **Agustín Alejandro Fasano**
*Técnico Superior en Desarrollo de Software*
