PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      salary REAL DEFAULT 0,
      balance REAL DEFAULT 0
    );
INSERT INTO users VALUES(1,'vivaan_tandur','$2a$10$HIqvup5Peg/NIT.Hi7yobOgxJy.ODpi.0fubQ0cdoj4kxlxjxWvsu',150000000.0,0.0);
INSERT INTO users VALUES(2,'anirudh_ravi','$2a$10$QQApiWvKrlcAIBUihBxz7ORFah0Tz6wyJbCR6fqLIdNVlW72z.ARe',15000000.0,15000000.0);
INSERT INTO users VALUES(3,'vivaan_ujwal','$2a$10$GGlm11W6IwJyafZWe/eT5O7ln9KuCti1TcUC5dq696tTBDt0sBAxe',10000000.0,0.0);
INSERT INTO users VALUES(4,'agastya','$2a$10$odXxFcC.siz/C0nRZ4pVr.UH2NMXtKbULBth8xsUpHay8Z.GqqwJu',5000000.0,0.0);
INSERT INTO users VALUES(5,'shriniketh','$2a$10$8PdFd2BQ.mPGuFSQV/sDaObp/PoY624KNoS8JBWvbZCvLBTFAnHxm',1000000.0,0.0);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('users',5);
COMMIT;
