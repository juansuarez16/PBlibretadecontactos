# PBlibretadecontactos
libretadecontactos
Esta aplicacion es para gestionar los contactos de una persona.

Requisitos
Node.js (versión X.X.X)
npm (versión X.X.X)
MySQL (versión X.X.X)

Para empezar primero creamos nuestra Base de Datos local 

CREATE DATA BASE libretadecontactos

segundo creamos la tabla
CREATE TABLE `customers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `correo_electronico` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  PRIMARY KEY (`id`)
);


Instalación
Primero se debe de arrancar el servidor de backend para que pueda funcionar el front
Clona el repositorio: git clone https://github.com/juansuarez16/PBlibretadecontactos.git.
Abre el directorio del proyecto en la terminal: cd PBlibretadecontactos.
Instala las dependencias de Node.js: npm install.
Para arrancar el proyecto backend seria ir a la ruta raiz del proyecto y escribimos en la terminal npm start 
Abre el navegador en la dirección http://localhost:3002.



Para ingresar al front seria Abre el directorio del proyecto en la terminal: cd PBlibretadecontactos/client/libretacontactos.
Instala las dependencias de Node.js: npm install.
Para arrancar el proyecto backend seria ir a la ruta raiz del proyecto y escribimos en la terminal npm start 
Abre el navegador en la dirección http://localhost:3000.

Uso
cuando estes en la ruta http://localhost:3000, empieza a crear contactos en la lista





Contacto
Juan Manuel Suarez Guzman juancho_1695@hotmail.com.an Manuel Suarez Guzman juancho_1695@hotmail.com.