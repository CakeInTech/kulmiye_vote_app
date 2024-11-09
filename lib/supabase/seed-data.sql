-- Seed Areas
INSERT INTO areas (name) VALUES
  ('Hargeisa'),
  ('Burco'),
  ('Berbera'),
  ('Erigavo');

-- Seed Locations
WITH area_ids AS (
  SELECT id, name FROM areas
)
INSERT INTO locations (area_id, name)
SELECT 
  id,
  location_name
FROM area_ids
CROSS JOIN (
  VALUES 
    ('Central'),
    ('North'),
    ('South'),
    ('East'),
    ('West')
) AS locations(location_name)
WHERE area_ids.name = 'Hargeisa'
UNION ALL
SELECT 
  id,
  location_name
FROM area_ids
CROSS JOIN (
  VALUES 
    ('Central'),
    ('East'),
    ('West')
) AS locations(location_name)
WHERE area_ids.name = 'Burco'
UNION ALL
SELECT 
  id,
  location_name
FROM area_ids
CROSS JOIN (
  VALUES 
    ('Port Area'),
    ('North'),
    ('South')
) AS locations(location_name)
WHERE area_ids.name = 'Berbera'
UNION ALL
SELECT 
  id,
  location_name
FROM area_ids
CROSS JOIN (
  VALUES 
    ('Central'),
    ('North'),
    ('South')
) AS locations(location_name)
WHERE area_ids.name = 'Erigavo';