USE social;

-- INDEXING
CREATE INDEX idx_user_name ON User(name);
CREATE INDEX idx_post_userId ON Post(userId);
CREATE INDEX idx_post_createdAt ON Post(createdAt);
CREATE INDEX idx_comment_userId ON Comment(userId);
CREATE INDEX idx_comment_postId ON Comment(postId);
CREATE INDEX idx_comment_createdAt ON Comment(createdAt);
CREATE INDEX idx_like_userId_postId ON `Like`(userId, postId);
CREATE INDEX idx_like_userId_commentId ON `Like`(userId, commentId);
