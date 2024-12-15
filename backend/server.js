const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');
const client = require("prom-client");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configuración de conexión a base de datos
const pool = mysql.createPool({
  host: 'database',
  user: 'root',
  password: 'mipassword',
  database: 'syb_database',
});

// Ruta para obtener usuarios
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear usuarios
app.post('/api/users', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email) VALUES (?, ?)', 
      [nombre, email]
    );
    res.status(201).json({ 
      id: result.insertId, 
      nombre, 
      email 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un contacto
app.post('/api/contact', (req, res) => {
  const { name, email, message} = req.body;

  // Insertar los datos en la base de datos
  pool.query(
    'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)',
    [name, email, message],
    (error, results) => {
      if (error) {
        console.error('Error al insertar en la base de datos:', error);
        return res.status(500).json({ error: 'Error al guardar los datos.' });
      }
      res.status(201).json({
        id: results.insertId,
        nombre,
        email,
        mensaje,
      });
    }
  );
  res.redirect("/");
});

// Inicializar métricas de prom-client
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Recoge métricas predeterminadas del sistema

// Definir un contador personalizado
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de solicitudes HTTP',
  labelNames: ['method', 'route', 'status'],
});

// Middleware para registrar métricas por solicitud
app.use((req, res, next) => {
  res.on('finish', () => {
    requestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Endpoint para Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});