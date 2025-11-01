create table persona (
    IDPERSONA serial primary key,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    sexo char(1) check (sexo in ('M', 'F')) not null,
    email varchar(100) unique not null,
    nroDocumento varchar(10) unique not null,
    tipoDocumento varchar(10) check (tipoDocumento in ('DNI', 'PASAPORTE', 'CARNET_EXTRANJERIA')) not null,
    telefono varchar(15),
    direccion varchar(150),
    fecha_nacimiento date
);
create table usuario (
    id_usuario serial primary key,
    IDPERSONA int references persona(IDPERSONA) on delete cascade,
    nombre_usuario varchar(50) unique not null,
    contrasena varchar(255) not null,
    rol varchar(20) check (rol in ('admin', 'vendedor', 'cliente')) not null,
    fecha_creacion timestamp default current_timestamp
);
create table categoria (
    id_categoria int primary key AUTO_INCREMENT,
    nombre varchar(50) unique not null,
    id_usuario int references usuario(id_usuario) on delete set null,
    
)
create table cliente{
    idCliente int primary key AUTO_INCREMENT,
    email varchar(30),
    

}