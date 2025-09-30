/*
  # Row Level Security Policies

  ## Security Philosophy
  - Default deny: All tables start with RLS enabled and no access
  - Principle of least privilege: Users only access what they need
  - Content visibility: Published content is public, drafts are private
  - Owner-only operations: Users can only modify their own content
  - Collaborative features: Controlled sharing for playlists and events

  ## Policy Categories
  1. Profile and User Management - Public profiles, private settings
  2. Music Content - Artist ownership, published content visibility
  3. User Engagement - Public interactions, private preferences
  4. Venues and Events - Public discovery, organizer control
  5. Analytics - Owner-only insights, public metrics
*/

-- Profiles policies
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Artists policies
CREATE POLICY "artists_select_all" ON public.artists FOR SELECT USING (true);
CREATE POLICY "artists_insert_own" ON public.artists FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
);
CREATE POLICY "artists_update_own" ON public.artists FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
);
CREATE POLICY "artists_delete_own" ON public.artists FOR DELETE USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
);

-- User roles policies
CREATE POLICY "user_roles_select_all" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "user_roles_insert_admin_only" ON public.user_roles FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' AND is_active = true)
);
CREATE POLICY "user_roles_update_admin_only" ON public.user_roles FOR UPDATE USING (
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' AND is_active = true)
);
CREATE POLICY "user_roles_delete_admin_only" ON public.user_roles FOR DELETE USING (
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' AND is_active = true)
);

-- Genres policies (public reference data)
CREATE POLICY "genres_select_all" ON public.genres FOR SELECT USING (true);
CREATE POLICY "genres_insert_admin_only" ON public.genres FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' AND is_active = true)
);
CREATE POLICY "genres_update_admin_only" ON public.genres FOR UPDATE USING (
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' AND is_active = true)
);
CREATE POLICY "genres_delete_admin_only" ON public.genres FOR DELETE USING (
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin' AND is_active = true)
);

-- Albums policies
CREATE POLICY "albums_select_published_or_own" ON public.albums FOR SELECT USING (
  status = 'published' OR
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);
CREATE POLICY "albums_insert_own" ON public.albums FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);
CREATE POLICY "albums_update_own" ON public.albums FOR UPDATE USING (
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);
CREATE POLICY "albums_delete_own" ON public.albums FOR DELETE USING (
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);

-- Tracks policies
CREATE POLICY "tracks_select_published_or_own" ON public.tracks FOR SELECT USING (
  status = 'published' OR
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);
CREATE POLICY "tracks_insert_own" ON public.tracks FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);
CREATE POLICY "tracks_update_own" ON public.tracks FOR UPDATE USING (
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);
CREATE POLICY "tracks_delete_own" ON public.tracks FOR DELETE USING (
  auth.uid() IN (SELECT profile_id FROM public.artists WHERE id = artist_id)
);

-- Playlists policies
CREATE POLICY "playlists_select_public_or_own" ON public.playlists FOR SELECT USING (
  is_public = true OR auth.uid() = user_id
);
CREATE POLICY "playlists_insert_own" ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "playlists_update_own" ON public.playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "playlists_delete_own" ON public.playlists FOR DELETE USING (auth.uid() = user_id);

-- Playlist tracks policies
CREATE POLICY "playlist_tracks_select_public_or_own" ON public.playlist_tracks FOR SELECT USING (
  playlist_id IN (SELECT id FROM public.playlists WHERE is_public = true OR user_id = auth.uid())
);
CREATE POLICY "playlist_tracks_insert_own_or_collaborative" ON public.playlist_tracks FOR INSERT WITH CHECK (
  playlist_id IN (
    SELECT id FROM public.playlists 
    WHERE user_id = auth.uid() OR (is_collaborative = true AND is_public = true)
  )
);
CREATE POLICY "playlist_tracks_update_own" ON public.playlist_tracks FOR UPDATE USING (
  playlist_id IN (SELECT id FROM public.playlists WHERE user_id = auth.uid())
);
CREATE POLICY "playlist_tracks_delete_own_or_added_by" ON public.playlist_tracks FOR DELETE USING (
  playlist_id IN (SELECT id FROM public.playlists WHERE user_id = auth.uid()) OR
  added_by = auth.uid()
);

-- Likes policies
CREATE POLICY "likes_select_all" ON public.likes FOR SELECT USING (true);
CREATE POLICY "likes_insert_own" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "follows_select_all" ON public.follows FOR SELECT USING (true);
CREATE POLICY "follows_insert_own" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_delete_own" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Venues policies
CREATE POLICY "venues_select_all" ON public.venues FOR SELECT USING (true);
CREATE POLICY "venues_insert_own" ON public.venues FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
);
CREATE POLICY "venues_update_own" ON public.venues FOR UPDATE USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
);
CREATE POLICY "venues_delete_own" ON public.venues FOR DELETE USING (
  auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
);

-- Events policies
CREATE POLICY "events_select_all" ON public.events FOR SELECT USING (true);
CREATE POLICY "events_insert_own" ON public.events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "events_update_own" ON public.events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "events_delete_own" ON public.events FOR DELETE USING (auth.uid() = organizer_id);

-- Event artists policies
CREATE POLICY "event_artists_select_all" ON public.event_artists FOR SELECT USING (true);
CREATE POLICY "event_artists_insert_event_organizer" ON public.event_artists FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT organizer_id FROM public.events WHERE id = event_id)
);
CREATE POLICY "event_artists_update_event_organizer" ON public.event_artists FOR UPDATE USING (
  auth.uid() IN (SELECT organizer_id FROM public.events WHERE id = event_id)
);
CREATE POLICY "event_artists_delete_event_organizer" ON public.event_artists FOR DELETE USING (
  auth.uid() IN (SELECT organizer_id FROM public.events WHERE id = event_id)
);

-- Event attendees policies
CREATE POLICY "event_attendees_select_all" ON public.event_attendees FOR SELECT USING (true);
CREATE POLICY "event_attendees_insert_own" ON public.event_attendees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "event_attendees_update_own" ON public.event_attendees FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "event_attendees_delete_own" ON public.event_attendees FOR DELETE USING (auth.uid() = user_id);

-- Play history policies
CREATE POLICY "play_history_select_own" ON public.play_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "play_history_insert_own" ON public.play_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "comments_select_all" ON public.comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_own" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update_own" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "comments_delete_own" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_insert_own" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete_own" ON public.notifications FOR DELETE USING (auth.uid() = user_id);

-- Analytics policies (read-only for users, insert for system)
CREATE POLICY "analytics_select_own_entities" ON public.analytics FOR SELECT USING (
  CASE 
    WHEN entity_type = 'track' THEN 
      entity_id::uuid IN (SELECT id FROM public.tracks WHERE artist_id IN (SELECT id FROM public.artists WHERE profile_id = auth.uid()))
    WHEN entity_type = 'album' THEN 
      entity_id::uuid IN (SELECT id FROM public.albums WHERE artist_id IN (SELECT id FROM public.artists WHERE profile_id = auth.uid()))
    WHEN entity_type = 'artist' THEN 
      entity_id::uuid IN (SELECT id FROM public.artists WHERE profile_id = auth.uid())
    WHEN entity_type = 'playlist' THEN 
      entity_id::uuid IN (SELECT id FROM public.playlists WHERE user_id = auth.uid())
    WHEN entity_type = 'event' THEN 
      entity_id::uuid IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
    ELSE false
  END
);
CREATE POLICY "analytics_insert_all" ON public.analytics FOR INSERT WITH CHECK (true);
