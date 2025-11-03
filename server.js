require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Puerto de Railway o 3000 local
const port = process.env.PORT || 3000;

// ---------------------------
// CORS: permitir frontend de Vercel (y localhost)
// ---------------------------
const corsOptions = {
    origin: (origin, callback) => {
        // 1. URLs de prueba y producción estáticas
        const whitelist = [
            process.env.FRONTEND_URL, // Debería ser la URL principal de Vercel
            'http://localhost:5173'
        ];
        
        // 2. Expresión regular robusta para aceptar cualquier subdominio dinámico de Vercel
        // Esto captura dominios como 'nombre-id-random.vercel.app'
        const vercelRegex = /^https:\/\/[a-z0-9]+(-[a-z0-9]+)*\.vercel\.app$/i; // El 'i' hace la búsqueda insensible a mayúsculas/minúsculas

        // Condición de aceptación:
        // Acepta si no hay origen (solicitud local/servidor), si está en la lista blanca, o si coincide con el patrón Vercel.
        if (!origin || whitelist.includes(origin) || vercelRegex.test(origin)) {
            callback(null, true);
        } else {
            console.error('CORS bloqueado para:', origin);
            callback(new Error(`No permitido por CORS. Origen: ${origin}`));
        }
    },
    // Es CRUCIAL que estos métodos estén aquí para el 'preflight' (solicitudes OPTIONS)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Añadimos X-Requested-With por si acaso
    credentials: true // Crucial si usas sesiones o cookies
};

// Aplicar CORS correctamente
app.use(cors(corsOptions));

// ---------------------------
// Middlewares
// ---------------------------
app.use(express.json());

// Logging simple de requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ---------------------------
// Rutas
// ---------------------------
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const projectsRouter = require('./routes/projects.routes');
const tasksRouter = require('./routes/tasks.routes');
const resourcesRouter = require('./routes/resources.routes');

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/resources', resourcesRouter);

// ---------------------------
// Servidor
// ---------------------------
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});