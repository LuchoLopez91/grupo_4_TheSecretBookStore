-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: grupo4-db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Patrick','Rothfuss',NULL,NULL),(2,'J.R.R.','Tolkien',NULL,NULL);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avatars_FK_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
INSERT INTO `avatars` VALUES (10,'1682224706037_img.jpg',34,'2023-04-23 04:38:26','2023-04-23 04:38:26'),(12,'1683419176607_img.png',35,'2023-05-07 00:26:16','2023-05-07 00:26:16'),(13,'1683420519767_img.jpg',29,'2023-05-07 00:48:39','2023-05-07 00:48:39'),(15,'1683492601677_img.jpg',2,'2023-05-07 20:50:01','2023-05-07 20:50:01'),(16,'1684344472436_img.jpg',36,'2023-05-17 17:27:53','2023-05-17 17:27:53');
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn13` bigint(13) NOT NULL,
  `title` varchar(100) NOT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `format_id` int(11) DEFAULT NULL,
  `pageCount` int(11) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `calification` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `editorial_id` int(11) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `price` mediumint(9) NOT NULL,
  `description` longtext DEFAULT NULL,
  `cover` varchar(100) DEFAULT NULL,
  `visits_count` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookrs_un` (`isbn13`),
  KEY `books_FK_author` (`author`),
  KEY `books_FK_format` (`format_id`),
  KEY `books_FK_genre` (`genre_id`),
  KEY `books_FK_language` (`language_id`),
  KEY `books_FK_editorial` (`editorial_id`),
  CONSTRAINT `books_FK_editorial` FOREIGN KEY (`editorial_id`) REFERENCES `editorials` (`id`),
  CONSTRAINT `books_FK_format` FOREIGN KEY (`format_id`) REFERENCES `formats` (`id`),
  CONSTRAINT `books_FK_genre` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `books_FK_language` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,9789506442941,'El temor de un hombre sabio',4,1,1,1200,'Patrick Rothfuss',NULL,NULL,'2023-05-22 09:22:18',1,NULL,5000,NULL,'wise-man.fear.jpg',0),(2,9789505470679,'El señor de los anillos la comunidad del anillo',4,1,2,560,'J.R.R. Tolkien',10,NULL,NULL,2,'1954-06-29',6000,'En la adormecida e idílica Comarca, un joven hobbit recibe un encargo: custodiar el Anillo Único y emprender el viaje para su destrucción en las Grietas del Destino. Acompañado por magos, hombres, elfos y enanos, atravesará la Tierra Media y se internará en las sombras del País Oscuro, perseguido siempre por las huestes de Sauron, el Señor Oscuro, dispuesto a recuperar su creación para establecer el dominio definitivo del Mal. Los Anillos del Poder fueron forjados en antiguos tiempos por los herreros Elfos, y Sauron, el Señor Oscuro, forjó el Anillo Unico (\"para gobernarlos a todos. Un anillo para encontrarlos. Un Anillo para atraerlos a todos y atarlos en las tinieblas...\"). Pero en una ocasión se lo quitaron, y aunque lo buscó por toda la Tierra Media nunca pudo encontrarlo. Al cabo de muchos años fue a caer casualmente en manos de Bilbo Bolsón. Desde la Torre Oscura de Mordor, el poder de Sauron se extendió alrededor. Llegó a reunir todos los Grandes Anillos, pero continuaba buscando el Anillo Unico que completaría el dominio de Mordor. Bilbo desapareció durante la celebración de su centesimodecimoprimer cumpleaños, y dejó a Frodo a cargo del Anillo, y con una peligrosa misión por delante: atravesar la Tierra Media, internarse en las Sombras del País Oscuro y destruir el Anillo arrojandoló en las Grietas del Destino. Este volumen es la primera parte de \"LA GUERRA DEL ANILLO\", una maravillosa historia de valor, traición, aventuras y magia.','lotr-1.jpg',0),(3,9789505471546,'El señor de los anillos las dos torres',4,1,3,480,'J.R.R. Tolkien',NULL,NULL,'2023-05-19 17:27:21',3,NULL,6500,NULL,'lotr-2.jpg',6),(4,9789505471553,'El señor de los anillos el retorno del rey',4,1,3,608,'J.R.R. Tolkien',NULL,NULL,'2023-05-21 18:16:59',3,NULL,8000,NULL,'lotr-3.jpg',0),(5,9788447346240,'Ilíada ',20,2,1,588,'Homero',NULL,'2023-04-26 15:22:38','2023-05-22 09:47:15',1,NULL,2500,'La famosa obra del autor griego Homero, que relata la historia de la Batalla de Troya. Precuela a la aún más aclamada Odisea.','book-default-cover.jpg',3000),(7,9789447378234,'Tragedias',15,1,1,370,'Esquilo',NULL,'2023-04-26 15:49:43','2023-04-26 15:49:43',4,NULL,4800,'','book-default-cover.jpg',0),(8,9789447378289,'Fábulas',4,1,1,408,'Esopo',NULL,'2023-04-26 15:50:40','2023-04-26 15:50:40',4,NULL,3200,'','book-default-cover.jpg',0),(9,9789447378258,'Tragedias I',15,1,1,398,'Eurípides',NULL,'2023-04-26 15:51:41','2023-04-26 15:51:41',4,NULL,6000,'','book-default-cover.jpg',0),(10,9789447378241,'Tragedias',15,1,1,468,'Sófocles',NULL,'2023-04-26 15:52:29','2023-05-21 18:15:47',4,NULL,1500000,'','book-default-cover.jpg',5000),(11,9789447378227,'Teogonía',4,1,1,330,'Hesíodo',NULL,'2023-04-26 15:53:24','2023-04-26 15:53:24',4,NULL,100,'','book-default-cover.jpg',0),(15,9789447378388,'Helénicas ',16,1,1,330,'Jenofonte',NULL,'2023-04-26 15:58:32','2023-04-26 16:00:06',4,NULL,15,'','book-default-cover.jpg',0),(16,9789447380114,'Anábasis',16,1,1,584,'Jenofonte',NULL,'2023-04-26 16:01:26','2023-04-26 16:01:26',4,NULL,4683,'','book-default-cover.jpg',0),(17,9789447380121,'Ciropedia',16,1,1,512,'Jenofonte',NULL,'2023-04-26 16:02:23','2023-04-26 16:02:23',4,NULL,648653,'','book-default-cover.jpg',0),(18,9789447380244,'Metafísica',21,1,1,472,'Aristóteles',NULL,'2023-04-26 16:03:21','2023-05-22 09:45:14',4,NULL,46513,'','1684344198587_cover_.jpg',0),(19,1234567891320,'güerito',1,1,1,56,'4',NULL,'2023-04-27 20:29:10','2023-04-27 20:52:09',1,NULL,32,'','1682628729289_cover_.jpg',0),(23,123456789963,'El Principito',9,1,1,84,'Antoine de Saint-Exupéry',NULL,'2023-04-27 20:36:02','2023-05-22 09:46:21',1,NULL,6385,'Perdido en medio del desierto a causa de un desperfecto en su avión, el aviador conoce a un singular personaje: un principito, único habitante del asteroide B-612, que dejó su hogar en busca de nuevos horizontes. Se entabla entre ellos una entrañable amistad que interpelará al protagonista y a los lectores. Este libro es una lectura obligada que acerca al lector a los temas profundos de la vida como el amor, la amistad, la soledad, el sentido de la existencia.','1682627762145_cover_.jpg',4000),(24,3698521471236,'quijote la secuela',16,2,3,846,'saavedra',NULL,'2023-04-27 20:40:06','2023-04-27 20:40:06',1,NULL,38463,'','1682628006952_cover_.jpg',0),(25,9789878000107,'Harry Potter y la piedra filosofal',9,1,1,288,'J.K.Rowling',NULL,'2023-04-27 21:12:40','2023-04-28 01:53:12',5,NULL,7000,'Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y del insoportable primo Dudley. Se siente muy triste y solo, hasta que un buen día recibe una carta que cambiará su vida para siempre. En ella le comunican que ha sido aceptado como alumno en el colegio interno Hogwarts de magia y hechicería. A partir de ese momento, la suerte de Harry da un vuelco espectacular. En esa escuela tan especial aprenderá encantamientos, trucos fabulosos y tácticas de defensa contra las malas artes. Se convertirá en el campeón escolar de quidditch, especie de fútbol aéreo que se juega montado sobre escobas, y hará un puñado de buenos amigos... aunque también algunos temibles enemigos. Pero, sobre todo, conocerá los secretos que le permitirán cumplir con su destino. Pues, aunque no lo parezca a primera vista, Harry no es un chico común y corriente. íEs un verdadero mago!','1682630076870_cover_.png',0),(26,9786076182802,'La bella durmiente',9,1,2,64,'Charles Perrault',NULL,'2023-04-27 23:39:14','2023-04-27 23:39:14',3,NULL,2500,'Un hada malvada le echa una maldición a una pequeña princesa: cuando cumpla quince años se pinchará en el dedo y dormirá durante cien años. ¡Entra y descubre cómo romper el hechizo!','1682638754495_cover_.jpg',0),(27,9789877253191,'It',14,1,2,1504,'Stephen King',NULL,'2023-04-28 00:15:53','2023-04-28 00:15:53',5,NULL,14999,'','1682640953440_cover_.png',0),(28,9789877255089,'Misery',14,1,2,400,'Stephen King',NULL,'2023-04-28 00:22:31','2023-04-28 00:22:31',5,NULL,6799,'Estaba loca, pero él la necesitaba. Misery Chastain ha muerto. Paul Sheldon la ha matado. Con alivio y hasta con alegría. Misery lo ha hecho rico. Porque Misery es la heroína que ha protagonizado sus exitosos libros. Paul quiere volver a escribir. Algo diferente, algo auténtico. Pero entonces sufre un accidente y despierta inmóvil y atravesado por el dolor en una cama que no es la suya, tampoco la de un hospital. Annie Wilkes lo ha recogido y lo ha traído a su remota casa de la montaña. La buena noticia es que Annie había sido enfermera y tiene medicamentos analgésicos. La mala es que ha sido durante mucho tiempo la fan número uno de Paul. Y cuando descubre lo que le ha hecho a Misery Chastain, no le gusta. No le gusta en absoluto. Antes, Paul Sheldon escribía para ganarse la vida. Ahora, Paul Sheldon escribe para sobrevivir.','1682641351411_cover_.png',0),(30,9789878000114,'Harry Potter y la cámara secreta',9,1,1,320,'J.K.Rowling',NULL,'2023-04-28 00:29:14','2023-05-07 03:15:45',5,NULL,6700,'Mientras Harry espera impaciente en casa de sus insoportables tíos el inicio del segundo curso del Colegio Hogwarts de Magia y Hechicería, un elfo aparece en su habitación y le advierte de que una amenaza mortal se cierne sobre la escuela. Harry no se lo piensa dos veces y, acompañado de Ron, se dirige a Hogwarts en un coche volador. Pero, ¿puede un aprendiz de mago defender la escuela de los malvados que pretenden destruirla? Sin saber que alguien ha abierto la Cámara de los Secretos, dejando escapar una serie de monstruos peligrosos, Harry y sus amigos Ron y Hermione tendrán que enfrentarse con arañas gigantes, serpientes encantadas, fantasmas enfurecidos y, sobre todo, con la mismísima reencarnación de su más temible adversario.','1682641754227_cover_.png',0),(31,9786073113113,'Juego de Tronos',4,1,2,796,'George R.R. Martin',NULL,'2023-05-07 22:52:23','2023-05-22 09:44:33',1,NULL,16999,'En el legendario mundo de los Siete Reinos, donde el verano puede durar décadas y el invierno toda una vida, y donde rastros de una magiain memorial surgen en los rincones más sombríos, la tierra del norte, Invernalia, está resguardada por un colosal muro de hielo que detiene a fuerzas oscuras y sobrenaturales. En este majestuoso escenario, lord Stark y su familia se encuentran en el centro de un conflicto que desatará todas las pasiones: la traición y la lealtad, la compasión y lased de venganza, el amor y el poder, la lujuria y el incesto, todo ello para ganar la más mortal de las batallas: el trono de hierro, una poderosa trampa que atrapará a los personajes -y al lector. Los paisajes tienen más en común con la cadencia de Shakespeare, la intensidad de Kipling o el sentido aventurero de Melville, que con la épica de Tolkien. El auténtico ariete de Martin son las esquirlas del alma humana, y sus criaturas se desenvuelven en los territorios de lo carnal sin necesidad de magia o fuegos artificiales. No hay en la obra del escritor anillos ni pócimas, sino espadas, ejércitos y muros. ','1683499943070_cover_.jpg',2000);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaries`
--

DROP TABLE IF EXISTS `commentaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentary` text NOT NULL,
  `calification` tinyint(4) NOT NULL,
  `book` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commentaries_FK_book` (`book`),
  KEY `commentaries_FK_user` (`user`),
  CONSTRAINT `commentaries_FK_book` FOREIGN KEY (`book`) REFERENCES `books` (`id`),
  CONSTRAINT `commentaries_FK_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaries`
