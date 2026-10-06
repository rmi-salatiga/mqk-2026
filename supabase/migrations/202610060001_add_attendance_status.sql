BEGIN;

ALTER TABLE public.peserta
    ADD COLUMN IF NOT EXISTS status_kehadiran text NOT NULL DEFAULT 'Belum Hadir';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'peserta_status_kehadiran_check'
          AND conrelid = 'public.peserta'::regclass
    ) THEN
        ALTER TABLE public.peserta
            ADD CONSTRAINT peserta_status_kehadiran_check
            CHECK (status_kehadiran IN ('Belum Hadir', 'Hadir'));
    END IF;
END
$$;

COMMENT ON COLUMN public.peserta.status_kehadiran IS
    'Attendance state recorded by committee staff on event day.';

COMMIT;
