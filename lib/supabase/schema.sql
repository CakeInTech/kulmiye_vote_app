-- Create tables
CREATE TABLE reporters (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE areas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE TABLE locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  area_id UUID REFERENCES areas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE TABLE votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reporter_id UUID REFERENCES reporters(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  vote_count INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE reporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Reporters can view their own profile"
  ON reporters FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Reporters can update their own profile"
  ON reporters FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view areas"
  ON areas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view locations"
  ON locations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reporters can insert votes"
  ON votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Reporters can view all votes"
  ON votes FOR SELECT
  TO authenticated
  USING (true);

-- Create functions
CREATE OR REPLACE FUNCTION get_area_stats()
RETURNS TABLE (
  area_id UUID,
  area_name TEXT,
  total_votes BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id as area_id,
    a.name as area_name,
    COALESCE(SUM(v.vote_count), 0) as total_votes
  FROM areas a
  LEFT JOIN locations l ON l.area_id = a.id
  LEFT JOIN votes v ON v.location_id = l.id
  GROUP BY a.id, a.name;
END;
$$ LANGUAGE plpgsql;