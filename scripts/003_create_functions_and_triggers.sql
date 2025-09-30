/*
  # Database Functions and Triggers

  ## Core Features
  - Automatic user profile creation on signup
  - Real-time count updates (plays, likes, followers)
  - Analytics recording and aggregation
  - Notification system integration
  - Data integrity maintenance through triggers

  ## Trigger Categories
  1. User Management - Profile creation, role assignments
  2. Content Counters - Play counts, likes, follower counts
  3. Analytics - Activity tracking and metrics
  4. Notifications - Real-time user alerts
  5. Data Integrity - Referential integrity, cascade updates
*/

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Function to handle new user signup with enhanced profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update track play count
CREATE OR REPLACE FUNCTION public.increment_play_count(track_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.tracks 
  SET play_count = play_count + 1 
  WHERE id = track_uuid;
END;
$$;

-- Function to update like count
CREATE OR REPLACE FUNCTION public.update_like_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.tracks 
    SET like_count = like_count + 1 
    WHERE id = NEW.track_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.tracks 
    SET like_count = like_count - 1 
    WHERE id = OLD.track_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger for like count updates
DROP TRIGGER IF EXISTS update_track_like_count ON public.likes;
CREATE TRIGGER update_track_like_count
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_like_count();

-- Function to update playlist track counts
CREATE OR REPLACE FUNCTION public.update_playlist_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.playlists 
    SET 
      total_tracks = total_tracks + 1,
      total_duration_seconds = total_duration_seconds + (
        SELECT duration_seconds FROM public.tracks WHERE id = NEW.track_id
      )
    WHERE id = NEW.playlist_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.playlists 
    SET 
      total_tracks = total_tracks - 1,
      total_duration_seconds = total_duration_seconds - (
        SELECT duration_seconds FROM public.tracks WHERE id = OLD.track_id
      )
    WHERE id = OLD.playlist_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger for playlist count updates
DROP TRIGGER IF EXISTS update_playlist_track_counts ON public.playlist_tracks;
CREATE TRIGGER update_playlist_track_counts
  AFTER INSERT OR DELETE ON public.playlist_tracks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_playlist_counts();

-- Function to update album track counts
CREATE OR REPLACE FUNCTION public.update_album_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.albums 
    SET 
      total_tracks = (SELECT COUNT(*) FROM public.tracks WHERE album_id = NEW.album_id),
      duration_seconds = (SELECT COALESCE(SUM(duration_seconds), 0) FROM public.tracks WHERE album_id = NEW.album_id)
    WHERE id = NEW.album_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.albums 
    SET 
      total_tracks = (SELECT COUNT(*) FROM public.tracks WHERE album_id = OLD.album_id),
      duration_seconds = (SELECT COALESCE(SUM(duration_seconds), 0) FROM public.tracks WHERE album_id = OLD.album_id)
    WHERE id = OLD.album_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger for album count updates
DROP TRIGGER IF EXISTS update_album_track_counts ON public.tracks;
CREATE TRIGGER update_album_track_counts
  AFTER INSERT OR UPDATE OR DELETE ON public.tracks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_album_counts();

-- Function to create notification
CREATE OR REPLACE FUNCTION public.create_notification(
  recipient_id UUID,
  notification_type TEXT,
  notification_title TEXT,
  notification_message TEXT,
  notification_data JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  VALUES (recipient_id, notification_type, notification_title, notification_message, notification_data)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Function to record analytics
CREATE OR REPLACE FUNCTION public.record_analytics(
  entity_type_param TEXT,
  entity_id_param UUID,
  metric_type_param TEXT,
  value_param INTEGER DEFAULT 1,
  metadata_param JSONB DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.analytics (entity_type, entity_id, metric_type, value, metadata)
  VALUES (entity_type_param, entity_id_param, metric_type_param, value_param, metadata_param);
END;
$$;

-- Function to get user's listening stats
CREATE OR REPLACE FUNCTION public.get_user_listening_stats(user_uuid UUID)
RETURNS TABLE (
  total_plays BIGINT,
  total_listening_time BIGINT,
  favorite_genre TEXT,
  top_artist_id UUID,
  top_artist_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH user_plays AS (
    SELECT 
      ph.track_id,
      ph.play_duration_seconds,
      t.genre,
      t.artist_id,
      a.stage_name
    FROM public.play_history ph
    JOIN public.tracks t ON ph.track_id = t.id
    JOIN public.artists a ON t.artist_id = a.id
    WHERE ph.user_id = user_uuid
  ),
  genre_stats AS (
    SELECT 
      unnest(genre) as genre_name,
      COUNT(*) as genre_count
    FROM user_plays
    GROUP BY unnest(genre)
    ORDER BY genre_count DESC
    LIMIT 1
  ),
  artist_stats AS (
    SELECT 
      artist_id,
      stage_name,
      COUNT(*) as play_count
    FROM user_plays
    GROUP BY artist_id, stage_name
    ORDER BY play_count DESC
    LIMIT 1
  )
  SELECT 
    (SELECT COUNT(*)::BIGINT FROM user_plays) as total_plays,
    (SELECT COALESCE(SUM(play_duration_seconds), 0)::BIGINT FROM user_plays) as total_listening_time,
    (SELECT genre_name FROM genre_stats) as favorite_genre,
    (SELECT artist_id FROM artist_stats) as top_artist_id,
    (SELECT stage_name FROM artist_stats) as top_artist_name;
END;
$$;

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

-- Add updated_at triggers to all relevant tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_artists_updated_at ON public.artists;
CREATE TRIGGER update_artists_updated_at
  BEFORE UPDATE ON public.artists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_albums_updated_at ON public.albums;
CREATE TRIGGER update_albums_updated_at
  BEFORE UPDATE ON public.albums
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_tracks_updated_at ON public.tracks;
CREATE TRIGGER update_tracks_updated_at
  BEFORE UPDATE ON public.tracks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_playlists_updated_at ON public.playlists;
CREATE TRIGGER update_playlists_updated_at
  BEFORE UPDATE ON public.playlists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_venues_updated_at ON public.venues;
CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_comments_updated_at ON public.comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
