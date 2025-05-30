USE social;

-- Query Optimization
DELIMITER //

CREATE PROCEDURE seed_fake_users()
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= 100000 DO
    INSERT INTO `User` (
      id, email, username, avatar, cover,
      name, surname, description, city, school,
      work, website, createdAt
    )
    VALUES (
      UUID(),  -- id: unique UUID
      CONCAT('user', i, '@example.com'),          -- email
      CONCAT('user', i),                          -- username
      NULL, NULL,                                 -- avatar, cover
      CONCAT('Name', i),                          -- name
      CONCAT('Surname', i),                       -- surname
      'This is fake user data.',                  -- description
      'Faketown',                                 -- city
      'Fake University',                          -- school
      'Fake Company',                             -- work
      CONCAT('https://example.com/user', i),      -- website
      CURRENT_TIMESTAMP                           -- createdAt
    );
    SET i = i + 1;
  END WHILE;
END;
//

DELIMITER ;

-- Run the procedure if needed testing optimization performance
-- CALL seed_fake_users();

-- Run this for testing purpose

DROP INDEX idx_user_name on User;

FLUSH STATUS;
SELECT * FROM User WHERE name LIKE 'Name1234%';
SHOW STATUS
LIKE 'Handler_read%';

EXPLAIN SELECT * FROM User WHERE name LIKE 'Name1234%';

CREATE INDEX idx_user_name ON User(name);

SHOW INDEX FROM User;

FLUSH STATUS;
SELECT * FROM User WHERE name LIKE 'Name1234%';
SHOW STATUS
LIKE 'Handler_read%';

EXPLAIN SELECT * FROM User WHERE name LIKE 'Name1234%';


