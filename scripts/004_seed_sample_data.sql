/*
  # Sample Data for Music Platform

  ## Overview
  This file seeds the database with realistic sample data for testing and development.
  All data represents popular artists, tracks, and venues for demonstration purposes.

  ## Sample Data Categories
  - Popular artists and their profiles
  - Albums and tracks from major releases
  - User-created playlists and interactions
  - Venues and upcoming events
  - Music genres and industry data
  - Analytics and engagement metrics

  Note: All UUIDs are deterministic for consistent testing
*/

-- Insert sample genres first
INSERT INTO public.genres (id, name, description, color_code) VALUES
  ('10000000-1111-4111-a111-111111111001', 'Pop', 'Popular contemporary music', '#FF6B6B'),
  ('10000000-1111-4111-a111-111111111002', 'R&B', 'Rhythm and Blues', '#4ECDC4'),
  ('10000000-1111-4111-a111-111111111003', 'Electronic', 'Electronic dance music', '#45B7D1'),
  ('10000000-1111-4111-a111-111111111004', 'Hip-Hop', 'Hip hop and rap music', '#96CEB4'),
  ('10000000-1111-4111-a111-111111111005', 'Rock', 'Rock and alternative', '#FFEAA7'),
  ('10000000-1111-4111-a111-111111111006', 'Country', 'Country and folk music', '#DDA0DD'),
  ('10000000-1111-4111-a111-111111111007', 'Jazz', 'Jazz and blues', '#F4A460'),
  ('10000000-1111-4111-a111-111111111008', 'Classical', 'Classical and orchestral', '#E6E6FA')
ON CONFLICT (id) DO NOTHING;

-- Insert sample profiles with enhanced data
INSERT INTO public.profiles (id, username, display_name, full_name, bio, user_type, verification_status, is_active) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'theweeknd', 'The Weeknd', 'Abel Makkonen Tesfaye', 'Canadian R&B superstar and producer', 'artist', 'verified', true),
  ('550e8400-e29b-41d4-a716-446655440002', 'taylorswift', 'Taylor Swift', 'Taylor Alison Swift', 'Singer-songwriter and global icon', 'artist', 'verified', true),
  ('550e8400-e29b-41d4-a716-446655440003', 'dualipa', 'Dua Lipa', 'Dua Lipa', 'Pop sensation from London', 'artist', 'verified', true),
  ('550e8400-e29b-41d4-a716-446655440004', 'musicfan1', 'Alex Johnson', 'Alex Johnson', 'Music lover and playlist curator from Nashville', 'fan', 'unverified', true),
  ('550e8400-e29b-41d4-a716-446655440005', 'venue_owner', 'Madison Square Garden', 'MSG Entertainment', 'Iconic NYC venue and entertainment company', 'venue', 'verified', true),
  ('550e8400-e29b-41d4-a716-446655440006', 'drakefan', 'Sarah Chen', 'Sarah Chen', 'Hip-hop enthusiast and concert photographer', 'fan', 'unverified', true),
  ('550e8400-e29b-41d4-a716-446655440007', 'indieartist', 'Jamie Rivers', 'Jamie Rivers', 'Indie folk singer-songwriter from Portland', 'artist', 'unverified', true),
  ('550e8400-e29b-41d4-a716-446655440008', 'promoter1', 'Live Nation Events', 'Live Nation Entertainment', 'Leading live entertainment company', 'promoter', 'verified', true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample artists
INSERT INTO public.artists (id, profile_id, stage_name, genre, description, monthly_listeners, record_label) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'The Weeknd', ARRAY['R&B', 'Pop', 'Alternative'], 'Canadian singer, songwriter, and record producer', 85000000, 'XO/Republic Records'),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Taylor Swift', ARRAY['Pop', 'Country', 'Folk'], 'American singer-songwriter', 95000000, 'Republic Records'),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Dua Lipa', ARRAY['Pop', 'Dance', 'Electronic'], 'English singer and songwriter', 75000000, 'Warner Records')
ON CONFLICT (id) DO NOTHING;

