require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Railway asigna el puerto automáticamente
const port = process.env.PORT || 3000;

// ---------------------------
// CORS: permite tu frontend en Vercel
// ---------------------------
const corsOptions = {
  origin: 'https://efi-sistema-gestion-frontent.vercel.app', // URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ---------------------------
// Middlewares
// ---------------------------
app.use(express.json());

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
// Escuchar en 0.0.0.0 para conexiones externas
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
