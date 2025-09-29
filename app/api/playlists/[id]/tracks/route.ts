import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data: playlistTracks, error } = await supabase
      .from("playlist_tracks")
      .select(`
        *,
        tracks (
          *,
          artists (
            stage_name,
            profiles (
              display_name,
              avatar_url
            )
          ),
          albums (
            title,
            cover_art_url
          )
        )
      `)
      .eq("playlist_id", id)
      .order("position", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(playlistTracks)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { track_id } = body

    // Check if user can add to this playlist
    const { data: playlist } = await supabase
      .from("playlists")
      .select("user_id, is_collaborative, is_public")
      .eq("id", id)
      .single()

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 })
    }

    const canAdd = playlist.user_id === user.id || (playlist.is_collaborative && playlist.is_public)
    if (!canAdd) {
      return NextResponse.json({ error: "Cannot add to this playlist" }, { status: 403 })
    }

    // Get next position
    const { data: lastTrack } = await supabase
      .from("playlist_tracks")
      .select("position")
      .eq("playlist_id", id)
      .order("position", { ascending: false })
      .limit(1)
      .single()

    const nextPosition = (lastTrack?.position || 0) + 1

    const { data: playlistTrack, error } = await supabase
      .from("playlist_tracks")
      .insert({
        playlist_id: id,
        track_id,
        position: nextPosition,
        added_by: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(playlistTrack)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
