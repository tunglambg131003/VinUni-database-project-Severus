USE social;
SET SQL_SAFE_UPDATES = 0;

-- "bab88fea-3b03-11f0-a627-7ee60a7d5430": id 1
-- "bab89670-3b03-11f0-a627-7ee60a7d5430": id 2
-- "bab8a3c2-3b03-11f0-a627-7ee60a7d5430": id 3
-- "bab8c58c-3b03-11f0-a627-7ee60a7d5430": id 4

Call FollowUser("bab89670-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");
Call FollowUser("bab8a3c2-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");
Call FollowUser("bab8c58c-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");

SELECT * FROM FollowRequest WHERE receiverId = "bab88fea-3b03-11f0-a627-7ee60a7d5430";

Call AcceptFollowRequest("bab89670-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");
Call AcceptFollowRequest("bab8a3c2-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");
Call AcceptFollowRequest("bab8c58c-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");

SELECT * FROM Follower WHERE followingId = "bab88fea-3b03-11f0-a627-7ee60a7d5430";

Call BlockUser("bab88fea-3b03-11f0-a627-7ee60a7d5430", "bab8a3c2-3b03-11f0-a627-7ee60a7d5430");

SELECT * FROM Follower WHERE followingId = "bab88fea-3b03-11f0-a627-7ee60a7d5430";

Call FollowUser("bab8a3c2-3b03-11f0-a627-7ee60a7d5430", "bab88fea-3b03-11f0-a627-7ee60a7d5430");

-- Error Code: 1644. Cannot send follow request: blocked by this user.

-- RESET TABLE
DELETE FROM Follower WHERE followingId = "bab88fea-3b03-11f0-a627-7ee60a7d5430";

DELETE FROM Block WHERE blockerId = "bab88fea-3b03-11f0-a627-7ee60a7d5430";



