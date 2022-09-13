--! Previous: sha1:fa3c89ddd859c8b285d5071009178312a56c6e55
--! Hash: sha1:cf8da5270b349fbe93e621109e6c227226e0103a

-- Enter migration here
CREATE OR REPLACE FUNCTION recalculate_exp() RETURNS TRIGGER AS
$recalculate_exp$
BEGIN
    NEW.experience = 40 * NEW.win + 20 * NEW.draw + 10 * NEW.loss + 25 * NEW.fed_times;   
    RETURN NEW;
END;
$recalculate_exp$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS recalculate_exp ON swines;

CREATE TRIGGER recalculate_exp
    BEFORE UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION recalculate_exp();
