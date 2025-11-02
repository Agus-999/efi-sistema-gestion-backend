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
    const whitelist = [
      process.env.FRONTEND_URL, // URL en .env
      'http://localhost:5173'
    ];
    const vercelRegex = /^https:\/\/efi-sistema-gestion-frontent.*\.vercel\.app$/;

    if (!origin || whitelist.includes(origin) || vercelRegex.test(origin)) {
      callback(null, true);
    } else {
      console.log('CORS bloqueado para:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
