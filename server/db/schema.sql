-- The complete shape of the database. Safe to run against an empty database,
-- and safe to run twice.
--
-- This file is committed on purpose. Your schema is a fact about your
-- application, not a runtime concern: it should be readable by opening a file
-- rather than by connecting to a server. It is also what lets you move to a
-- hosted database in one command.

CREATE TABLE IF NOT EXISTS category (
  id            SERIAL PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS artwork (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  category_id INTEGER     NOT NULL REFERENCES category(id), 
  date_made   DATE        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  image_path  TEXT        NOT NULL,
);

CREATE TABLE IF NOT EXISTS service (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
);

-- The list page always sorts newest first. Without this the database reads
-- every row and sorts it on each request.
CREATE INDEX IF NOT EXISTS artwork_date_made_idx
  ON artwork (date_made DESC, id DESC);
