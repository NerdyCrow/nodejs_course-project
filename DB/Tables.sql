use master
create database CarRental
select * from Cars
use CarRental
drop database CarRental
drop table Users
CREATE TABLE Users (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
	LicenseNumber NVARCHAR(100) NOT NULL,
	Password NVARCHAR(250) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
	Role NVARCHAR(50) NOT NULL
);

CREATE TABLE Cars (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    BrandId INT FOREIGN KEY REFERENCES Brands(ID),
    Model NVARCHAR(50) NOT NULL,
    Year INT NOT NULL,
	Color NVARCHAR(20) NOT NULL,
    BodyID INT FOREIGN KEY REFERENCES BodyStyles(ID),
	EngineTypeId INT FOREIGN KEY REFERENCES EngineTypes(ID),
	TransmissionTypeId INT FOREIGN KEY REFERENCES TransmissionTypes(ID),
	CarNumber NVARCHAR(25) NOT NULL,
	Seats INT NOT NULL,
    PricePerDay float NOT NULL,
	Description NVARCHAR(max) NOT NULL,
    Image NVARCHAR(max) NOT NULL
);
drop table Rental
CREATE TABLE Rental (
    ID INT PRIMARY KEY IDENTITY(1,1),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    UserID INT FOREIGN KEY REFERENCES Users(ID),
    CarID INT FOREIGN KEY REFERENCES Cars(ID),
	PaymentAmount float NOT NULL
);
Create table BodyStyles(
		ID Int PRIMARY KEY IDENTITY(1,1),
		Name NVARCHAR(20) NOT NULL
)
Create table Brands(
		ID Int PRIMARY KEY IDENTITY(1,1),
		Name NVARCHAR(20) NOT NULL
)
Create table EngineTypes(
		ID Int PRIMARY KEY IDENTITY(1,1),
		Name NVARCHAR(20) NOT NULL
)
Create table TransmissionTypes(
		ID Int PRIMARY KEY IDENTITY(1,1),
		Name NVARCHAR(20) NOT NULL
)
