-- Group 60 - Lyle McCaffrey and Brett Bittola

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table structure for table `Types`

CREATE OR REPLACE TABLE Types (
    typeID int NOT NULL AUTO_INCREMENT,
    typeName varchar(250) NOT NULL,
    PRIMARY KEY (typeID)
);

-- Table structure for table `Creators`

CREATE OR REPLACE TABLE Creators (
    creatorID int NOT NULL AUTO_INCREMENT,
    creatorName varchar(250) NOT NULL,

    PRIMARY KEY (creatorID)  
);

-- Table structure for table `Customers`

CREATE OR REPLACE TABLE Customers (
    customerID int NOT NULL AUTO_INCREMENT,
    firstName varchar(250) NOT NULL,
    lastName varchar(250) NOT NULL,
    phoneNumber varchar(250) NOT NULL,
    email varchar(250) NOT NULL,

    PRIMARY KEY (customerID)
);

-- Table structure for table `Media`

CREATE OR REPLACE TABLE Media (
    mediaID int NOT NULL AUTO_INCREMENT,
    title varchar(250) NOT NULL,
    typeID int NOT NULL,
    creatorID int,

    PRIMARY KEY (mediaID),
    FOREIGN KEY (typeID) REFERENCES Types(typeID) ON DELETE CASCADE,
    FOREIGN KEY (creatorID) REFERENCES Creators(creatorID) ON DELETE CASCADE
);

-- Table structure for table `Copies`
CREATE TABLE Copies (
    copyID int NOT NULL AUTO_INCREMENT,
    mediaID int NOT NULL,
    customerID int,
    PRIMARY KEY (copyID),
    FOREIGN KEY (mediaID) REFERENCES Media(mediaID) ON DELETE CASCADE,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE SET NULL
);


-- Insert example data for table `Media`

INSERT INTO Media (title, typeID, creatorID)
VALUES ('Dune', 1, 4),
('The Dark Knight', 2, 3),
('Pulp Fiction', 2, 5),
('Elden Ring', 3, 1),
('Moby Dick', 1, 2);

-- Insert example data for table `Types`

INSERT INTO Types (typeName)
VALUES ('Book'),
('Movie'),
('Video Game');

-- Insert example data for table `Creators`

INSERT INTO Creators (creatorName)
VALUES ('FromSoftware'),
('Herman Melville'),
('Christopher Nolan'),
('Frank Herbert'),
('Quentin Tarantino');

-- Insert example data for table `Customers`

INSERT INTO Customers (firstName, lastName, phoneNumber, email)
VALUES
('David', 'Johnson', '548-23-49513', 'davidjohnson@hotmail.com'),
('Samantha', 'Smith', '748-594-1102', 'samanthasmith@yahoo.com'),
('Ashley', 'Brown', '325-102-4476', 'ashleybrown@gmail.com'),
('Kailey', 'Jones', '362-205-1145', 'kaileyjones@oregonstate.edu'),
('Johnathan', 'Miller', '125-589-9996', 'johnathanmiller@aol.com');

-- Insert example data for table `Copies`

INSERT INTO Copies (mediaID, customerID)
VALUES
(3, 4),
(5, 2),
(3, 5),
(1, 5),
(2, 3);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;