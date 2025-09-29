-- Seed sample data for the music platform

-- Insert sample genres and moods
INSERT INTO public.profiles (id, username, display_name, bio, user_type, is_verified) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'theweeknd', 'The Weeknd', 'Official account of The Weeknd', 'artist', true),
  ('550e8400-e29b-41d4-a716-446655440002', 'taylorswift', 'Taylor Swift', 'Official Taylor Swift account', 'artist', true),
  ('550e8400-e29b-41d4-a716-446655440003', 'dualipa', 'Dua Lipa', 'Official Dua Lipa account', 'artist', true),
  ('550e8400-e29b-41d4-a716-446655440004', 'musicfan1', 'Alex Johnson', 'Music lover and playlist curator', 'fan', false),
  ('550e8400-e29b-41d4-a716-446655440005', 'venue_owner', 'Madison Square Garden', 'Iconic NYC venue', 'venue', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample artists
INSERT INTO public.artists (id, profile_id, stage_name, genre, description, monthly_listeners, record_label) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'The Weeknd', ARRAY['R&B', 'Pop', 'Alternative'], 'Canadian singer, songwriter, and record producer', 85000000, 'XO/Republic Records'),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Taylor Swift', ARRAY['Pop', 'Country', 'Folk'], 'American singer-songwriter', 95000000, 'Republic Records'),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Dua Lipa', ARRAY['Pop', 'Dance', 'Electronic'], 'English singer and songwriter', 75000000, 'Warner Records')
ON CONFLICT (id) DO NOTHING;

-- Insert sample albums
INSERT INTO public.albums (id, artist_id, title, description, release_date, album_type, is_published) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'After Hours', 'Fourth studio album by The Weeknd', '2020-03-20', 'album', true),
  ('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 'Midnights', 'Tenth studio album by Taylor Swift', '2022-10-21', 'album', true),
  ('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', 'Future Nostalgia', 'Second studio album by Dua Lipa', '2020-03-27', 'album', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample tracks
INSERT INTO public.tracks (id, artist_id, album_id, title, duration_seconds, track_number, genre, mood, bpm, is_published, play_count, like_count) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Blinding Lights', 200, 1, ARRAY['Synthpop', 'R&B'], ARRAY['Energetic', 'Upbeat'], 171, true, 2500000, 180000),
  ('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Save Your Tears', 215, 2, ARRAY['R&B', 'Pop'], ARRAY['Melancholic', 'Emotional'], 118, true, 1800000, 120000),
  ('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 'Anti-Hero', 201, 1, ARRAY['Pop', 'Alternative'], ARRAY['Introspective', 'Dark'], 97, true, 3200000, 250000),
  ('850e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 'Lavender Haze', 202, 2, ARRAY['Pop', 'Synth-pop'], ARRAY['Dreamy', 'Romantic'], 96, true, 2100000, 160000),
  ('850e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'Levitating', 203, 1, ARRAY['Pop', 'Dance'], ARRAY['Upbeat', 'Fun'], 103, true, 2800000, 200000),
  ('850e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'Don''t Start Now', 183, 2, ARRAY['Pop', 'Disco'], ARRAY['Confident', 'Empowering'], 124, true, 2600000, 190000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample playlists
INSERT INTO public.playlists (id, user_id, title, description, is_public) VALUES
  ('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'Top Hits 2024', 'The biggest hits of the year', true),
  ('950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'Chill Vibes', 'Perfect for relaxing', true),
  ('950e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'Workout Mix', 'High energy tracks for the gym', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample playlist tracks
INSERT INTO public.playlist_tracks (playlist_id, track_id, position, added_by) VALUES
  ('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 1, '550e8400-e29b-41d4-a716-446655440004'),
  ('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440003', 2, '550e8400-e29b-41d4-a716-446655440004'),
  ('950e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440005', 3, '550e8400-e29b-41d4-a716-446655440004'),
  ('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', 1, '550e8400-e29b-41d4-a716-446655440004'),
  ('950e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440004', 2, '550e8400-e29b-41d4-a716-446655440004')
ON CONFLICT (playlist_id, track_id) DO NOTHING;

-- Insert sample venues
INSERT INTO public.venues (id, profile_id, name, address, city, state, country, capacity, venue_type) VALUES
  ('a50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 'Madison Square Garden', '4 Pennsylvania Plaza', 'New York', 'NY', 'USA', 20000, ARRAY['Arena', 'Concert Hall'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample events
INSERT INTO public.events (id, venue_id, organizer_id, title, description, event_date, ticket_price_min, ticket_price_max, event_type, max_capacity) VALUES
  ('b50e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 'Summer Music Festival 2024', 'Three days of amazing music', '2024-07-15 19:00:00+00', 75.00, 250.00, 'festival', 20000)
ON CONFLICT (id) DO NOTHING;

-- Insert sample event artists
INSERT INTO public.event_artists (event_id, artist_id, performance_order, is_headliner) VALUES
  ('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 1, true),
  ('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', 2, true),
  ('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', 3, false)
ON CONFLICT (event_id, artist_id) DO NOTHING;
