-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: grupo4db
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
  KEY `avatars_FK_user` (`user_id`),
  CONSTRAINT `avatars_FK_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
INSERT INTO `avatars` VALUES (1,'default-image.png',NULL,'2023-04-21 01:48:26','2023-04-21 01:48:26'),(2,'1682043435169_img.jpg',NULL,'2023-04-21 02:17:15','2023-04-21 02:17:15'),(3,'1682043482364_img.jpg',NULL,'2023-04-21 02:18:02','2023-04-21 02:18:02'),(4,'1682045559684_img.jpg',29,'2023-04-21 02:52:40','2023-04-21 02:52:40');
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
  `cover` int(11) DEFAULT NULL,
  `genre` int(11) DEFAULT NULL,
  `language` int(11) DEFAULT NULL,
  `format` int(11) DEFAULT NULL,
  `pageCount` int(11) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `calification` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `editorial` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookrs_un` (`isbn13`),
  KEY `books_FK_author` (`author`),
  KEY `books_FK_format` (`format`),
  KEY `books_FK_genre` (`genre`),
  KEY `books_FK_language` (`language`),
  KEY `books_FK_editorial` (`editorial`),
  KEY `books_FK` (`cover`),
  CONSTRAINT `books_FK` FOREIGN KEY (`cover`) REFERENCES `covers` (`id`),
  CONSTRAINT `books_FK_author` FOREIGN KEY (`author`) REFERENCES `authors` (`id`),
  CONSTRAINT `books_FK_editorial` FOREIGN KEY (`editorial`) REFERENCES `editorials` (`id`),
  CONSTRAINT `books_FK_format` FOREIGN KEY (`format`) REFERENCES `formats` (`id`),
  CONSTRAINT `books_FK_genre` FOREIGN KEY (`genre`) REFERENCES `genres` (`id`),
  CONSTRAINT `books_FK_language` FOREIGN KEY (`language`) REFERENCES `languages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,9789506442941,'El temor de un hombre sabio',NULL,4,1,2,1200,1,NULL,NULL,NULL,1),(2,9789505470679,'El señor de los anillos la comunidad del anillo',NULL,4,1,2,560,2,NULL,NULL,NULL,2),(3,9789505471546,'El señor de los anillos las dos torres',NULL,4,1,2,480,2,NULL,NULL,NULL,3),(4,9789505471553,'El señor de los anillos el retorno del rey',NULL,4,1,2,608,2,NULL,NULL,NULL,3);
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
  `book` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `covers_FK` (`book`),
  CONSTRAINT `covers_FK` FOREIGN KEY (`book`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `covers`
--

LOCK TABLES `covers` WRITE;
/*!40000 ALTER TABLE `covers` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editorials`
--

