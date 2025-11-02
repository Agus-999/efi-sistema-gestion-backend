require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Puerto de Railway o local
const port = process.env.PORT || 3000;

// ---------------------------
// CORS configurado correctamente
// ---------------------------
const allowedOrigins = [
  process.env.FRONTEND_URL, // URL de tu .env
  'http://localhost:5173'    // desarrollo local
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman o servidor sin origen
    // Regex para cualquier deploy de Vercel que empiece igual
    const vercelRegex = /^https:\/\/efi-sistema-gestion-frontent.*\.vercel\.app$/;
    if (allowedOrigins.includes(origin) || vercelRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // permite preflight OPTIONS

// ---------------------------
// Middlewares
// ---------------------------
app.use(express.json());

// Logging simple
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ---------------------------
// Rutas
// ---------------------------
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/projects', require('./routes/projects.routes'));
app.use('/tasks', require('./routes/tasks.routes'));
app.use('/resources', require('./routes/resources.routes'));

// ---------------------------
// Servidor
// ---------------------------
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
