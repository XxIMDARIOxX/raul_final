const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');

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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});