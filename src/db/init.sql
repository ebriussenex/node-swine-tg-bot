CREATE TABLE IF NOT EXISTS tg_users(
    id INT PRIMARY KEY NOT NULL,
    is_bot BOOLEAN NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    username TEXT
);
CREATE TABLE IF NOT EXISTS tg_chat(
    id INT PRIMARY KEY NOT NULL,
    chat_type TEXT NOT NULL,
    title TEXT,
    first_name TEXT,
    last_name TEXT
);
CREATE TABLE IF NOT EXISTS pig(
    id SERIAL PRIMARY KEY NOT NULL,
    chat_id INT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    weight INT NOT NULL DEFAULT 5,
    last_time_fed TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_chat_id_tg_chat_id FOREIGN KEY(chat_id) REFERENCES tg_chat(id) ON DELETE CASCADE
);