--

LOCK TABLES `commentaries` WRITE;
/*!40000 ALTER TABLE `commentaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `covers`
--

DROP TABLE IF EXISTS `covers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `covers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route` varchar(100) NOT NULL,
  `book_id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `covers_FK` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `covers`
--

LOCK TABLES `covers` WRITE;
/*!40000 ALTER TABLE `covers` DISABLE KEYS */;
INSERT INTO `covers` VALUES (1,'lotr-1.jpg',2,NULL,NULL),(2,'lotr-2.jpg',3,NULL,NULL),(3,'lotr-3.jpg',4,NULL,NULL),(4,'wise-man.fear.jpg',1,NULL,NULL),(5,'book-default-cover.jpg',5,'2023-04-26 15:22:38','2023-04-26 15:22:38'),(7,'book-default-cover.jpg',7,'2023-04-26 15:49:43','2023-04-26 15:49:43'),(8,'book-default-cover.jpg',8,'2023-04-26 15:50:40','2023-04-26 15:50:40'),(9,'book-default-cover.jpg',9,'2023-04-26 15:51:41','2023-04-26 15:51:41'),(10,'book-default-cover.jpg',10,'2023-04-26 15:52:29','2023-04-26 15:52:29'),(11,'book-default-cover.jpg',11,'2023-04-26 15:53:24','2023-04-26 15:53:24'),(12,'book-default-cover.jpg',15,'2023-04-26 15:58:32','2023-04-26 15:58:32'),(13,'book-default-cover.jpg',16,'2023-04-26 16:01:26','2023-04-26 16:01:26'),(14,'book-default-cover.jpg',17,'2023-04-26 16:02:23','2023-04-26 16:02:23'),(15,'book-default-cover.jpg',18,'2023-04-26 16:03:21','2023-04-26 16:03:21');
/*!40000 ALTER TABLE `covers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editorials`
--

DROP TABLE IF EXISTS `editorials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `editorial` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editorials`
--

LOCK TABLES `editorials` WRITE;
/*!40000 ALTER TABLE `editorials` DISABLE KEYS */;
INSERT INTO `editorials` VALUES (1,'Penguin Random House Editorial',NULL,NULL),(2,'Minotauro',NULL,NULL),(3,'Grupo Editorial Planeta S.A.I.C.',NULL,NULL),(4,'Biblioteca Gredos',NULL,NULL),(5,'Salamandra',NULL,NULL);
/*!40000 ALTER TABLE `editorials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formats`
--

DROP TABLE IF EXISTS `formats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `format` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formats`
--

LOCK TABLES `formats` WRITE;
/*!40000 ALTER TABLE `formats` DISABLE KEYS */;
INSERT INTO `formats` VALUES (1,'Físico tapa dura',NULL,NULL),(2,'Físico tapa blanda',NULL,NULL),(3,'eBook',NULL,NULL);
/*!40000 ALTER TABLE `formats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Acción',NULL,NULL),(2,'Absurdo',NULL,NULL),(3,'Gore',NULL,NULL),(4,'Fantasía',NULL,NULL),(5,'Policial',NULL,NULL),(6,'Novelas gráficas',NULL,NULL),(7,'Ciencia ficción',NULL,NULL),(8,'Comedia',NULL,NULL),(9,'Infantil',NULL,NULL),(10,'Ciencias',NULL,NULL),(11,'Romance',NULL,NULL),(12,'Aventura',NULL,NULL),(13,'Drama',NULL,NULL),(14,'Terror',NULL,NULL),(15,'Tragedia',NULL,NULL),(16,'Histórico',NULL,NULL),(17,'Historia',NULL,NULL),(18,'Ciencias',NULL,NULL),(19,'Clásica',NULL,NULL),(20,'Épico',NULL,NULL),(21,'Filosofía',NULL,NULL),(22,'Educativo',NULL,NULL);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'Español',NULL,NULL),(2,'Inglés',NULL,NULL),(3,'Francés',NULL,NULL),(4,'Italiano',NULL,NULL),(5,'Japonés',NULL,NULL),(6,'Alemán',NULL,NULL),(7,'Braile',NULL,NULL);
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (0,'user',NULL,NULL),(1,'admin',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `role` int(2) NOT NULL DEFAULT 0,
  `password` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `adress` varchar(100) DEFAULT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_un` (`email`),
  KEY `users_FK` (`avatar`),
  KEY `users_FK_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@mail.com','default-image.png',1,'$2a$12$v.WN62KBMMy/BO4gWayPPOMrsZJWw7vfRS3MNbjxpPjsLWbp/xL.6',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'user','user','user@mail.com','1684703982688_img.jpg',0,'$2a$12$9OX1Njg3j.QkgOBJRYCTuuHTn5SgAd0gmgQKvrU445OvsfZdZFb56',NULL,'2023-05-21 21:19:42','1234567890','Calle Falsa 123','','',''),(29,'Karen','Perez','karen@mail.com','default-image.png',0,'$2a$12$gAZdTbxzMjzS8IloyHp2yuu8eCbl2ZxCGX.Zh0kYWyNHc9nYVztEa','2023-04-21 02:52:40','2023-05-07 00:48:39','123456789','calle123','1825','',''),(30,'Juan','Gomez','juan@mail.com','default-image.png',0,'$2a$12$.3SgOLfLOyIUGdCqA26BuOv/KC92YQvnY/g8U5qmQcASmst0od0H.','2023-04-23 04:34:20','2023-04-23 04:34:20',NULL,NULL,NULL,NULL,NULL),(32,'Juan','Gomez','juan2@mail.com','default-image.png',0,'$2a$12$suG1FFbRNvaal8bBzfIVj.JmxClBtVdLQnWj4.7doyD.vC1kvdntm','2023-04-23 04:36:05','2023-04-23 04:36:05',NULL,NULL,NULL,NULL,NULL),(34,'Juan','Gomez','juan3@mail.com','default-image.png',0,'$2a$12$xk6voED4PZPrkJ3XG6AoD.MnK.9BlzURU0d9VaEfuqcRV9W29MKTi','2023-04-23 04:37:49','2023-04-23 04:38:26','','','','',''),(35,'Ariel','Benitez','ariel@mail.com','default-image.png',0,'$2a$12$qVLPEn8OLXfDj9GE3gFADO/PcW9xX7nSOYTmwONLNLLjboSc6h9oe','2023-05-07 00:22:06','2023-05-07 00:43:44','','','','',''),(36,'Fabian','Sosa','fsosaolea@gmail.com','1684350835232_img.jpg',0,'$2a$12$ifQy0AAew/wjMDk0nKwHM.7cLVPB8ji3ilJRzHEmoou9ia3Di.u6i','2023-05-17 17:27:53','2023-05-17 19:13:55','5493446123456','la calle','2820','GENERAL ALVEAR','30'),(37,'Fabián','Sosa','f@gmail.com','default-image.png',0,'$2a$12$2ttcSvhBhkVEW2v1Z8LPcukmhUSmrKrl.3d7/qozOEAOBjISb2xHG','2023-05-19 00:37:36','2023-05-19 00:37:36',NULL,NULL,NULL,NULL,NULL),(38,'Fabi','Sosa','fs@gmail.com','1684456732115_img.jpg',0,'$2a$12$SCWoPmo.x5vTMsQqloQC4.DwJU8xRI5ExKtTPd/ebEVPVaGsstz2S','2023-05-19 00:38:52','2023-05-19 00:38:52',NULL,NULL,NULL,NULL,NULL),(39,'Fabián','Sosa','fso@gmail.com','default-image.png',0,'$2a$12$JHRV42ZAo2SnsZL8tYi8pO1XcXASibF3QItZLZB9DUp4jltLgWKYC','2023-05-19 00:42:52','2023-05-19 00:42:52',NULL,NULL,NULL,NULL,NULL),(40,'Andrea','Benitez','andrea@mail.com','1684703515931_img.jpg',0,'$2a$12$yLKjKwUlh3Q2MsOEeynvw.hbAOwrmb.gqK6syOHoZrz5MLYmI5jl.','2023-05-21 21:09:33','2023-05-21 21:11:55','','','','','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'grupo4-db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22  6:48:12
