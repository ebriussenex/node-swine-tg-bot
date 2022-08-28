--! Previous: sha1:6438aaf802e564c491631c83e9604e17f7d0f4ce
--! Hash: sha1:9fceede39cb5aab0d9050ecb4d8a78b671bab40e

-- Enter migration here
ALTER TABLE swines 
ADD COLUMN fed_times INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN to_delete BOOLEAN DEFAULT false NOT NULL;
