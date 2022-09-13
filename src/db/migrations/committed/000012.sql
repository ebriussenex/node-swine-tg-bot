--! Previous: sha1:7733cc68eae95c15418770f3bf93cc2d45e010d0
--! Hash: sha1:1d91d2633ef350209072848a91963b635feeb17b

-- Enter migration here
ALTER TABLE swines ALTER COLUMN points TYPE NUMERIC(10,2);
