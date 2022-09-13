--! Previous: sha1:90dac3ad3ddf32f824f123219c3136f0408269c4
--! Hash: sha1:fa3c89ddd859c8b285d5071009178312a56c6e55

-- Enter migration here
ALTER TABLE swines 
ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 0 NOT NULL;

CREATE OR REPLACE FUNCTION recalculate_exp() RETURNS TRIGGER AS
$recalculate_exp$
BEGIN
    NEW.experience = 40 * NEW.win + 20 * NEW.draw + 10 * NEW.loss + 25 * NEW.times_fed;   
    RETURN NEW;
END;
$recalculate_exp$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS recalculate_exp ON swines;

CREATE TRIGGER recalculate_exp
    BEFORE UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION recalculate_exp();
