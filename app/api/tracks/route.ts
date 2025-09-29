import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const genre = searchParams.get("genre")
    const search = searchParams.get("search")

    let query = supabase
      .from("tracks")
      .select(`
        *,
        artists (
          id,
          stage_name,
          profiles (
            display_name,
            avatar_url
          )
        ),
        albums (
          id,
          title,
          cover_art_url
        )
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (genre) {
      query = query.contains("genre", [genre])
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,artists.stage_name.ilike.%${search}%`)
    }

    const { data: tracks, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(tracks)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is an artist
    const { data: artist } = await supabase.from("artists").select("id").eq("profile_id", user.id).single()

    if (!artist) {
      return NextResponse.json({ error: "Only artists can create tracks" }, { status: 403 })
    }

    const body = await request.json()
    const { title, duration_seconds, album_id, genre, mood, bpm, key_signature, lyrics, is_explicit } = body

    const { data: track, error } = await supabase
      .from("tracks")
      .insert({
        artist_id: artist.id,
        album_id,
        title,
        duration_seconds,
        genre,
        mood,
        bpm,
        key_signature,
        lyrics,
        is_explicit,
        is_published: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
