DROP TABLE IF EXISTS diary_entries;

CREATE TABLE diary_entries (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entry_date VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_diary_entries_date ON diary_entries (entry_date DESC);
CREATE INDEX idx_diary_entries_category ON diary_entries (category);

INSERT INTO diary_entries (entry_date, text, category) VALUES
    ('2026-11-01', 'Started the hackathon project. Got the repo set up.', 'Work'),
    ('2026-11-03', 'Long run along the river. Felt great.', 'Health'),
    ('2026-11-05', 'Caught up with friends over dinner.', 'Personal');