-- =============================================
-- Migration: Add records_atualizados column
-- Tracks whether fighter records have been updated for a fight
-- Prevents double-counting wins/losses during sync
-- =============================================

-- Add column to track if fighter records were updated for this fight
ALTER TABLE lutas ADD COLUMN IF NOT EXISTS records_atualizados BOOLEAN DEFAULT FALSE;

-- Add index for performance (find fights that need records update)
CREATE INDEX IF NOT EXISTS idx_lutas_records_atualizados ON lutas(records_atualizados) WHERE records_atualizados = FALSE;

-- Mark all existing finalized fights as having records already updated
-- (to prevent re-counting on next sync)
UPDATE lutas SET records_atualizados = TRUE WHERE vencedor_id IS NOT NULL AND records_atualizados = FALSE;
