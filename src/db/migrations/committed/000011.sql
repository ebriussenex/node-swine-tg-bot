--! Previous: sha1:03339ecea65496e8abe7fa9389dc205cef4ed491
--! Hash: sha1:7733cc68eae95c15418770f3bf93cc2d45e010d0

-- Enter migration here

CREATE OR REPLACE FUNCTION recalculate_points() RETURNS TRIGGER AS
$recalculate_points$
BEGIN
    IF NEW.win +  NEW.draw + NEW.loss <> 0 THEN
        NEW.points = (30 * NEW.win + 10 * NEW.draw)::FLOAT / (NEW.win +  NEW.draw + NEW.loss);  
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
