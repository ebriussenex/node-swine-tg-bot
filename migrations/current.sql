-- Enter migration here

ALTER TABLE swines
DROP CONSTRAINT fk_owner_id_tg_user_id,
DROP CONSTRAINT fk_chat_id_tg_chat_id;

ALTER TABLE tg_chats ALTER COLUMN id TYPE TEXT;
ALTER TABLE tg_users ALTER COLUMN id TYPE TEXT;

ALTER TABLE swines
ALTER COLUMN owner_id TYPE TEXT,
ALTER COLUMN chat_id TYPE TEXT,
ADD  CONSTRAINT fk_chat_id_tg_chat_id 
        FOREIGN KEY(chat_id) REFERENCES TG_CHATS(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
ADD  CONSTRAINT fk_owner_id_tg_user_id
     FOREIGN KEY(owner_id) REFERENCES TG_USERS(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE;

