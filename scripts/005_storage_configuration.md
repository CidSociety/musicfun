# Supabase Storage Configuration

## Required Storage Buckets

### 1. Audio Files Bucket
- **Name**: `audio-files`
- **Public Access**: False (requires authentication)
- **File Types**: .mp3, .wav, .flac, .aac, .m4a
- **Max File Size**: 100MB per file
- **Purpose**: Store original audio tracks and previews

**RLS Policy**:
```sql
-- Artists can upload to their own folder
CREATE POLICY "Artists can upload audio" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'audio-files' AND
  auth.uid()::text = (storage.foldername(name))[1] AND
  auth.uid() IN (SELECT profile_id FROM public.artists)
);

-- Artists can update their own files
CREATE POLICY "Artists can update own audio" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'audio-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Published tracks are publicly readable
CREATE POLICY "Published audio is readable" ON storage.objects
FOR SELECT USING (
  bucket_id = 'audio-files' AND
  (storage.foldername(name))[2] IN (
    SELECT id::text FROM public.tracks WHERE status = 'published'
  )
);
```

### 2. Images Bucket
- **Name**: `images`
- **Public Access**: True (with RLS)
- **File Types**: .jpg, .jpeg, .png, .webp, .gif
- **Max File Size**: 10MB per file
- **Purpose**: Profile pictures, album covers, venue photos, event banners

**RLS Policy**:
```sql
-- Users can upload to their own folder
CREATE POLICY "Users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own images
CREATE POLICY "Users can update own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- All images are publicly readable
CREATE POLICY "Images are publicly readable" ON storage.objects
FOR SELECT USING (bucket_id = 'images');
```

### 3. Documents Bucket
- **Name**: `documents`
- **Public Access**: False
- **File Types**: .pdf, .doc, .docx, .txt
- **Max File Size**: 25MB per file
- **Purpose**: Press kits, contracts, rider documents

**RLS Policy**:
```sql
-- Verified artists and venues can upload documents
CREATE POLICY "Verified users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1] AND
  auth.uid() IN (
    SELECT id FROM public.profiles
    WHERE verification_status = 'verified'
    AND user_type IN ('artist', 'venue', 'promoter')
  )
);

-- Users can read their own documents
CREATE POLICY "Users can read own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### 4. Waveforms Bucket
- **Name**: `waveforms`
- **Public Access**: True (with RLS)
- **File Types**: .json, .png, .svg
- **Max File Size**: 2MB per file
- **Purpose**: Audio waveform data and visualizations

**RLS Policy**:
```sql
-- System can write waveform data (handled by Edge Functions)
CREATE POLICY "System can manage waveforms" ON storage.objects
FOR ALL USING (bucket_id = 'waveforms');

-- Waveforms for published tracks are publicly readable
CREATE POLICY "Published waveforms are readable" ON storage.objects
FOR SELECT USING (
  bucket_id = 'waveforms' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.tracks WHERE status = 'published'
  )
);
```

## Folder Structure

### Audio Files (`/audio-files/`)
```
/audio-files/
  ├── {user_id}/
  │   ├── {track_id}/
  │   │   ├── original.mp3
  │   │   ├── preview.mp3 (30-second preview)
  │   │   └── high_quality.flac
```

### Images (`/images/`)
```
/images/
  ├── profiles/
  │   ├── {user_id}/
  │   │   ├── avatar.jpg
  │   │   └── banner.jpg
  ├── albums/
  │   ├── {album_id}/
  │   │   ├── cover.jpg
  │   │   └── banner.jpg
  ├── venues/
  │   ├── {venue_id}/
  │   │   ├── main.jpg
  │   │   ├── gallery_1.jpg
  │   │   └── gallery_2.jpg
  └── events/
      ├── {event_id}/
      │   ├── poster.jpg
      │   └── banner.jpg
```

### Documents (`/documents/`)
```
/documents/
  ├── {user_id}/
  │   ├── press_kit.pdf
  │   ├── technical_rider.pdf
  │   └── contracts/
  │       └── {event_id}_contract.pdf
```

### Waveforms (`/waveforms/`)
```
/waveforms/
  ├── {track_id}/
  │   ├── peaks.json
  │   ├── waveform.png
  │   └── waveform.svg
```

## Implementation Notes

1. **File Upload Flow**:
   - Client uploads files through Supabase Storage API
   - File URLs are stored in database tables (audio_url, cover_art_url, etc.)
   - Edge Functions can process files after upload (generate waveforms, thumbnails)

2. **Security Considerations**:
   - All buckets use RLS policies for access control
   - File type validation on client and server side
   - Virus scanning recommended for production
   - Rate limiting on uploads to prevent abuse

3. **CDN Integration**:
   - Supabase Storage automatically provides CDN URLs
   - Consider custom domain for branding
   - Enable image transformations for responsive images

4. **Backup Strategy**:
   - Regular automated backups of all buckets
   - Version control for critical files
   - Cross-region replication for high availability

## Database Integration

The following columns in database tables should store Supabase Storage URLs:

- `profiles.avatar_url`
- `profiles.banner_url`
- `artists.press_kit_url`
- `albums.cover_art_url`
- `albums.banner_url`
- `tracks.audio_url`
- `tracks.preview_url`
- `tracks.waveform_url`
- `venues.images[]`
- `events.cover_image_url`
- `playlists.cover_art_url`