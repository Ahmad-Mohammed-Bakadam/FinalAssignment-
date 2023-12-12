CREATE DATABASE bookmark_db;
USE bookmark_db;
CREATE TABLE Bookmark (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    URL VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    dateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
INSERT INTO Bookmark (URL, title, dateAdded) VALUES ('https://www.github.com/', 'GitHub', NOW());