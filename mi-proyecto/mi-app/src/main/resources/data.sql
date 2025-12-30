-- Insertar categorías
INSERT INTO categories (id, name, description, image_url) VALUES 
('CAT-TEC', 'Tecnología', 'Celulares, laptops y gadgets', 'https://falabella.scene7.com/is/image/FalabellaPE/19087572_1'),
('CAT-MOD', 'Moda', 'Ropa para hombre y mujer', 'https://falabella.scene7.com/is/image/FalabellaPE/gsc_115897'),
('CAT-HOG', 'Hogar', 'Muebles y decoración', 'https://falabella.scene7.com/is/image/FalabellaPE/19593256_1'),
('CAT-DEP', 'Deportes', 'Ropa y accesorios deportivos', 'https://falabella.scene7.com/is/image/FalabellaPE/18765432_1');

-- Insertar usuarios de ejemplo
INSERT INTO usuario (id_person, firstname, surname, dni, phone, birth_date, email, password, register_date, update_date, active) VALUES 
('USR-001', 'Juan', 'Pérez García', '12345678', '987654321', '1990-05-15', 'juan.perez@example.com', 'password123', '2024-01-10', '2024-12-20', true),
('USR-002', 'María', 'González López', '23456789', '987654322', '1992-08-22', 'maria.gonzalez@example.com', 'password123', '2024-01-15', '2024-12-21', true),
('USR-003', 'Carlos', 'Rodríguez Sánchez', '34567890', '987654323', '1988-03-30', 'carlos.rodriguez@example.com', 'password123', '2024-02-01', '2024-12-15', true),
('USR-004', 'Ana', 'Martínez Torres', '45678901', '987654324', '1995-11-12', 'ana.martinez@example.com', 'password123', '2024-02-10', '2024-12-22', true),
('USR-005', 'Pedro', 'López Ramírez', '56789012', '987654325', '1991-07-25', 'pedro.lopez@example.com', 'password123', '2024-03-05', '2024-12-18', true),
('USR-006', 'Laura', 'Fernández Díaz', '67890123', '987654326', '1993-09-18', 'laura.fernandez@example.com', 'password123', '2024-03-15', '2024-12-19', true),
('USR-007', 'Miguel', 'Sánchez Morales', '78901234', '987654327', '1989-12-05', 'miguel.sanchez@example.com', 'password123', '2024-04-01', '2024-12-23', false),
('USR-008', 'Sofia', 'Torres Ruiz', '89012345', '987654328', '1994-04-28', 'sofia.torres@example.com', 'password123', '2024-04-20', '2024-12-24', true);