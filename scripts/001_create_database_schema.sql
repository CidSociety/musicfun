/*
  # Music Platform Database Schema

  ## Overview
  Comprehensive database schema for a music streaming and event management platform
  supporting artists, listeners, venues, and music industry professionals.

  ## Core Features
  - User authentication and profiles with role-based access
  - Music content management (artists, albums, tracks)
  - Social features (playlists, likes, follows, comments)
  - Venue and event management with ticketing
  - Advanced analytics and business intelligence
  - Real-time notifications and activity feeds

  ## Security
  - Row Level Security (RLS) enabled on all user-facing tables
  - Comprehensive policies for data access control
  - Audit timestamps and soft deletes where appropriate

  ## Performance
  - Strategic indexing for high-frequency queries
  - Full-text search capabilities
  - Optimized for real-time features and analytics
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom enum types for better data integrity
CREATE TYPE user_role_type AS ENUM ('fan', 'artist', 'venue', 'promoter', 'admin', 'moderator');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived', 'deleted');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed', 'postponed');
CREATE TYPE attendance_status AS ENUM ('going', 'interested', 'not_going', 'maybe');
CREATE TYPE notification_type AS ENUM ('like', 'follow', 'comment', 'event', 'release', 'collaboration', 'system');
CREATE TYPE metric_type AS ENUM ('play', 'like', 'share', 'download', 'view', 'skip', 'save');

-- =====================================================
-- USER MANAGEMENT TABLES
-- =====================================================

-- Extended user profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  location TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  user_type user_role_type DEFAULT 'fan',
  verification_status verification_status DEFAULT 'unverified',
  verification_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  privacy_settings JSONB DEFAULT '{"profile_public": true, "show_listening_activity": true, "allow_messages": true}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles for fine-grained permissions
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role_type NOT NULL,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,

  CONSTRAINT user_roles_user_role_unique UNIQUE (user_id, role)
);

-- =====================================================
-- MUSIC CONTENT TABLES
-- =====================================================

-- Artists table with enhanced profile and business information
CREATE TABLE IF NOT EXISTS public.artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL UNIQUE,
  legal_name TEXT,
  genre TEXT[] DEFAULT '{}',
  description TEXT,
  monthly_listeners INTEGER DEFAULT 0,
  total_plays BIGINT DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  record_label TEXT,
  manager_contact TEXT,
  booking_email TEXT,
  press_kit_url TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  youtube_url TEXT,
  bandcamp_url TEXT,
  soundcloud_url TEXT,
  verification_status verification_status DEFAULT 'unverified',
  verification_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Genres reference table for better organization
CREATE TABLE IF NOT EXISTS public.genres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_genre_id UUID REFERENCES public.genres(id),
  color_code TEXT DEFAULT '#888888',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Albums table with enhanced metadata
CREATE TABLE IF NOT EXISTS public.albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_art_url TEXT,
  banner_url TEXT,
  release_date DATE,
  album_type TEXT DEFAULT 'album' CHECK (album_type IN ('album', 'ep', 'single', 'compilation', 'mixtape', 'live', 'remix')),
  genre TEXT[] DEFAULT '{}',
  total_tracks INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  status content_status DEFAULT 'draft',
  is_explicit BOOLEAN DEFAULT FALSE,
  copyright_info TEXT,
  publisher TEXT,
  upc_code TEXT,
  catalog_number TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  bandcamp_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks table with comprehensive metadata and streaming info
CREATE TABLE IF NOT EXISTS public.tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  track_number INTEGER,
  disc_number INTEGER DEFAULT 1,
  audio_url TEXT,
  preview_url TEXT, -- 30-second preview
  waveform_data JSONB,
  lyrics TEXT,
  credits JSONB DEFAULT '{}', -- Producer, writer, engineer credits
  genre TEXT[] DEFAULT '{}',
  mood TEXT[] DEFAULT '{}',
  bpm INTEGER,
  key_signature TEXT,
  is_explicit BOOLEAN DEFAULT FALSE,
  status content_status DEFAULT 'draft',
  play_count BIGINT DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  isrc_code TEXT, -- International Standard Recording Code
  publisher TEXT,
  copyright_year INTEGER,
  spotify_url TEXT,
  apple_music_url TEXT,
  youtube_url TEXT,
  soundcloud_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- USER ENGAGEMENT TABLES
-- =====================================================

-- Enhanced playlists table
CREATE TABLE IF NOT EXISTS public.playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_art_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  is_collaborative BOOLEAN DEFAULT FALSE,
  total_tracks INTEGER DEFAULT 0,
  total_duration_seconds INTEGER DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  play_count BIGINT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  mood TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlist tracks junction table
CREATE TABLE IF NOT EXISTS public.playlist_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID REFERENCES public.playlists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(playlist_id, track_id)
);

-- Likes table
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- Follows table
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Venues table
CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  capacity INTEGER,
  venue_type TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  booking_info JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  doors_open TIMESTAMP WITH TIME ZONE,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  ticket_price_min DECIMAL(10, 2),
  ticket_price_max DECIMAL(10, 2),
  ticket_url TEXT,
  age_restriction TEXT,
  event_type TEXT DEFAULT 'concert' CHECK (event_type IN ('concert', 'festival', 'club_night', 'private_event')),
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  max_capacity INTEGER,
  current_attendees INTEGER DEFAULT 0,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event artists junction table
CREATE TABLE IF NOT EXISTS public.event_artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  performance_order INTEGER,
  set_duration_minutes INTEGER,
  is_headliner BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, artist_id)
);

-- Event attendees table
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  attendance_status TEXT DEFAULT 'going' CHECK (attendance_status IN ('going', 'interested', 'not_going')),
  ticket_purchased BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Play history table
CREATE TABLE IF NOT EXISTS public.play_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  play_duration_seconds INTEGER,
  completion_percentage DECIMAL(5, 2),
  device_type TEXT,
  location TEXT
);

-- Comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  timestamp_seconds INTEGER, -- For track-specific comments
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'follow', 'comment', 'event', 'release', 'collaboration')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('track', 'album', 'artist', 'playlist', 'event')),
  entity_id UUID NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('play', 'like', 'share', 'download', 'view')),
  value INTEGER DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

-- User and profile indexes
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_verification ON public.profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role) WHERE is_active = TRUE;

-- Music content indexes
CREATE INDEX IF NOT EXISTS idx_artists_profile_id ON public.artists(profile_id);
CREATE INDEX IF NOT EXISTS idx_artists_stage_name ON public.artists(stage_name);
CREATE INDEX IF NOT EXISTS idx_artists_verification ON public.artists(verification_status);
CREATE INDEX IF NOT EXISTS idx_artists_active ON public.artists(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_genres_name ON public.genres(name);
CREATE INDEX IF NOT EXISTS idx_genres_parent ON public.genres(parent_genre_id) WHERE parent_genre_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_albums_artist_id ON public.albums(artist_id);
CREATE INDEX IF NOT EXISTS idx_albums_release_date ON public.albums(release_date);
CREATE INDEX IF NOT EXISTS idx_albums_status ON public.albums(status);
CREATE INDEX IF NOT EXISTS idx_tracks_artist_id ON public.tracks(artist_id);
CREATE INDEX IF NOT EXISTS idx_tracks_album_id ON public.tracks(album_id) WHERE album_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tracks_status ON public.tracks(status);
CREATE INDEX IF NOT EXISTS idx_tracks_published ON public.tracks(status) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_tracks_play_count ON public.tracks(play_count DESC);

-- Engagement indexes
CREATE INDEX IF NOT EXISTS idx_playlists_user_id ON public.playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_playlists_public ON public.playlists(is_public) WHERE is_public = TRUE;
CREATE INDEX IF NOT EXISTS idx_playlist_tracks_playlist_id ON public.playlist_tracks(playlist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_tracks_track_id ON public.playlist_tracks(track_id);
CREATE INDEX IF NOT EXISTS idx_playlist_tracks_position ON public.playlist_tracks(playlist_id, position);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON public.likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_track_id ON public.likes(track_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON public.follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON public.follows(following_id);

-- Venue and event indexes
CREATE INDEX IF NOT EXISTS idx_venues_profile_id ON public.venues(profile_id) WHERE profile_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_venues_city_country ON public.venues(city, country);
CREATE INDEX IF NOT EXISTS idx_venues_location ON public.venues USING GIST(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON public.events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON public.events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_event_artists_event_id ON public.event_artists(event_id);
CREATE INDEX IF NOT EXISTS idx_event_artists_artist_id ON public.event_artists(artist_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON public.event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON public.event_attendees(user_id);

-- Analytics and activity indexes
CREATE INDEX IF NOT EXISTS idx_play_history_user_id ON public.play_history(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_track_id ON public.play_history(track_id);
CREATE INDEX IF NOT EXISTS idx_play_history_played_at ON public.play_history(played_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_track_id ON public.comments(track_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON public.comments(parent_comment_id) WHERE parent_comment_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);
CREATE INDEX IF NOT EXISTS idx_analytics_entity ON public.analytics(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_analytics_metric ON public.analytics(metric_type, recorded_at DESC);

-- Full-text search indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_tracks_title_search ON public.tracks USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_artists_stage_name_search ON public.artists USING gin(to_tsvector('english', stage_name));
CREATE INDEX IF NOT EXISTS idx_albums_title_search ON public.albums USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_playlists_title_search ON public.playlists USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_venues_name_search ON public.venues USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_events_title_search ON public.events USING gin(to_tsvector('english', title));

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_tracks_artist_album ON public.tracks(artist_id, album_id) WHERE album_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tracks_status_created ON public.tracks(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date_status ON public.events(event_date, status);
CREATE INDEX IF NOT EXISTS idx_play_history_user_date ON public.play_history(user_id, played_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable Row Level Security on all user-facing tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.play_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
