-- Text to SQL original prompt:
-- I want to create a schema creation script for this database

CREATE SCHEMA IF NOT EXISTS neon_auth;

CREATE TABLE IF NOT EXISTS neon_auth.users_sync (
    raw_json jsonb NOT NULL,
    id text GENERATED ALWAYS AS (raw_json ->> 'id') STORED NOT NULL,
    name text GENERATED ALWAYS AS (raw_json ->> 'display_name') STORED,
    email text GENERATED ALWAYS AS (raw_json ->> 'primary_email') STORED,
    created_at timestamp with time zone GENERATED ALWAYS AS (to_timestamp(trunc((raw_json ->> 'signed_up_at_millis')::bigint::double precision) / 1000::double precision)) STORED,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.skills (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    skill_name character varying(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.learning_skills (
    user_id integer NOT NULL,
    skill_id integer NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES public.users(id),
    FOREIGN KEY (skill_id) REFERENCES public.skills(id)
);

CREATE TABLE IF NOT EXISTS public.teaching_skills (
    user_id integer NOT NULL,
    skill_id integer NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES public.users(id),
    FOREIGN KEY (skill_id) REFERENCES public.skills(id)
);

CREATE VIEW IF NOT EXISTS public.matches_view AS
SELECT t.user_id AS teacherid, l.user_id AS studentid, t.skill_id
FROM public.teaching_skills t
JOIN public.learning_skills l ON t.skill_id = l.skill_id
WHERE t.user_id <> l.user_id;

CREATE INDEX IF NOT EXISTS users_sync_deleted_at_idx ON neon_auth.users_sync (deleted_at);