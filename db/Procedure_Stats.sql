USE social;

-- Table for Statistics
CREATE TABLE UserStats (
    userId VARCHAR(191),
    statDate DATE,
    periodType ENUM('daily', 'monthly', 'annual'),
    postCount INT,
    commentCount INT,
    postRank INT,
    PRIMARY KEY (userId, statDate, periodType),
    FOREIGN KEY (userId) REFERENCES `User`(id) ON DELETE CASCADE
);

-- Procedure to Refresh Statistics
DELIMITER $$

CREATE PROCEDURE RefreshUserStats()
BEGIN
    -- Clear existing stats
    TRUNCATE TABLE UserStats;

    -- Daily Stats
    INSERT INTO UserStats (userId, statDate, periodType, postCount, commentCount, postRank)
    SELECT 
        p.userId,
        DATE(p.createdAt) AS statDate,
        'daily' AS periodType,
        COUNT(p.id) AS postCount,
        (SELECT COUNT(*) FROM Comment c WHERE c.userId = p.userId AND DATE(c.createdAt) = DATE(p.createdAt)) AS commentCount,
        RANK() OVER (PARTITION BY DATE(p.createdAt) ORDER BY COUNT(p.id) DESC) AS postRank
    FROM Post p
    GROUP BY p.userId, DATE(p.createdAt);

    -- Monthly Stats
    INSERT INTO UserStats (userId, statDate, periodType, postCount, commentCount, postRank)
    SELECT 
        p.userId,
        DATE_FORMAT(p.createdAt, '%Y-%m-01') AS statDate,
        'monthly' AS periodType,
        COUNT(p.id) AS postCount,
        (SELECT COUNT(*) FROM Comment c WHERE c.userId = p.userId AND DATE_FORMAT(c.createdAt, '%Y-%m') = DATE_FORMAT(p.createdAt, '%Y-%m')) AS commentCount,
        RANK() OVER (PARTITION BY DATE_FORMAT(p.createdAt, '%Y-%m') ORDER BY COUNT(p.id) DESC) AS postRank
    FROM Post p
    GROUP BY p.userId, DATE_FORMAT(p.createdAt, '%Y-%m');

    -- Annual Stats
    INSERT INTO UserStats (userId, statDate, periodType, postCount, commentCount, postRank)
    SELECT 
        p.userId,
        DATE_FORMAT(p.createdAt, '%Y-01-01') AS statDate,
        'annual' AS periodType,
        COUNT(p.id) AS postCount,
        (SELECT COUNT(*) FROM Comment c WHERE c.userId = p.userId AND YEAR(c.createdAt) = YEAR(p.createdAt)) AS commentCount,
        RANK() OVER (PARTITION BY YEAR(p.createdAt) ORDER BY COUNT(p.id) DESC) AS postRank
    FROM Post p
    GROUP BY p.userId, YEAR(p.createdAt);
END $$

DELIMITER ;
