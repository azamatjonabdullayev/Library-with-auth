-- CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'

CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(155) NOT NULL UNIQUE,
  email VARCHAR(155) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(100) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS books(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(155) NOT NULL,
  author VARCHAR(155) NOT NULL,
  description TEXT NOT NULL,
  year INTEGER
);


CREATE TABLE IF NOT EXISTS book_loans(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  return_date TIMESTAMP NOT NULL
);


-- Insert into users
INSERT INTO users (username, email, password, role)
VALUES 
('john_doe', 'john.doe@example.com', 'hashed_password_1', 'user'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'admin'),
('mike_brown', 'mike.brown@example.com', 'hashed_password_3', 'user'),
('lisa_white', 'lisa.white@example.com', 'hashed_password_4', 'user'),
('kevin_jones', 'kevin.jones@example.com', 'hashed_password_5', 'moderator'),
('emma_clark', 'emma.clark@example.com', 'hashed_password_6', 'user'),
('daniel_miller', 'daniel.miller@example.com', 'hashed_password_7', 'admin'),
('olivia_wilson', 'olivia.wilson@example.com', 'hashed_password_8', 'user'),
('noah_taylor', 'noah.taylor@example.com', 'hashed_password_9', 'user'),
('sophia_anderson', 'sophia.anderson@example.com', 'hashed_password_10', 'user'),
('liam_thomas', 'liam.thomas@example.com', 'hashed_password_11', 'user'),
('mia_jackson', 'mia.jackson@example.com', 'hashed_password_12', 'user'),
('lucas_lee', 'lucas.lee@example.com', 'hashed_password_13', 'moderator'),
('ava_harris', 'ava.harris@example.com', 'hashed_password_14', 'user'),
('jack_martin', 'jack.martin@example.com', 'hashed_password_15', 'user'),
('charlotte_thompson', 'charlotte.thompson@example.com', 'hashed_password_16', 'user'),
('elijah_garcia', 'elijah.garcia@example.com', 'hashed_password_17', 'user'),
('amelia_moore', 'amelia.moore@example.com', 'hashed_password_18', 'admin'),
('james_rodriguez', 'james.rodriguez@example.com', 'hashed_password_19', 'user'),
('harper_hernandez', 'harper.hernandez@example.com', 'hashed_password_20', 'user'),
('benjamin_lopez', 'benjamin.lopez@example.com', 'hashed_password_21', 'user'),
('evelyn_gonzalez', 'evelyn.gonzalez@example.com', 'hashed_password_22', 'moderator'),
('alexander_walker', 'alexander.walker@example.com', 'hashed_password_23', 'user'),
('abigail_hall', 'abigail.hall@example.com', 'hashed_password_24', 'user'),
('mason_allen', 'mason.allen@example.com', 'hashed_password_25', 'user');


-- Insert into books
INSERT INTO books (title, author, description, year) VALUES
('The Silent Forest', 'Emma Carter', 'A thrilling story of survival in the wild forest.', 2015),
('Ocean''s Whisper', 'Liam Brooks', 'A mysterious tale of sailors and deep secrets.', 2018),
('Desert Mirage', 'Sophia Turner', 'Adventure in the endless dunes and lost civilizations.', 2012),
('Frozen Horizon', 'James Fisher', 'An expedition to the arctic gone wrong.', 2019),
('The Last Heir', 'Olivia Bennett', 'A royal family secret threatens the kingdom.', 2017),
('Echoes of Time', 'Lucas Gray', 'A time-travel adventure through ancient empires.', 2020),
('Shadows of Dawn', 'Mia Scott', 'Mystery and suspense unfold in a sleepy town.', 2014),
('Crimson Legacy', 'Benjamin Adams', 'A dark legacy haunts a family for generations.', 2016),
('Whispering Pines', 'Charlotte Reed', 'Strange events in a quiet mountain village.', 2013),
('Steel and Silk', 'Daniel Hughes', 'Tale of samurais, honor, and betrayal.', 2021),
('The Forgotten Manuscript', 'Ava Morgan', 'A historian discovers a manuscript that changes history.', 2011),
('Iron Will', 'Noah Russell', 'A blacksmith''s rise from poverty to legend.', 2015),
('Beyond the Stars', 'Amelia James', 'Humanity''s first journey beyond the solar system.', 2022),
('The River''s Secret', 'Elijah Coleman', 'A detective story unraveling mysteries along the river.', 2010),
('The Hidden Vault', 'Harper Simmons', 'Treasure hunters race against time.', 2017),
('Veil of Ice', 'Jack Peterson', 'Survivors trapped in a deadly snowstorm.', 2016),
('Storm Chasers', 'Abigail Price', 'A thrilling pursuit of extreme weather phenomena.', 2019),
('The Glass Kingdom', 'Mason Blake', 'A fantasy world of crystal towers and dark magic.', 2018),
('Scarlet Moon', 'Evelyn Ross', 'A werewolf saga with ancient curses.', 2014),
('Labyrinth of Lies', 'Alexander Perry', 'A political thriller with deep conspiracies.', 2012),
('Golden Compass', 'Isla Collins', 'Adventure with hidden maps and lost worlds.', 2013),
('Silent Rebellion', 'Ethan Foster', 'A dystopian uprising led by the unlikeliest hero.', 2015),
('Crown of Thorns', 'Chloe Bailey', 'A kingdom torn apart by betrayal and ambition.', 2017),
('Twilight Archives', 'Logan Richardson', 'An ancient library holding secrets of immortality.', 2018),
('The Iron Gate', 'Zoe Campbell', 'A dark fortress guarding the world''s deadliest weapon.', 2020);


