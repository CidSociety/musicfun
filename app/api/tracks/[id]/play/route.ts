import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const { id } = params
    const body = await request.json()
    const { play_duration_seconds, completion_percentage, device_type, location } = body

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Record play history if user is logged in
    if (user) {
      await supabase.from("play_history").insert({
        user_id: user.id,
        track_id: id,
        play_duration_seconds,
        completion_percentage,
        device_type,
        location,
      })
    }

    // Increment play count
    await supabase.rpc("increment_play_count", { track_uuid: id })

    // Record analytics
    await supabase.rpc("record_analytics", {
      entity_type_param: "track",
      entity_id_param: id,
      metric_type_param: "play",
    })

    return NextResponse.json({ message: "Play recorded successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
