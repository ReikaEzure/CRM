-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Rootlets
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Rootlets` ;

-- -----------------------------------------------------
-- Schema Rootlets
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Rootlets` DEFAULT CHARACTER SET utf8 ;
USE `Rootlets` ;

-- -----------------------------------------------------
-- Table `Rootlets`.`UserRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`UserRole` (
  `idUserRole` INT NOT NULL,
  `Role` VARCHAR(30) NOT NULL,
  `Description` VARCHAR(45) NULL,
  PRIMARY KEY (`idUserRole`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`UserStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`UserStatus` (
  `idUserStatus` INT NOT NULL,
  `status` VARCHAR(30) NULL,
  PRIMARY KEY (`idUserStatus`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Login` (
  `idLogin` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`idLogin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `BirthDay` TIMESTAMP NULL,
  `Phone` VARCHAR(9) NOT NULL,
  `JoinedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastLogin` TIMESTAMP NULL,
  `id` VARCHAR(45) NOT NULL,
  `idType` VARCHAR(10) NOT NULL,
  `Avatar` VARCHAR(255) NULL,
  `Role` INT NOT NULL,
  `Status` INT NOT NULL,
  `Login_idLogin` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_User_UserRole1_idx` (`Role` ASC) VISIBLE,
  INDEX `fk_User_UserStatus1_idx` (`Status` ASC) VISIBLE,
  INDEX `fk_User_Login1_idx` (`Login_idLogin` ASC) VISIBLE,
  CONSTRAINT `fk_User_UserRole1`
    FOREIGN KEY (`Role`)
    REFERENCES `Rootlets`.`UserRole` (`idUserRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_UserStatus1`
    FOREIGN KEY (`Status`)
    REFERENCES `Rootlets`.`UserStatus` (`idUserStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Login1`
    FOREIGN KEY (`Login_idLogin`)
    REFERENCES `Rootlets`.`Login` (`idLogin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Office`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Office` (
  `idOffice` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  `Phone` VARCHAR(45) NOT NULL,
  `NIF` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idOffice`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`ProjectStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`ProjectStatus` (
  `idProjectStatus` INT NOT NULL,
  `status` VARCHAR(20) NULL,
  PRIMARY KEY (`idProjectStatus`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Promotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Promotion` (
  `idPromotion` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(255) NOT NULL,
  `OfferAmount` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPromotion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`ClientType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`ClientType` (
  `idClientType` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(200) NULL,
  PRIMARY KEY (`idClientType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`ClientCompany`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`ClientCompany` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `CompanyName` VARCHAR(100) NOT NULL,
  `NIF` VARCHAR(9) NOT NULL,
  `Industry` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `CreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP NULL,
  `Preference` VARCHAR(255) NOT NULL,
  `ClientType_idClientType` INT NOT NULL,
  PRIMARY KEY (`idClient`),
  INDEX `fk_Client_ClientType1_idx` (`ClientType_idClientType` ASC) VISIBLE,
  CONSTRAINT `fk_Client_ClientType1`
    FOREIGN KEY (`ClientType_idClientType`)
    REFERENCES `Rootlets`.`ClientType` (`idClientType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Project` (
  `idProject` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(200) NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `DueDate` TIMESTAMP NULL,
  `CreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP NULL,
  `ActualCompletionDate` TIMESTAMP NULL,
  `Budget` INT NOT NULL,
  `Price` INT NULL,
  `Documentation` VARCHAR(255) NULL,
  `Feedback` VARCHAR(255) NULL,
  `QuantityOfChange` INT NULL,
  `Status` INT NOT NULL,
  `Promotion_idPromotion` INT NOT NULL,
  `Client_idClient` INT NOT NULL,
  PRIMARY KEY (`idProject`),
  INDEX `fk_Project_ProjectStatus1_idx` (`Status` ASC) VISIBLE,
  INDEX `fk_Project_Promotion1_idx` (`Promotion_idPromotion` ASC) VISIBLE,
  INDEX `fk_Project_Client1_idx` (`Client_idClient` ASC) VISIBLE,
  CONSTRAINT `fk_Project_ProjectStatus1`
    FOREIGN KEY (`Status`)
    REFERENCES `Rootlets`.`ProjectStatus` (`idProjectStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Project_Promotion1`
    FOREIGN KEY (`Promotion_idPromotion`)
    REFERENCES `Rootlets`.`Promotion` (`idPromotion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Project_Client1`
    FOREIGN KEY (`Client_idClient`)
    REFERENCES `Rootlets`.`ClientCompany` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`TaskStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`TaskStatus` (
  `idTaskStatus` INT NOT NULL,
  `status` VARCHAR(20) NULL,
  PRIMARY KEY (`idTaskStatus`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Task` (
  `idTask` INT NOT NULL AUTO_INCREMENT,
  `CreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Description` VARCHAR(255) NOT NULL,
  `DueDate` TIMESTAMP NULL,
  `ActualCompletionDate` TIMESTAMP NULL,
  `Type` VARCHAR(45) NULL,
  `Project_idProject` INT NOT NULL,
  `Status` INT NOT NULL,
  PRIMARY KEY (`idTask`),
  INDEX `fk_Task_Project1_idx` (`Project_idProject` ASC) VISIBLE,
  INDEX `fk_Task_TaskStatus1_idx` (`Status` ASC) VISIBLE,
  CONSTRAINT `fk_Task_Project1`
    FOREIGN KEY (`Project_idProject`)
    REFERENCES `Rootlets`.`Project` (`idProject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Task_TaskStatus1`
    FOREIGN KEY (`Status`)
    REFERENCES `Rootlets`.`TaskStatus` (`idTaskStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Invoice` (
  `idInvoice` INT NOT NULL AUTO_INCREMENT,
  `IssueDate` TIMESTAMP NOT NULL,
  `CreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP NULL,
  `Total` INT NULL,
  `Subtotal` INT NULL,
  `Neto` INT NULL,
  `IVA` INT NULL,
  `IRPF` INT NULL,
  `Project_idProject` INT NOT NULL,
  PRIMARY KEY (`idInvoice`),
  INDEX `fk_Invoice_Project1_idx` (`Project_idProject` ASC) VISIBLE,
  CONSTRAINT `fk_Invoice_Project1`
    FOREIGN KEY (`Project_idProject`)
    REFERENCES `Rootlets`.`Project` (`idProject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Appointment` (
  `idAppointment` INT NOT NULL AUTO_INCREMENT,
  `Date` TIMESTAMP NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `CreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idAppointment`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Team` (
  `idTeam` INT NOT NULL AUTO_INCREMENT,
  `Project_idProject` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idTeam`, `Project_idProject`, `User_idUser`),
  INDEX `fk_Team_Project1_idx` (`Project_idProject` ASC) VISIBLE,
  INDEX `fk_Team_User1_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Team_Project1`
    FOREIGN KEY (`Project_idProject`)
    REFERENCES `Rootlets`.`Project` (`idProject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Team_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Rootlets`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`PersonalityType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`PersonalityType` (
  `idPersonalityType` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL,
  `Description` VARCHAR(200) NULL,
  PRIMARY KEY (`idPersonalityType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`SNS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`SNS` (
  `sms` VARCHAR(20) NULL,
  `url` VARCHAR(255) NULL,
  `Client_idClient` INT NOT NULL,
  PRIMARY KEY (`Client_idClient`),
  INDEX `fk_SMS_Client1_idx` (`Client_idClient` ASC) VISIBLE,
  CONSTRAINT `fk_SMS_Client1`
    FOREIGN KEY (`Client_idClient`)
    REFERENCES `Rootlets`.`ClientCompany` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`TeamLeader`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`TeamLeader` (
  `TeamLeaderId` INT NOT NULL,
  `ElectedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP NULL,
  `Team_idTeam` INT NOT NULL,
  PRIMARY KEY (`Team_idTeam`),
  CONSTRAINT `fk_TeamLeader_Team1`
    FOREIGN KEY (`Team_idTeam`)
    REFERENCES `Rootlets`.`Team` (`idTeam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Profile` (
  `idProfile` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`idProfile`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Appointment_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Appointment_has_User` (
  `Appointment_idAppointment` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`Appointment_idAppointment`, `User_idUser`),
  INDEX `fk_Appointment_has_User_Appointment1_idx` (`Appointment_idAppointment` ASC) VISIBLE,
  INDEX `fk_Appointment_has_User_User1_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Appointment_has_User_Appointment1`
    FOREIGN KEY (`Appointment_idAppointment`)
    REFERENCES `Rootlets`.`Appointment` (`idAppointment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Appointment_has_User_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Rootlets`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Phone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Phone` (
  `PhoneNumber` VARCHAR(10) NULL,
  `Client_idClient` INT NOT NULL,
  PRIMARY KEY (`Client_idClient`),
  INDEX `fk_Phone_Client1_idx` (`Client_idClient` ASC) VISIBLE,
  CONSTRAINT `fk_Phone_Client1`
    FOREIGN KEY (`Client_idClient`)
    REFERENCES `Rootlets`.`ClientCompany` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Address` (
  `AddressLine` VARCHAR(255) NULL,
  `City` VARCHAR(50) NULL,
  `State` VARCHAR(50) NULL,
  `Country` VARCHAR(45) NULL,
  `PostalCode` VARCHAR(10) NULL,
  `Client_idClient` INT NOT NULL,
  PRIMARY KEY (`Client_idClient`),
  INDEX `fk_Address_Client1_idx` (`Client_idClient` ASC) VISIBLE,
  CONSTRAINT `fk_Address_Client1`
    FOREIGN KEY (`Client_idClient`)
    REFERENCES `Rootlets`.`ClientCompany` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Client` (
  `User_idUser` INT NOT NULL,
  `PersonalityType_idPersonalityType` INT NOT NULL,
  `ClientCompany_idClient` INT NOT NULL,
  PRIMARY KEY (`User_idUser`),
  INDEX `fk_Client_PersonalityType1_idx` (`PersonalityType_idPersonalityType` ASC) VISIBLE,
  INDEX `fk_Client_ClientCompany1_idx` (`ClientCompany_idClient` ASC) VISIBLE,
  CONSTRAINT `fk_Client_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Rootlets`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Client_PersonalityType1`
    FOREIGN KEY (`PersonalityType_idPersonalityType`)
    REFERENCES `Rootlets`.`PersonalityType` (`idPersonalityType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Client_ClientCompany1`
    FOREIGN KEY (`ClientCompany_idClient`)
    REFERENCES `Rootlets`.`ClientCompany` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rootlets`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rootlets`.`Employee` (
  `User_idUser` INT NOT NULL,
  `Office_idOffice` INT NOT NULL,
  PRIMARY KEY (`User_idUser`),
  INDEX `fk_Employee_Office1_idx` (`Office_idOffice` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Rootlets`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_Office1`
    FOREIGN KEY (`Office_idOffice`)
    REFERENCES `Rootlets`.`Office` (`idOffice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
