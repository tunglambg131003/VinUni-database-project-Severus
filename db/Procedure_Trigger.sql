USE social;

# Procedure: Follow a user
DELIMITER $$

CREATE PROCEDURE FollowUser(
    IN p_senderId VARCHAR(191),
    IN p_receiverId VARCHAR(191)
)
BEGIN
	INSERT IGNORE INTO FollowRequest(senderId, receiverId) 
	VALUES (p_senderId, p_receiverId);
END $$

DELIMITER ;

# Procedure: Block a user
DELIMITER $$

CREATE PROCEDURE BlockUser(
  IN blockerId VARCHAR(191),
  IN blockedId VARCHAR(191)
)
BEGIN
  DELETE FROM Follower
  WHERE (followerId = blockerId AND followingId = blockedId)
     OR (followerId = blockedId AND followingId = blockerId);
     
  DELETE FROM FollowRequest
  WHERE (senderId = blockerId AND receiverId = blockedId)
     OR (senderId = blockedId AND receiverId = blockerId);

  INSERT IGNORE INTO Block(blockerId, blockedId)
  VALUES (blockerId, blockedId);
END $$

DELIMITER ;

# Procedure: Accept FollowRequest
DELIMITER $$

CREATE PROCEDURE AcceptFollowRequest(
  IN senderId VARCHAR(191),
  IN receiverId VARCHAR(191)
)
BEGIN
  DELETE FROM FollowRequest
  WHERE senderId = senderId AND receiverId = receiverId;

  INSERT IGNORE INTO Follower(followerId, followingId)
  VALUES (senderId, receiverId);
END $$

DELIMITER ;

# Trigger: Prevent FollowRequest if Block
DELIMITER $$

CREATE TRIGGER PreventBlockedFollowRequest
BEFORE INSERT ON FollowRequest
FOR EACH ROW
BEGIN
  IF EXISTS (
    SELECT 1 FROM Block
    WHERE blockerId = NEW.receiverId AND blockedId = NEW.senderId
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot send follow request: blocked by this user.';
  END IF;
END $$

DELIMITER ;