-- Insert into book_loans
INSERT INTO book_loans (book_id, user_id, return_date) VALUES
-- 1
('8e768ad1-c990-495f-bc9c-8d67cb8a6c2d', '77830774-8eec-466b-bf73-926d627fcd90', NOW() + INTERVAL '14 days'),
-- 2
('091556a4-2f4a-4e67-afe6-1d843935e9d6', '66b4b375-7c3c-430a-a995-b20b3db247be', NOW() + INTERVAL '21 days'),
-- 3
('57469685-5eea-4bf4-88f0-54bdad0636f7', '3423f1fb-67f7-4b3d-bee2-3f09a6fdcb2c', NOW() + INTERVAL '10 days'),
-- 4
('9b90d2e3-dd08-4ddc-b4f4-c4296aa77f5c', 'fb208bb3-9cc8-4936-a8d2-d197a27d8d82', NOW() + INTERVAL '30 days'),
-- 5
('77215e4d-4d48-40fd-ab09-aeac272cc94d', '10819fca-0127-482b-be30-6bd89cde9d01', NOW() + INTERVAL '9 days'),
-- 6
('fb13e64a-8ee2-4684-9dfd-82a8ee33d8d8', '31f0d0a8-7f3c-421e-9407-291e274ba3f4', NOW() + INTERVAL '16 days'),
-- 7
('1a69a75a-a328-47e6-8d37-30cc2e507cd7', 'f58d41bd-48f8-4755-a49e-1904d8e0e72b', NOW() + INTERVAL '11 days'),
-- 8
('c83e1cd8-5c07-4f91-9b05-ce99a267c7b2', '4dca206f-d37f-4073-9341-31f83654c6d7', NOW() + INTERVAL '25 days'),
-- 9
('2e743e83-4d7e-4b7b-8417-01509b9c5692', '80a642d3-bd97-4eb2-bb7d-358136b0e2d7', NOW() + INTERVAL '8 days'),
-- 10
('4de1c4a9-ccd3-430a-8b02-880953ddcd1b', 'bec8fbfa-5d0c-433d-9ce3-7f37e71925a1', NOW() + INTERVAL '12 days'),
-- 11
('e8bcc860-ba15-4c6d-8080-050f659789a4', 'fab15258-24df-47c0-a7ba-372c09b3e2bc', NOW() + INTERVAL '18 days'),
-- 12
('1cddc429-84eb-4166-979d-d59e07e87ec0', '1e63c575-3337-4bb7-a561-ebf51fa6c29a', NOW() + INTERVAL '15 days'),
-- 13
('1def00f0-861b-47a2-be77-c0546cfe0891', '731b5647-3ba6-4e17-bad7-1288e7106670', NOW() + INTERVAL '7 days'),
-- 14
('c6eb5d09-2f37-4073-8a55-7010dc5c6e2f', '25507de9-8ca8-4c9b-8581-963cf6c73bef', NOW() + INTERVAL '22 days'),
-- 15
('24f8a9ec-8d01-4243-a6bd-19625712a999', 'e66f8c53-8d53-4b2f-9287-235e2295c3aa', NOW() + INTERVAL '19 days'),
-- 16
('8a1b8d95-135a-448b-9694-583a7992bd28', '4e8074a4-1ca0-408f-94b9-69c48cea7d1f', NOW() + INTERVAL '13 days'),
-- 17
('2697fb4a-4dc8-4e90-814f-e504f4a0efc5', '8aaec59d-4067-46f9-950c-f7f1faff678e', NOW() + INTERVAL '17 days'),
-- 18
('7b7912c7-7101-452c-ab5b-ac98c49f6b16', 'e485ad0d-f4a0-4e31-806c-c7e0685294e8', NOW() + INTERVAL '24 days'),
-- 19
('5f673704-a916-4ec7-904f-cd267d4ce3b9', 'c7718c2b-0d7c-45bf-a7ba-3b76619e2f52', NOW() + INTERVAL '20 days'),
-- 20
('7a2e9498-f9ec-41d9-a920-6cd9979af514', 'c1528562-3850-4f08-b35c-4bf6570b2d03', NOW() + INTERVAL '14 days');

