import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const userId = searchParams.get("user_id")

    let query = supabase
      .from("playlists")
      .select(`
        *,
        profiles (
          display_name,
          username,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (userId) {
      query = query.eq("user_id", userId)
    } else {
      query = query.eq("is_public", true)
    }

    const { data: playlists, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(playlists)
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

    const body = await request.json()
    const { title, description, is_public, is_collaborative } = body

    const { data: playlist, error } = await supabase
      .from("playlists")
      .insert({
        user_id: user.id,
        title,
        description,
        is_public,
        is_collaborative,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(playlist)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
