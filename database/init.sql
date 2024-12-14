CREATE DATABASE IF NOT EXISTS syb_database;

USE syb_database;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    precio DECIMAL(10,2),
    categoria VARCHAR(100),
    stock INT
);

CREATE TABLE IF NOT EXISTS ofertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    descuento DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT
);

CREATE TABLE IF NOT EXISTS proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(255),
    contacto VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    info TINYINT(1) DEFAULT 0
);

--Insert de prueba en contactos
INSERT INTO contactos (nombre, email, mensaje)
VALUES ('Juan', 'juan@gmail.com', 'Hola, necesito ayuda con mi pedido.', 1);