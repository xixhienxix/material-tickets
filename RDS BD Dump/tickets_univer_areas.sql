-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: tickets-univer.c89gtdswjvzb.us-east-1.rds.amazonaws.com    Database: tickets_univer
-- ------------------------------------------------------
-- Server version	5.6.51-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(450) DEFAULT NULL,
  `plantel` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (32,'Director','Avila Camacho'),(33,'Mentor','Avila Camacho'),(34,'Servicios Escolares','Avila Camacho'),(35,'Caja','Avila Camacho'),(36,'Soporte TI','Avila Camacho'),(37,'Asesor Educativo','Avila Camacho'),(38,'Director','Centro Historico'),(39,'Mentor','Centro Historico'),(40,'Servicios Escolares','Centro Historico'),(41,'Caja','Centro Historico'),(42,'Asesor Educativo','Centro Historico'),(43,'Director','Jardines del Bosque'),(44,'Mentor','Jardines del Bosque'),(45,'Servicios Escolares','Jardines del Bosque'),(46,'Caja','Jardines del Bosque'),(47,'Soporte TI','Jardines del Bosque'),(48,'Asesor Educativo','Jardines del Bosque'),(49,'Director','Loma Bonita'),(50,'Mentor','Loma Bonita'),(51,'Servicios Escolares','Loma Bonita'),(52,'Caja','Loma bonita'),(53,'Asesor Educativo','Loma Bonita'),(54,'Director','On-Line'),(55,'Capacitacion Docente','On-Line'),(56,'Mentor','On-Line'),(57,'Caja','On-Line'),(58,'Control Escolar','On-Line'),(59,'Director','Tlaquepaque'),(60,'Auxiliar Administrativo','Tlaquepaque'),(61,'Mentor','Tlaquepaque'),(62,'Servicios Escolares','Tlaquepaque'),(63,'Caja','Tlaquepaque'),(64,'Soporte TI','Tlaquepaque'),(65,'Asesor Educativo','Tlaquepaque'),(66,'Director','Tonala'),(67,'Auxiliar Administrativo','Tonala'),(68,'Mentor','Tonala'),(69,'Servicios Escolares','Tonala'),(70,'Caja','Tonala'),(71,'Rector','Rectoria'),(72,'Direccion de Planeacion y Proyectos','Rectoria'),(73,'Direccion Administrativa','Rectoria'),(74,'Direccion de Recursos Humanos','Rectoria'),(75,'Direccion de TI','Rectoria'),(76,'Direccion Comercial','Rectoria'),(77,'Coordinacion de Marketing Digital','Rectoria'),(78,'Coordinacion de Asesores','Rectoria'),(79,'Coordinacion de Call Center','Rectoria'),(80,'Direccion Academica','Rectoria'),(81,'S.A.U.','Rectoria'),(82,'Auditoria','Rectoria'),(83,'Direccion Servicios Escolares','Rectoria');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-30  9:50:06
