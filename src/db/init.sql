DROP TABLE IF EXISTS TG_USERS, TG_CHATS, SWINES CASCADES;

CREATE TABLE IF NOT EXISTS TG_USERS(
    id INT PRIMARY KEY NOT NULL,
    is_bot BOOLEAN NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    username TEXT
);

CREATE TABLE IF NOT EXISTS TG_CHATS(
    id INT PRIMARY KEY NOT NULL,
    chat_type TEXT NOT NULL,
    title TEXT,
    first_name TEXT,
    last_name TEXT;
);

CREATE TABLE IF NOT EXISTS SWINES(
    id SERIAL NOT NULL,
    owner_id INT NOT NULL,
    chat_id INT NOT NULL,
    name TEXT NOT NULL DEFAULT 'Swine',
    weight INT NOT NULL DEFAULT 5,
    last_time_fed TIMESTAMP WITH TIME ZONE NOT NULL
        DEFAULT CURRENT_TIMESTAMP - INTERVAL '1 DAY',
    CONSTRAINT fk_chat_id_tg_chat_id 
        FOREIGN KEY(chat_id) REFERENCES TG_CHATS(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_owner_id_tg_user_id
     FOREIGN KEY(owner_id) REFERENCES TG_USERS(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    PRIMARY KEY(owner_id, chat_id)
);

truncate table tg_users cascade; truncate table tg_chats cascade; truncate table tg_users cascade;
insert into tg_users(id, is_bot,first_name) values (1, false, 'leha');
insert into tg_chats(id, first_name,chat_type) values (1, 'leha', 'private');

insert into swines(owner_id, chat_id) values (1, 1);
select * from swines;
select * from tg_users;
select * from tg_chats;

