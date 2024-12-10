const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de conexión a base de datos
const pool = mysql.createPool({
  host: 'database',
  user: 'root',
  password: 'mipassword',
  database: 'miapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});