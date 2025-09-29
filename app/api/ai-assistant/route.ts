import { convertToModelMessages, streamText, tool, type UIMessage } from "ai"
import { z } from "zod"

export const maxDuration = 30

const venueRecommendationTool = tool({
  description: "Find and recommend music venues based on user preferences, location, and music style",
  inputSchema: z.object({
    location: z.string().describe("The city or area to search for venues"),
    musicStyle: z.string().optional().describe("The genre or style of music"),
    capacity: z.string().optional().describe("Preferred venue capacity range"),
    budget: z.string().optional().describe("Budget range for venue booking"),
  }),
  async *execute({ location, musicStyle, capacity, budget }) {
    yield { state: "loading" as const }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock venue data - in real app, this would call venue APIs
    const venues = [
      {
        name: "The Blue Note",
        location: "New York, NY",
        capacity: "200-300",
        priceRange: "$800-1200",
        match: 95,
        description:
          "Iconic jazz venue with excellent acoustics and intimate atmosphere. Perfect for jazz, blues, and soul performances.",
        genres: ["Jazz", "Blues", "Soul"],
      },
      {
        name: "Mercury Lounge",
        location: "New York, NY",
        capacity: "250",
        priceRange: "$600-900",
        match: 88,
        description: "Premier indie rock venue on the Lower East Side with great sound system and loyal following.",
        genres: ["Rock", "Indie", "Alternative"],
      },
      {
        name: "Brooklyn Bowl",
        location: "Brooklyn, NY",
        capacity: "600",
        priceRange: "$1200-2000",
        match: 82,
        description: "Unique venue combining live music with bowling. Great for larger audiences and diverse genres.",
        genres: ["Rock", "Electronic", "Hip Hop"],
      },
    ]

    yield {
      state: "ready" as const,
      venues: venues.slice(0, 3),
      searchCriteria: { location, musicStyle, capacity, budget },
    }
  },
})

const careerAdviceTool = tool({
  description: "Provide personalized career advice for musicians and bands",
  inputSchema: z.object({
    careerStage: z.string().describe("Current career stage (beginner, intermediate, professional)"),
    goals: z.string().describe("Specific career goals or challenges"),
    musicStyle: z.string().optional().describe("Genre or style of music"),
  }),
  async execute({ careerStage, goals, musicStyle }) {
    // Mock career advice - in real app, this would use AI to generate personalized advice
    const tips = [
      "Build a strong online presence across social media platforms, especially Instagram and TikTok",
      "Network with other musicians, venue owners, and industry professionals in your area",
      "Create high-quality recordings and demos to showcase your best work",
      "Perform regularly at local venues to build your fanbase and gain experience",
      "Consider collaborating with other artists to expand your reach",
      "Keep detailed records of your performances, earnings, and contacts for tax and business purposes",
    ]

    return {
      tips: tips.slice(0, 4),
      careerStage,
      goals,
    }
  },
})

const industryInsightsTool = tool({
  description: "Provide current music industry trends, insights, and market analysis",
  inputSchema: z.object({
    topic: z.string().describe("Specific industry topic or trend to discuss"),
    genre: z.string().optional().describe("Music genre for targeted insights"),
  }),
  async execute({ topic, genre }) {
    return {
      insights: [
        "Streaming platforms continue to dominate music consumption, with playlist placement being crucial for discovery",
        "Live performances and touring remain the primary revenue source for most artists",
        "Social media marketing, especially short-form video content, is essential for building fanbase",
        "Direct-to-fan platforms are growing, allowing artists to monetize their most dedicated supporters",
      ],
      topic,
      genre,
    }
  },
})

const tools = {
  venueRecommendation: venueRecommendationTool,
  careerAdvice: careerAdviceTool,
  industryInsights: industryInsightsTool,
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: convertToModelMessages(messages),
    tools,
    system: `You are an AI music assistant specializing in helping musicians and bands with their careers. You have expertise in:

1. Venue discovery and booking
2. Music career development
3. Industry trends and insights
4. Band management and collaboration
5. Marketing and promotion strategies
6. Performance and touring advice

Always be encouraging, practical, and specific in your advice. When users ask about venues, use the venueRecommendation tool. For career questions, use the careerAdvice tool. For industry information, use the industryInsights tool.

Keep responses conversational but informative. Provide actionable advice that musicians can implement immediately.`,
    maxSteps: 3,
  })

  return result.toUIMessageStreamResponse()
}
