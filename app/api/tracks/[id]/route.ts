import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data: track, error } = await supabase
      .from("tracks")
      .select(`
        *,
        artists (
          id,
          stage_name,
          profiles (
            display_name,
            avatar_url,
            is_verified
          )
        ),
        albums (
          id,
          title,
          cover_art_url
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Record analytics
    await supabase.rpc("record_analytics", {
      entity_type_param: "track",
      entity_id_param: id,
      metric_type_param: "view",
    })

    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    // Check if user owns this track
    const { data: track } = await supabase
      .from("tracks")
      .select(`
        *,
        artists (
          profile_id
        )
      `)
      .eq("id", id)
      .single()

    if (!track || track.artists.profile_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { data: updatedTrack, error } = await supabase
      .from("tracks")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(updatedTrack)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    // Check if user owns this track
    const { data: track } = await supabase
      .from("tracks")
      .select(`
        *,
        artists (
          profile_id
        )
      `)
      .eq("id", id)
      .single()

    if (!track || track.artists.profile_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { error } = await supabase.from("tracks").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Track deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
