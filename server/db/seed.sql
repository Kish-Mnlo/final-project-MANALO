-- Sample data for development.
--
-- This starts with TRUNCATE. That is correct on your laptop and catastrophic
-- against the database your live demo depends on. Check which DATABASE_URL is
-- loaded before you run it.

TRUNCATE TABLE category RESTART IDENTITY CASCADE;

INSERT INTO category (category_name) VALUES ('Illustration'), ('Chibi'), ('Fan-art');
