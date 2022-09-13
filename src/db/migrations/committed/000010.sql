--! Previous: sha1:cf8da5270b349fbe93e621109e6c227226e0103a
--! Hash: sha1:03339ecea65496e8abe7fa9389dc205cef4ed491

-- Enter migration here
ALTER TABLE swines 
ADD COLUMN IF NOT EXISTS points NUMERIC(10,3) DEFAULT 0 NOT NULL;

CREATE OR REPLACE FUNCTION recalculate_points() RETURNS TRIGGER AS
$recalculate_points$
BEGIN
    IF NEW.win +  NEW.draw + NEW.loss <> 0 THEN
        NEW.points = (3 * NEW.win + 1 * NEW.draw) / (NEW.win +  NEW.draw + NEW.loss);  
    END IF; 
    RETURN NEW;
END;
$recalculate_points$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS recalculate_points ON swines;

CREATE TRIGGER recalculate_points
    BEFORE UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION recalculate_points();
