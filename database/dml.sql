--- Database manipulation queries for the group 60 library database
-- Group 60 - Lyle McCaffrey and Brett Bittola
--- Variables are denoted by a preceeding colon


--- INSERT queries for each table
INSERT INTO Creators (creatorName)
VALUES (:creatorNameInput);

INSERT INTO Types (name)
VALUES (:typeNameInput);

INSERT INTO Media (title, typeID, creatorID)
SELECT :mediaTitleInput AS title,
(SELECT typeID FROM Types WHERE name = :typeInput) AS typeID,
(SELECT creatorID FROM Creators WHERE creatorName = :creatorNameInput) AS creatorID;

INSERT INTO Copies (mediaID, customerID)
(SELECT mediaID FROM Media WHERE title = :mediaTitleInput) as mediaID,
(SELECT customerID FROM Customers WHERE firstName = :firstNameInput AND lastName = :lastNameInput) as customerID

INSERT INTO Customers (firstName, lastName, phoneNumber, email)
VALUES (:customerFNameInput, :customerLNameInput, :phoneInput, :emailInput);


--- SELECT queries for tables as appropriate
--- get all media item titles, types, and creators
SELECT Media.title, Types.typeName, Creators.creatorName
FROM Media
JOIN Types ON Media.typeID = Types.typeID
JOIN Creators ON Media.creatorID = Creators.creatorID;

--- get the title, type and creator of a given media item
SELECT Media.title, Types.typeName, Creators.creatorName
FROM Media
JOIN Types ON Media.typeID = Types.typeID
JOIN Creators ON Media.creatorID = Creators.creatorID
WHERE Media.title = :titleInput;

--- get all copies of a given media item to populate a list, including the copy, media, and customer ids, the media title, and the customer name
SELECT Copies.copyID, Media.mediaID, Media.title, Copies.customerID, Customers.firstName, Customers.lastName
FROM Copies
JOIN Media ON Copies.mediaID = Media.mediaID
JOIN Customers ON Copies.customerID = Customers.customerID
WHERE Media.title = :titleInput;

--- get all copies currently being loaned by a given customer
SELECT Copies.copyID, Copies.customerID
FROM Copies
JOIN Customers ON Copies.customerID = Customers.customerID
WHERE Customers.firstName = :firstNameInput
AND Customers.lastName = :lastNameInput;

--- get all types
SELECT typeName
FROM Types;

--- get all creators
SELECT creatorName
FROM Creators;

--- get a single customers data
SELECT *
FROM Customers
WHERE firstName = :fNameInput AND lastName = :lNameInput;

--- search for a given customers ID
SELECT customerID
FROM Customers
WHERE firstName = :firstNameInput
AND lastName = :lastNameInput;


--- DELETE queries for Copies and Customers
DELETE FROM Copies
WHERE copyID = :copyIDToDelete;

DELETE FROM Customers
WHERE firstName = :firstNameToDelete AND lastName = :lastNameToDelete;

--- update the copy data when it is loaned or returned
UPDATE Copies
SET customerID = :customerIDFromSearch,
WHERE copyID = :copyIDFromList;

--- update customer contact information
UPDATE Customers
SET phoneNumber = :phoneNumberInput, email = :emailInput,
WHERE firstName = :firstNameInput, lastName = lastNameInput;