-- Insert sample albums with updated schema
INSERT INTO public.albums (id, artist_id, title, description, release_date, album_type, status, genre, total_tracks, duration_seconds) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'After Hours', 'Fourth studio album featuring dark R&B themes', '2020-03-20', 'album', 'published', ARRAY['R&B', 'Pop'], 14, 3360),
  ('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 'Midnights', 'Introspective pop album about late-night thoughts', '2022-10-21', 'album', 'published', ARRAY['Pop', 'Alternative'], 13, 2580),
  ('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', 'Future Nostalgia', 'Disco-pop revival with modern production', '2020-03-27', 'album', 'published', ARRAY['Pop', 'Dance'], 11, 2233),
  ('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440004', 'Heartbreak Sessions', 'Intimate acoustic EP', '2024-01-15', 'ep', 'published', ARRAY['Folk', 'Acoustic'], 5, 1200)
ON CONFLICT (id) DO NOTHING;

-- Insert sample tracks with updated schema
INSERT INTO public.tracks (id, artist_id, album_id, title, duration_seconds, track_number, genre, mood, bpm, status, play_count, like_count) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Blinding Lights', 200, 1, ARRAY['Synthpop', 'R&B'], ARRAY['Energetic', 'Upbeat'], 171, 'published', 2500000000, 18000000),
  ('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Save Your Tears', 215, 2, ARRAY['R&B', 'Pop'], ARRAY['Melancholic', 'Emotional'], 118, 'published', 1800000000, 12000000),
  ('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 'Anti-Hero', 201, 1, ARRAY['Pop', 'Alternative'], ARRAY['Introspective', 'Dark'], 97, 'published', 3200000000, 25000000),
  ('850e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 'Lavender Haze', 202, 2, ARRAY['Pop', 'Synth-pop'], ARRAY['Dreamy', 'Romantic'], 96, 'published', 2100000000, 16000000),
  ('850e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'Levitating', 203, 1, ARRAY['Pop', 'Dance'], ARRAY['Upbeat', 'Fun'], 103, 'published', 2800000000, 20000000),
  ('850e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'Don''t Start Now', 183, 2, ARRAY['Pop', 'Disco'], ARRAY['Confident', 'Empowering'], 124, 'published', 2600000000, 19000000),
  ('850e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440004', 'Broken Dreams', 240, 1, ARRAY['Folk', 'Acoustic'], ARRAY['Melancholic', 'Introspective'], 72, 'published', 580000, 45000),
  ('850e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440004', 'Coffee Shop Mornings', 195, 2, ARRAY['Folk', 'Indie'], ARRAY['Peaceful', 'Nostalgic'], 85, 'published', 320000, 28000)
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

-- Insert sample likes
INSERT INTO public.likes (user_id, track_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440003'),
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440005'),
  ('550e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (user_id, track_id) DO NOTHING;

-- Insert sample follows
INSERT INTO public.follows (follower_id, following_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003'),
  ('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007')
ON CONFLICT (follower_id, following_id) DO NOTHING;

-- Insert sample play history
INSERT INTO public.play_history (user_id, track_id, play_duration_seconds, completion_percentage, device_type) VALUES
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440001', 200, 100.0, 'mobile'),
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440003', 180, 89.6, 'web'),
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440005', 203, 100.0, 'mobile'),
  ('550e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440001', 150, 75.0, 'web'),
  ('550e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440002', 215, 100.0, 'mobile')
ON CONFLICT DO NOTHING;

-- Insert sample comments
INSERT INTO public.comments (user_id, track_id, content, timestamp_seconds) VALUES
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440001', 'This song is absolutely incredible! The production is flawless.', 45),
  ('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440003', 'The lyrics hit so deep. Taylor really understood the feeling.', 120),
  ('550e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440005', 'Perfect for dancing! This beat is infectious.', 30),
  ('550e8400-e29b-41d4-a716-446655440006', '850e8400-e29b-41d4-a716-446655440007', 'Beautiful acoustic work. Very emotional performance.', NULL)
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO public.notifications (user_id, type, title, message, data) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'like', 'New Like', 'Alex Johnson liked your track "Blinding Lights"', '{"track_id": "850e8400-e29b-41d4-a716-446655440001", "user_id": "550e8400-e29b-41d4-a716-446655440004"}'),
  ('550e8400-e29b-41d4-a716-446655440001', 'follow', 'New Follower', 'Sarah Chen started following you', '{"user_id": "550e8400-e29b-41d4-a716-446655440006"}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'comment', 'New Comment', 'Alex Johnson commented on "Anti-Hero"', '{"track_id": "850e8400-e29b-41d4-a716-446655440003", "user_id": "550e8400-e29b-41d4-a716-446655440004", "comment": "The lyrics hit so deep. Taylor really understood the feeling."}')
ON CONFLICT DO NOTHING;

-- Insert sample analytics records
INSERT INTO public.analytics (entity_type, entity_id, metric_type, value, metadata) VALUES
  ('track', '850e8400-e29b-41d4-a716-446655440001', 'play', 1, '{"source": "mobile", "country": "US", "user_id": "550e8400-e29b-41d4-a716-446655440004"}'),
  ('track', '850e8400-e29b-41d4-a716-446655440001', 'like', 1, '{"user_id": "550e8400-e29b-41d4-a716-446655440004"}'),
  ('track', '850e8400-e29b-41d4-a716-446655440003', 'play', 1, '{"source": "web", "country": "US", "user_id": "550e8400-e29b-41d4-a716-446655440004"}'),
  ('artist', '650e8400-e29b-41d4-a716-446655440001', 'follow', 1, '{"follower_id": "550e8400-e29b-41d4-a716-446655440004"}'),
  ('playlist', '950e8400-e29b-41d4-a716-446655440001', 'view', 1, '{"user_id": "550e8400-e29b-41d4-a716-446655440006"}')
