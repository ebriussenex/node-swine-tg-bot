--! Previous: sha1:0d97b281d29abf7362335733aa99e8537e3243e3
--! Hash: sha1:90dac3ad3ddf32f824f123219c3136f0408269c4

-- Enter migration here

DROP TRIGGER IF EXISTS trigger_update_max ON swines;
DROP TRIGGER IF EXISTS trigger_update_in_row ON swines;

CREATE TRIGGER trigger_update_in_row
    BEFORE UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION trigger_update_in_row();

create TRIGGER trigger_update_max
    BEFORE UPDATE
    ON swines
    FOR EACH ROW
EXECUTE FUNCTION trigger_update_max();
