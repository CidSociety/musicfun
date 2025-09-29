import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const city = searchParams.get("city")
    const eventType = searchParams.get("event_type")
    const upcoming = searchParams.get("upcoming") === "true"

    let query = supabase
      .from("events")
      .select(`
        *,
        venues (
          name,
          address,
          city,
          capacity
        ),
        profiles (
          display_name,
          avatar_url
        ),
        event_artists (
          performance_order,
          is_headliner,
          artists (
            stage_name,
            profiles (
              display_name,
              avatar_url
            )
          )
        )
      `)
      .order("event_date", { ascending: true })
      .range(offset, offset + limit - 1)

    if (city) {
      query = query.eq("venues.city", city)
    }

    if (eventType) {
      query = query.eq("event_type", eventType)
    }

    if (upcoming) {
      query = query.gte("event_date", new Date().toISOString())
    }

    const { data: events, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(events)
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
    const {
      venue_id,
      title,
      description,
      event_date,
      doors_open,
      start_time,
      end_time,
      ticket_price_min,
      ticket_price_max,
      ticket_url,
      age_restriction,
      event_type,
      max_capacity,
    } = body

    const { data: event, error } = await supabase
      .from("events")
      .insert({
        venue_id,
        organizer_id: user.id,
        title,
        description,
        event_date,
        doors_open,
        start_time,
        end_time,
        ticket_price_min,
        ticket_price_max,
        ticket_url,
        age_restriction,
        event_type,
        max_capacity,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
