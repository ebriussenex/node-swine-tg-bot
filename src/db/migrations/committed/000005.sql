--! Previous: sha1:9fceede39cb5aab0d9050ecb4d8a78b671bab40e
--! Hash: sha1:f2089fda64994d4be90aeca7df804c34b0a8dfc6

-- Enter migration here
ALTER TABLE swines 
DROP COLUMN IF EXISTS max_weight,
DROP COLUMN IF EXISTS win_in_row;

ALTER TABLE swines 
ADD COLUMN IF NOT EXISTS max_weight INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS win_in_row INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS loss_in_row INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS draw_in_row INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS win_in_row_max INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS loss_in_row_max INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS draw_in_row_max INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS feed_add_timeout INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS fight_add_timeout INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS feed_add_mult INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS fight_add_mult INTEGER DEFAULT 0 NOT NULL;


CREATE OR REPLACE FUNCTION trigger_update_max() RETURNS TRIGGER AS
$trigger_update_max$
BEGIN
    IF NEW.weight >= NEW.max_weight THEN
        UPDATE swines SET max_weight = NEW.weight;
    END IF;
    IF NEW.win_in_row > OLD.win_in_row_max THEN
        UPDATE swines SET win_in_row_max = NEW.win_in_row;
    END IF;
    IF NEW.loss_in_row > OLD.loss_in_row_max THEN
        UPDATE swines SET loss_in_row_max = NEW.loss_in_row;
    END IF;
    IF NEW.draw_in_row > OLD.draw_in_row_max THEN
        UPDATE swines SET draw_in_row_max = NEW.draw_in_row;
    END IF;
    RETURN NEW;
END;
$trigger_update_max$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION trigger_update_in_row() RETURNS TRIGGER AS
$trigger_update_in_row$
BEGIN
    IF NEW.win > OLD.win THEN
        UPDATE swines SET win_in_row = (OLD.win_in_row + 1);
    ELSE 
        UPDATE swines SET win_in_row = 0;
    END IF;  
    IF NEW.loss > OLD.loss THEN
        UPDATE swines SET loss_in_row = (OLD.loss_in_row + 1);
    ELSE 
        UPDATE swines SET loss_in_row = 0;
    END IF;  
    IF NEW.draw > OLD.draw THEN
        UPDATE swines SET draw_in_row = (OLD.draw_in_row + 1);
            ELSE 
        UPDATE swines SET draw_in_row = 0;
    END IF;    
    RETURN NEW;
END;
$trigger_update_in_row$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS trigger_update_max ON swines;
DROP TRIGGER IF EXISTS trigger_update_in_row ON swines;

CREATE TRIGGER trigger_update_in_row
    AFTER UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION trigger_update_in_row();

CREATE TRIGGER trigger_update_max
    AFTER UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION trigger_update_max();
