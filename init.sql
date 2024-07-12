CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    balance INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transfers (
    id SERIAL PRIMARY KEY,
    from_id INTEGER NOT NULL,
    to_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_id) REFERENCES accounts(id),
    FOREIGN KEY (to_id) REFERENCES accounts(id)
);

INSERT INTO users (name) VALUES
('Arisha Barron'),
('Branden Gibson'),
('Rhonda Church'),
('Georgina Hazel');

INSERT INTO accounts (user_id, balance) VALUES
(1, 10000),
(1, 2000),
(2, 34500),
(3, 23000),
(4, 43999);

INSERT INTO transfers (from_id, to_id, amount, created_at) VALUES
(3, 1, 1020, '2024-01-15T10:30:00'),
(1, 2, 2030, '2024-02-03T14:45:00'),
(5, 4, 5000, '2024-02-17T09:20:00'),
(3, 2, 3500, '2024-03-05T16:00:00'),
(5, 1, 1500, '2024-03-22T11:15:00'),
(2, 3, 2000, '2024-04-08T13:30:00'),
(4, 5, 1000, '2024-04-19T15:45:00'),
(4, 1, 3000, '2024-05-02T10:00:00'),
(5, 3, 7500, '2024-05-14T12:30:00'),
(4, 2, 4200, '2024-05-28T09:45:00'),
(1, 5, 800, '2024-06-10T14:20:00'),
(2, 4, 1700, '2024-06-23T11:00:00'),
(3, 1, 2500, '2024-07-05T16:30:00'),
(1, 3, 1200, '2024-07-18T10:15:00'),
(2, 5, 3300, '2024-07-30T13:45:00'),
(5, 2, 6000, '2024-08-12T15:00:00'),
(3, 4, 900, '2024-08-25T09:30:00'),
(2, 1, 1800, '2024-09-07T12:00:00');
