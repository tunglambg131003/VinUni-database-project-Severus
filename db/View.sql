USE social;

-- UserProfileView
CREATE VIEW UserProfileView AS
SELECT id, username, name, surname, avatar, description, city, createdAt
FROM User;

-- PostWithUserView
CREATE VIEW PostWithUserView AS
SELECT p.id, p.desc, p.img, p.createdAt, p.updatedAt, u.username, u.avatar
FROM Post p
JOIN User u ON p.userId = u.id;

-- UserActivityView
CREATE VIEW UserActivityView AS
SELECT u.id, u.username, 
       p.id AS postId, p.desc AS postDesc, p.createdAt AS postCreatedAt,
       c.id AS commentId, c.desc AS commentDesc, c.createdAt AS commentCreatedAt,
       l.postId AS likedPostId, l.createdAt AS likeCreatedAt
FROM User u
LEFT JOIN Post p ON u.id = p.userId
LEFT JOIN Comment c ON u.id = c.userId
LEFT JOIN `Like` l ON u.id = l.userId;

-- FollowerCountView
CREATE VIEW FollowerCountView AS
SELECT u.id, u.username,
       (SELECT COUNT(*) FROM Follower f WHERE f.followingId = u.id) AS followerCount,
       (SELECT COUNT(*) FROM Follower f WHERE f.followerId = u.id) AS followingCount
FROM User u;

