import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const entityType = searchParams.get("entity_type")
    const entityId = searchParams.get("entity_id")
    const metricType = searchParams.get("metric_type")
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")

    let query = supabase.from("analytics").select("*").order("recorded_at", { ascending: false })

    if (entityType) {
      query = query.eq("entity_type", entityType)
    }

    if (entityId) {
      query = query.eq("entity_id", entityId)
    }

    if (metricType) {
      query = query.eq("metric_type", metricType)
    }

    if (startDate) {
      query = query.gte("recorded_at", startDate)
    }

    if (endDate) {
      query = query.lte("recorded_at", endDate)
    }

    const { data: analytics, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { entity_type, entity_id, metric_type, value, metadata } = body

    await supabase.rpc("record_analytics", {
      entity_type_param: entity_type,
      entity_id_param: entity_id,
      metric_type_param: metric_type,
      value_param: value || 1,
      metadata_param: metadata || {},
    })

    return NextResponse.json({ message: "Analytics recorded successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
