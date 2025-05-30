USE social;

-- PRIVILEGES
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'secure_admin_pass';
CREATE USER 'normal_user'@'localhost' IDENTIFIED BY 'secure_user_pass';
CREATE USER 'read_only'@'localhost' IDENTIFIED BY 'secure_read_pass';

GRANT ALL PRIVILEGES ON social.* TO 'admin'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON social.`User` TO 'normal_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON social.Post TO 'normal_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON social.Comment TO 'normal_user'@'localhost';
GRANT SELECT, INSERT, DELETE ON social.`Like` TO 'normal_user'@'localhost';
GRANT SELECT, INSERT, DELETE ON social.Follower TO 'normal_user'@'localhost';
GRANT SELECT, INSERT, DELETE ON social.FollowRequest TO 'normal_user'@'localhost';
GRANT SELECT, INSERT, DELETE ON social.Block TO 'normal_user'@'localhost';
GRANT SELECT, INSERT ON social.Story TO 'normal_user'@'localhost';
GRANT SELECT ON social.* TO 'read_only'@'localhost';
