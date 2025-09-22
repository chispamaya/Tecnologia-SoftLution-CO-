drop database if exists tecnologia;
create database tecnologia;
use tecnologia;

create table usuario(
	nombre varchar(50) PRIMARY KEY,
	contrasenia varchar (50),
	adminOno boolean,
	email varchar(50)
);

create table mensaje (
	id int AUTO_INCREMENT primary key,
	contenido varchar(500),
	nombreRemitente varchar (50),
	nombreEmisor varchar (50),
	FOREIGN KEY(nombreRemitente) references usuario(nombre),
	FOREIGN KEY(nombreEmisor) references usuario(nombre)
);

create table pool(
	id int AUTO_INCREMENT primary key,
	titulo varchar(50),
	nombreUsuario varchar(50),
	subidoDesp int,
	FOREIGN KEY(nombreUsuario) references usuario(nombre),
	FOREIGN KEY(subidoDesp) references mensaje(id)
);

create table opcionPool(
	id int AUTO_INCREMENT primary key,
	opcion varchar(50),
	idPool int,
	FOREIGN KEY (idPool) references pool(id)
);

create table votar(
	id int AUTO_INCREMENT primary key,
	nombreUsuario varchar(50),
	idOpcionPool int,
	FOREIGN KEY(nombreUsuario) references usuario(nombre),
	FOREIGN KEY (idOpcionPool) references opcionPool(id)
);

create table post(
	id int AUTO_INCREMENT primary key,
	titulo varchar(50),
	contenido varchar(500),
	link varchar(50),
	nombreUsuario varchar(50),
	FOREIGN KEY(nombreUsuario) references usuario(nombre)
);

create table comentar(
	id int AUTO_INCREMENT primary key,
	contenido varchar(300),
	idPost int,
	nombreUsuario varchar(50),
	FOREIGN KEY (idPost) references post(id),
	FOREIGN KEY(nombreUsuario) references usuario(nombre)
);

create table valorar (
	id int AUTO_INCREMENT primary key,
	likeOdislike boolean,
	nombreUsuario varchar(50),
	idPost int,
	FOREIGN KEY(nombreUsuario) references usuario(nombre),
	FOREIGN KEY(idPost) references post(id)
);


INSERT INTO `usuario` (`nombre`, `contrasenia`, `adminOno`, `email`) VALUES ('Grupo - Tecnologia', NULL, '1', NULL);

INSERT INTO `usuario` (`nombre`, `contrasenia`, `adminOno`, `email`) VALUES ('admin', '12345678', '1', 'admin@tecnologia.com');







