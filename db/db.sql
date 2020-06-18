-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: Rootlets
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `addressLine` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `client_idClient` int NOT NULL,
  PRIMARY KEY (`client_idClient`),
  KEY `fk_Address_Client1_idx` (`client_idClient`),
  CONSTRAINT `fk_Address_Client1` FOREIGN KEY (`client_idClient`) REFERENCES `ClientCompany` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES ('asd','asd','asd','asd','12345',5);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Appointment`
--

DROP TABLE IF EXISTS `Appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointment` (
  `idAppointment` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idAppointment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointment`
--

LOCK TABLES `Appointment` WRITE;
/*!40000 ALTER TABLE `Appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Appointment_has_User`
--

DROP TABLE IF EXISTS `Appointment_has_User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointment_has_User` (
  `appointment_idAppointment` int NOT NULL,
  `user_idUser` int NOT NULL,
  PRIMARY KEY (`appointment_idAppointment`,`user_idUser`),
  KEY `fk_Appointment_has_User_Appointment1_idx` (`appointment_idAppointment`),
  KEY `fk_Appointment_has_User_User1_idx` (`user_idUser`),
  CONSTRAINT `fk_Appointment_has_User_Appointment1` FOREIGN KEY (`appointment_idAppointment`) REFERENCES `Appointment` (`idAppointment`),
  CONSTRAINT `fk_Appointment_has_User_User1` FOREIGN KEY (`user_idUser`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointment_has_User`
--

LOCK TABLES `Appointment_has_User` WRITE;
/*!40000 ALTER TABLE `Appointment_has_User` DISABLE KEYS */;
/*!40000 ALTER TABLE `Appointment_has_User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Client` (
  `user_idUser` int NOT NULL,
  `personalityType` int NOT NULL,
  `clientCompany` int NOT NULL,
  PRIMARY KEY (`user_idUser`),
  KEY `fk_Client_PersonalityType1_idx` (`personalityType`),
  KEY `fk_Client_ClientCompany1_idx` (`clientCompany`),
  CONSTRAINT `fk_Client_ClientCompany1` FOREIGN KEY (`clientCompany`) REFERENCES `ClientCompany` (`idClient`),
  CONSTRAINT `fk_Client_PersonalityType1` FOREIGN KEY (`personalityType`) REFERENCES `PersonalityType` (`idPersonalityType`),
  CONSTRAINT `fk_Client_User1` FOREIGN KEY (`user_idUser`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClientCompany`
--

DROP TABLE IF EXISTS `ClientCompany`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientCompany` (
  `idClient` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(100) NOT NULL,
  `nif` varchar(9) NOT NULL,
  `industry` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT NULL,
  `preference` varchar(255) NOT NULL,
  `clientType_idClientType` int NOT NULL,
  PRIMARY KEY (`idClient`),
  KEY `fk_Client_ClientType1_idx` (`clientType_idClientType`),
  CONSTRAINT `fk_Client_ClientType1` FOREIGN KEY (`clientType_idClientType`) REFERENCES `ClientType` (`idClientType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientCompany`
--

LOCK TABLES `ClientCompany` WRITE;
/*!40000 ALTER TABLE `ClientCompany` DISABLE KEYS */;
INSERT INTO `ClientCompany` VALUES (3,'Woolworths','12345678A','Retail','woolworths@example.com','2020-05-21 17:56:56',NULL,'simple',2),(4,'test','1234567a','test','test@gmail.com','2020-05-21 18:37:51',NULL,'test',2),(5,'asd','12345778a','retail','asd@gmail.com','2020-05-22 23:34:39',NULL,'asd',1);
/*!40000 ALTER TABLE `ClientCompany` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClientType`
--

DROP TABLE IF EXISTS `ClientType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientType` (
  `idClientType` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idClientType`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientType`
--

LOCK TABLES `ClientType` WRITE;
/*!40000 ALTER TABLE `ClientType` DISABLE KEYS */;
INSERT INTO `ClientType` VALUES (1,'New',''),(2,'Potential',''),(3,'Regular','');
/*!40000 ALTER TABLE `ClientType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee` (
  `user_idUser` int NOT NULL,
  `office_idOffice` int NOT NULL,
  PRIMARY KEY (`user_idUser`),
  KEY `fk_Employee_Office1_idx` (`office_idOffice`),
  CONSTRAINT `fk_Employee_Office1` FOREIGN KEY (`office_idOffice`) REFERENCES `Office` (`idOffice`),
  CONSTRAINT `fk_Employee_User1` FOREIGN KEY (`user_idUser`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoice`
--

DROP TABLE IF EXISTS `Invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Invoice` (
  `idInvoice` int NOT NULL AUTO_INCREMENT,
  `issueDate` timestamp NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT NULL,
  `total` int DEFAULT NULL,
  `subtotal` int DEFAULT NULL,
  `neto` int DEFAULT NULL,
  `iva` int DEFAULT NULL,
  `irpf` int DEFAULT NULL,
  `project_idProject` int NOT NULL,
  PRIMARY KEY (`idInvoice`),
  KEY `fk_Invoice_Project1_idx` (`project_idProject`),
  CONSTRAINT `fk_Invoice_Project1` FOREIGN KEY (`project_idProject`) REFERENCES `Project` (`idProject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoice`
--

LOCK TABLES `Invoice` WRITE;
/*!40000 ALTER TABLE `Invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `Invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login`
--

DROP TABLE IF EXISTS `Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Login` (
  `idLogin` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`idLogin`),
  UNIQUE KEY `UserName_UNIQUE` (`username`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login`
--

LOCK TABLES `Login` WRITE;
/*!40000 ALTER TABLE `Login` DISABLE KEYS */;
INSERT INTO `Login` VALUES (1,'admin','admin','admin@gmail.com'),(15,'test','Test1234','test@gmail.com'),(16,'asd','12345Asd','wfewf@gmail.com');
/*!40000 ALTER TABLE `Login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Office`
--

DROP TABLE IF EXISTS `Office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Office` (
  `idOffice` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `nif` varchar(45) NOT NULL,
  PRIMARY KEY (`idOffice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Office`
--

LOCK TABLES `Office` WRITE;
/*!40000 ALTER TABLE `Office` DISABLE KEYS */;
/*!40000 ALTER TABLE `Office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PersonalityType`
--

DROP TABLE IF EXISTS `PersonalityType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PersonalityType` (
  `idPersonalityType` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idPersonalityType`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PersonalityType`
--

LOCK TABLES `PersonalityType` WRITE;
/*!40000 ALTER TABLE `PersonalityType` DISABLE KEYS */;
INSERT INTO `PersonalityType` VALUES (1,'Negotiator','Person who is always on the look-out for a bargain to get a better deal'),(2,'Quality nut','Person who is willing to pay more to get the best possible quality product or service'),(3,'Flaunter','Person who will always buy the most expensive product'),(4,'Walking encyclopedia','Person who will research anything and everything before making a decision, which means they’re open to even more information'),(5,'Black Cloud','Person who go around being annoyed with everything and everyone'),(6,'Conspiracy Theorist','Person who is suspicious of everything, and will never believe an ad or your marketing hype about how amazing your product is'),(7,'Toddler','Person who ask a thousand questions and, after you’ve answered them, will ask a thousand more'),(8,'Yes-Customer','Person who will agree with anything and everything'),(9,'Um-Customer','Person who doesn’t know what they want'),(10,'Buddy','Person who likes building relationships and need the support of other people before making a decision'),(11,'Bulldozer','Person who never has time, is always busy, prefer to get right to the point and want to see results this very moment'),(12,'Cyborg','Person who is analytical and loves facts, details, and numbers');
/*!40000 ALTER TABLE `PersonalityType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Phone`
--

DROP TABLE IF EXISTS `Phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Phone` (
  `phoneNumber` varchar(10) DEFAULT NULL,
  `client_idClient` int NOT NULL,
  PRIMARY KEY (`client_idClient`),
  KEY `fk_Phone_Client1_idx` (`client_idClient`),
  CONSTRAINT `fk_Phone_Client1` FOREIGN KEY (`client_idClient`) REFERENCES `ClientCompany` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Phone`
--

LOCK TABLES `Phone` WRITE;
/*!40000 ALTER TABLE `Phone` DISABLE KEYS */;
INSERT INTO `Phone` VALUES ('123568711',5);
/*!40000 ALTER TABLE `Phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Project`
--

DROP TABLE IF EXISTS `Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Project` (
  `idProject` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dueDate` timestamp NULL DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT NULL,
  `actualCompletionDate` timestamp NULL DEFAULT NULL,
  `budget` int NOT NULL,
  `price` int DEFAULT NULL,
  `documentation` varchar(255) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `quantityOfChange` int DEFAULT NULL,
  `status` int NOT NULL,
  `promotion_idPromotion` int DEFAULT NULL,
  `client_idClient` int NOT NULL,
  PRIMARY KEY (`idProject`),
  KEY `fk_Project_ProjectStatus1_idx` (`status`),
  KEY `fk_Project_Promotion1_idx` (`promotion_idPromotion`),
  KEY `fk_Project_Client1_idx` (`client_idClient`),
  CONSTRAINT `fk_Project_Client1` FOREIGN KEY (`client_idClient`) REFERENCES `ClientCompany` (`idClient`),
  CONSTRAINT `fk_Project_ProjectStatus1` FOREIGN KEY (`status`) REFERENCES `ProjectStatus` (`idProjectStatus`),
  CONSTRAINT `fk_Project_Promotion1` FOREIGN KEY (`promotion_idPromotion`) REFERENCES `Promotion` (`idPromotion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Project`
--

LOCK TABLES `Project` WRITE;
/*!40000 ALTER TABLE `Project` DISABLE KEYS */;
INSERT INTO `Project` VALUES (6,'Project 1','project1','2020-09-30 22:00:00','2020-06-17 22:06:47',NULL,NULL,5000,0,NULL,NULL,NULL,1,NULL,4);
/*!40000 ALTER TABLE `Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProjectStatus`
--

DROP TABLE IF EXISTS `ProjectStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProjectStatus` (
  `idProjectStatus` int NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idProjectStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProjectStatus`
--

LOCK TABLES `ProjectStatus` WRITE;
/*!40000 ALTER TABLE `ProjectStatus` DISABLE KEYS */;
INSERT INTO `ProjectStatus` VALUES (1,'Open'),(2,'In Progress'),(3,'On Hold'),(4,'Cancelled');
/*!40000 ALTER TABLE `ProjectStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Promotion`
--

DROP TABLE IF EXISTS `Promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Promotion` (
  `idPromotion` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `offerAmount` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idPromotion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Promotion`
--

LOCK TABLES `Promotion` WRITE;
/*!40000 ALTER TABLE `Promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SNS`
--

DROP TABLE IF EXISTS `SNS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SNS` (
  `sns` varchar(20) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `client_idClient` int NOT NULL,
  PRIMARY KEY (`client_idClient`),
  KEY `fk_SMS_Client1_idx` (`client_idClient`),
  CONSTRAINT `fk_SMS_Client1` FOREIGN KEY (`client_idClient`) REFERENCES `ClientCompany` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SNS`
--

LOCK TABLES `SNS` WRITE;
/*!40000 ALTER TABLE `SNS` DISABLE KEYS */;
INSERT INTO `SNS` VALUES ('1: Website','hfwhfjawoifjopwfiopwkfopwejafp.com',5);
/*!40000 ALTER TABLE `SNS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Task`
--

DROP TABLE IF EXISTS `Task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Task` (
  `idTask` int NOT NULL AUTO_INCREMENT,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(255) NOT NULL,
  `dueDate` timestamp NULL DEFAULT NULL,
  `actualCompletionDate` timestamp NULL DEFAULT NULL,
  `taskName` varchar(100) NOT NULL,
  `project_idProject` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`idTask`),
  KEY `fk_Task_Project1_idx` (`project_idProject`),
  KEY `fk_Task_TaskStatus1_idx` (`status`),
  CONSTRAINT `fk_Task_Project1` FOREIGN KEY (`project_idProject`) REFERENCES `Project` (`idProject`),
  CONSTRAINT `fk_Task_TaskStatus1` FOREIGN KEY (`status`) REFERENCES `TaskStatus` (`idTaskStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Task`
--

LOCK TABLES `Task` WRITE;
/*!40000 ALTER TABLE `Task` DISABLE KEYS */;
INSERT INTO `Task` VALUES (1,'2020-06-17 22:39:12','task1','2020-06-30 22:00:00',NULL,'Task1',6,5);
/*!40000 ALTER TABLE `Task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TaskStatus`
--

DROP TABLE IF EXISTS `TaskStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TaskStatus` (
  `idTaskStatus` int NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idTaskStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TaskStatus`
--

LOCK TABLES `TaskStatus` WRITE;
/*!40000 ALTER TABLE `TaskStatus` DISABLE KEYS */;
INSERT INTO `TaskStatus` VALUES (1,'In Progress'),(2,'Done'),(3,'Approved'),(4,'Pending'),(5,'Struggling');
/*!40000 ALTER TABLE `TaskStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Team` (
  `idTeam` int NOT NULL AUTO_INCREMENT,
  `project_idProject` int NOT NULL,
  `user_idUser` int NOT NULL,
  PRIMARY KEY (`idTeam`,`project_idProject`,`user_idUser`),
  KEY `fk_Team_Project1_idx` (`project_idProject`),
  KEY `fk_Team_User1_idx` (`user_idUser`),
  CONSTRAINT `fk_Team_Project1` FOREIGN KEY (`project_idProject`) REFERENCES `Project` (`idProject`),
  CONSTRAINT `fk_Team_User1` FOREIGN KEY (`user_idUser`) REFERENCES `User` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
/*!40000 ALTER TABLE `Team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TeamLeader`
--

DROP TABLE IF EXISTS `TeamLeader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TeamLeader` (
  `teamLeaderId` int NOT NULL,
  `electedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` timestamp NULL DEFAULT NULL,
  `team_idTeam` int NOT NULL,
  PRIMARY KEY (`team_idTeam`),
  CONSTRAINT `fk_TeamLeader_Team1` FOREIGN KEY (`team_idTeam`) REFERENCES `Team` (`idTeam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TeamLeader`
--

LOCK TABLES `TeamLeader` WRITE;
/*!40000 ALTER TABLE `TeamLeader` DISABLE KEYS */;
/*!40000 ALTER TABLE `TeamLeader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `birthDate` timestamp NULL DEFAULT NULL,
  `phone` varchar(9) NOT NULL,
  `joinedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLogin` timestamp NULL DEFAULT NULL,
  `id` varchar(45) NOT NULL,
  `idType` varchar(10) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` int NOT NULL,
  `status` int NOT NULL,
  `login_idLogin` int NOT NULL,
  PRIMARY KEY (`idUser`),
  KEY `fk_User_UserRole1_idx` (`role`),
  KEY `fk_User_UserStatus1_idx` (`status`),
  KEY `fk_User_Login1_idx` (`login_idLogin`),
  CONSTRAINT `fk_User_Login1` FOREIGN KEY (`login_idLogin`) REFERENCES `Login` (`idLogin`),
  CONSTRAINT `fk_User_UserRole1` FOREIGN KEY (`role`) REFERENCES `UserRole` (`idUserRole`),
  CONSTRAINT `fk_User_UserStatus1` FOREIGN KEY (`status`) REFERENCES `UserStatus` (`idUserStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (4,'test','test','1999-12-31 23:00:00','111111111','2020-05-20 19:50:06',NULL,'11111111A','1: 1',NULL,1,1,15);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserRole`
--

DROP TABLE IF EXISTS `UserRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserRole` (
  `idUserRole` int NOT NULL,
  `role` varchar(30) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idUserRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserRole`
--

LOCK TABLES `UserRole` WRITE;
/*!40000 ALTER TABLE `UserRole` DISABLE KEYS */;
INSERT INTO `UserRole` VALUES (1,'Administrator','Person responsible for carrying out the administrative support and general office management'),(2,'Business developer','Person works to improve an organization\'s market position and achieve financial growth such as Marketing representative'),(3,'Developer','System, software, web or application developer'),(4,'Designer','Web, graphic Designer'),(5,'Client','The recipient of the service who are willing to track thier project\'s progress');
/*!40000 ALTER TABLE `UserRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserStatus`
--

DROP TABLE IF EXISTS `UserStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserStatus` (
  `idUserStatus` int NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idUserStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserStatus`
--

LOCK TABLES `UserStatus` WRITE;
/*!40000 ALTER TABLE `UserStatus` DISABLE KEYS */;
INSERT INTO `UserStatus` VALUES (1,'Working'),(2,'On Leave'),(3,'In Meeting'),(4,'Be Back Soon');
/*!40000 ALTER TABLE `UserStatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-19  1:38:11