LOCK TABLES `editorials` WRITE;
/*!40000 ALTER TABLE `editorials` DISABLE KEYS */;
INSERT INTO `editorials` VALUES (1,'Penguin Random House Editorial',NULL,NULL),(2,'Minotauro',NULL,NULL),(3,'Grupo Editorial Planeta S.A.I.C.',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Acción',NULL,NULL),(2,'Absurdo',NULL,NULL),(3,'Gore',NULL,NULL),(4,'Fantasía',NULL,NULL),(5,'Policial',NULL,NULL),(6,'Novelas gráficas',NULL,NULL),(7,'Ciencia ficción',NULL,NULL),(8,'Comedia',NULL,NULL),(9,'Infantil',NULL,NULL),(10,'Ciencias',NULL,NULL),(11,'Romance',NULL,NULL),(12,'Aventura',NULL,NULL),(13,'Drama',NULL,NULL),(14,'Terror',NULL,NULL);
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
  `avatar` int(11) DEFAULT NULL,
  `role` int(11) NOT NULL,
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
  KEY `users_FK_role` (`role`),
  CONSTRAINT `users_FK` FOREIGN KEY (`avatar`) REFERENCES `avatars` (`id`),
  CONSTRAINT `users_FK_role` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@mail.com',NULL,1,'$2a$12$v.WN62KBMMy/BO4gWayPPOMrsZJWw7vfRS3MNbjxpPjsLWbp/xL.6',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'user','user','user@mail.com',NULL,0,'$2a$12$9OX1Njg3j.QkgOBJRYCTuuHTn5SgAd0gmgQKvrU445OvsfZdZFb56',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'Prueba','prueba','prueba@mail.com',NULL,0,'$2a$12$VbgT7Yk5v5SgIWx379HvauCkJ94u5XNlKPDJCGpvLZRggyZxt3sNK','2023-04-20 01:24:03','2023-04-20 01:24:03',NULL,NULL,NULL,NULL,NULL),(18,'Juan','Perez','juan@mail.com',NULL,0,'$2a$12$uVieM9HnuElDjBC.CuO2q.vc.ndxGsE3f2pYgEf86vJopOBZK/nZK','2023-04-21 01:48:26','2023-04-21 01:48:26',NULL,NULL,NULL,NULL,NULL),(19,'Marcos','Perez','marcos@mail.com',NULL,0,'$2a$12$oMrVg4fdbcVKPa6Aps3dN.AIKqzS0PBzO.3tXUk9hlvd6kmwUJkLG','2023-04-21 02:10:03','2023-04-21 02:10:03',NULL,NULL,NULL,NULL,NULL),(20,'Andrea','Prueba','andrea@mail.com',NULL,0,'$2a$12$TajnKCoWtPZjuc61Yv42me220rRDYxbqgfDAlqY20dHWAjXk4OlEG','2023-04-21 02:13:46','2023-04-21 02:13:46',NULL,NULL,NULL,NULL,NULL),(21,'Hugo','prueba','hugo@mail.com',NULL,0,'$2a$12$ng4mpTatpoy5Ig4mYkn0Den6Ed4jQyFTTGo4/a0adRxa/eXEqcR6i','2023-04-21 02:18:02','2023-04-21 02:18:02',NULL,NULL,NULL,NULL,NULL),(22,'nueva','prueba','nueva@mail.com',NULL,0,'$2a$12$E815FioIID4BwBBdxt0KQuVo6RvYDI.sOkSeq56./eDC325TVJdYe','2023-04-21 02:37:57','2023-04-21 02:37:57',NULL,NULL,NULL,NULL,NULL),(23,'Andres','Andres','andres@mail.com',NULL,0,'$2a$12$KqGHRIbPRhtEyRAZmM.cSuF7CYG/Cujgkj9b.PBXM.VeRyqnV2gDa','2023-04-21 02:42:18','2023-04-21 02:42:18',NULL,NULL,NULL,NULL,NULL),(25,'Andres','Andres','andy@mail.com',NULL,0,'$2a$12$eNzNL5SxAjmhsrc063gEluvsJnv7WX2Y8Ti6T5yNMx.b0v0oI/5Fq','2023-04-21 02:44:44','2023-04-21 02:44:44',NULL,NULL,NULL,NULL,NULL),(27,'Thelma','prueba','thelma@mail.com',NULL,0,'$2a$12$iG4.38wpsXTHCOWzHFFogOJdXy4xOwZXFWXC1ba.KoAJYKiESkvwW','2023-04-21 02:49:05','2023-04-21 02:49:05',NULL,NULL,NULL,NULL,NULL),(29,'Karen','Perez','karen@mail.com',NULL,0,'$2a$12$gAZdTbxzMjzS8IloyHp2yuu8eCbl2ZxCGX.Zh0kYWyNHc9nYVztEa','2023-04-21 02:52:40','2023-04-21 02:52:40',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

DELETE FROM users WHERE id=14;
DELETE FROM users WHERE id=18;
DELETE FROM users WHERE id=19;
DELETE FROM users WHERE id=20;
DELETE FROM users WHERE id=21;
DELETE FROM users WHERE id=22;
DELETE FROM users WHERE id=23;
DELETE FROM users WHERE id=25;
DELETE FROM users WHERE id=27;

--
-- Dumping routines for database 'grupo4db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-21  0:16:19
