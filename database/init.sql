CREATE DATABASE IF NOT EXISTS syb_database;

USE syb_database;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    precio DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS ofertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    descuento DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);


CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL
);

--Insert de prueba en contactos
INSERT INTO contactos (nombre, email, mensaje)
VALUES ('Juan', 'juan@gmail.com', 'Hola, necesito ayuda con mi pedido.');


--Insert de productos
INSERT INTO productos (nombre, descripcion, precio)
VALUES ('Carne de Hamburguesa', 'Carne de res para hamburgesa', 12.99), 
('Patatas', 'Papas congeladas para freir', 4.99),
('Coca-Cola', 'Bebida gaseosa de cola', 2.99);

--Insert de ofertas
INSERT INTO ofertas (producto_id, descuento, fecha_inicio, fecha_fin)
VALUES (1, 0.10, '2024-12-01', '2024-12-31'),
(2, 0.15, '2024-12-01', '2024-12-12');