CREATE DATABASE database_links;

USE database_links;
--USERS TABLE
CREATE TABLE users (
    id INT(11)NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE users;   

-- LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255)NOt NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)

);

ALTER TABLE links 
    ADD PRIMARY KEY (id);

ALTER TABLE links 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2; 


-- INSERT JERARQUIA

INSERT INTO (SELECT u.idusuario,u.fullname , u.username, u.email , u.password , u.telefono ,c.apellidos,c.nombres 
                from usuario u, candidato c 
                where u.idusuario = c.idusuario )

VALUES (1,'dato1','dato2','emaill','1','123123123','espinoza','Cruz');

ALTER TABLE usuario 
    MODIFY idusuario INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE puestolaboral 
    MODIFY idorganizacionidusuario INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2; 

ALTER TABLE puestolaboral 
     MODIFY fechapublicacion timestamp NOT NULL DEFAULT current_timestamp;

ALTER TABLE solicita
     MODIFY fechapostulacion timestamp NOT NULL DEFAULT current_timestamp;


ALTER TABLE categoria 
    MODIFY idcategoria INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;     