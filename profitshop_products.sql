-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: profitshop
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userNameId` int NOT NULL,
  `descr` varchar(250) NOT NULL,
  `createdAt` date NOT NULL,
  `link` varchar(250) NOT NULL,
  `vendorId` int NOT NULL,
  `photoLink` varchar(250) DEFAULT NULL,
  `hashTags` varchar(150) NOT NULL,
  `discount` int NOT NULL,
  `validUntil` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_idx` (`userNameId`),
  KEY `fk_vendors_idx` (`vendorId`),
  CONSTRAINT `fk_users` FOREIGN KEY (`userNameId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vendors` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Adobe Photoshop','2021-03-20','https://www.youtube.com/',1,'https://www.youtube.com/','[\"Program\",\"Adobe\",\"Sale\"]',20,'2021-10-10'),(2,2,'Apple Iphone X','2021-01-01','https://www.youtube.com/',2,'https://www.youtube.com/','[\"Program\",\"Apple\",\"Iphone\"]',99,'2021-04-04'),(3,3,'Premier Pro','2021-03-01','https://www.youtube.com/',1,'https://www.youtube.com/','[\"Program\",\"Adobe\",\"Premier\"]',15,'2021-05-05'),(4,7,'Tilda Website','2021-02-02','https://www.youtube.com/',3,'https://www.youtube.com/','[\"Tilda\",\"Web\"]',50,'2021-06-25'),(5,5,'Music Top','2018-10-12','https://www.youtube.com/',4,'https://www.youtube.com/','[\"Music\"]',85,'2021-12-15'),(6,6,'Best Games','2021-05-07','https://www.youtube.com/',5,'https://www.youtube.com/','[\"Games\"]',70,'2050-05-15'),(7,4,'YouTube','2021-05-11','https://www.youtube.com/',6,'https://www.youtube.com/','[\"Web\",\"Social\",\"Youtube\"]',45,'2048-08-08'),(8,8,'FB Sale','2021-05-10','https://www.youtube.com/',9,'https://www.youtube.com/','[\"Web\",\"Social\",\"FB\"]',10,'2035-03-05'),(9,9,'Instagram Sale','2010-04-03','https://www.youtube.com/',8,'https://www.youtube.com/','[\"Web\",\"Social\",\"Inst\"]',82,'2021-04-08'),(10,10,'Twitter Sale','2021-01-01','https://www.youtube.com/',10,'https://www.youtube.com/','[\"Web\",\"Social\",\"Twitter\"]',97,'2023-07-06'),(11,7,'YouTube Sale','2021-05-08','https://www.youtube.com/',6,'https://www.youtube.com/','[\"Web\",\"Social\",\"Youtube\"]',50,'2021-09-09'),(12,5,'YouTube Big Sale','2021-05-09','https://www.youtube.com/',6,'https://www.youtube.com/','[\"Web\",\"Social\",\"Youtube\"]',68,'2021-12-12');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-11 22:04:18
