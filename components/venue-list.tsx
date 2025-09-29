import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, DollarSign, Star, Phone, Globe, Calendar } from "lucide-react"

const venues = [
  {
    id: 1,
    name: "The Blue Note",
    type: "Jazz Club",
    location: "New York, NY",
    distance: "2.3 miles",
    capacity: "200-300",
    priceRange: "$800-1200",
    rating: 4.8,
    reviews: 124,
    genres: ["Jazz", "Blues", "Soul"],
    image: "/jazz-club-interior.jpg",
    phone: "(212) 475-8592",
    website: "thebluenotenyc.com",
    nextAvailable: "Dec 15, 2024",
    description: "Iconic jazz venue in Greenwich Village with excellent acoustics and intimate atmosphere.",
  },
  {
    id: 2,
    name: "Mercury Lounge",
    type: "Rock Club",
    location: "New York, NY",
    distance: "1.8 miles",
    capacity: "250",
    priceRange: "$600-900",
    rating: 4.6,
    reviews: 89,
    genres: ["Rock", "Indie", "Alternative"],
    image: "/rock-club-stage.jpg",
    phone: "(212) 260-4700",
    website: "mercuryloungenyc.com",
    nextAvailable: "Dec 20, 2024",
    description: "Premier indie rock venue on the Lower East Side with great sound system.",
  },
  {
    id: 3,
    name: "Brooklyn Bowl",
    type: "Concert Hall",
    location: "Brooklyn, NY",
    distance: "4.1 miles",
    capacity: "600",
    priceRange: "$1200-2000",
    rating: 4.7,
    reviews: 156,
    genres: ["Rock", "Electronic", "Hip Hop"],
    image: "/concert-hall-bowling.jpg",
    phone: "(718) 963-3369",
    website: "brooklynbowl.com",
    nextAvailable: "Jan 8, 2025",
    description: "Unique venue combining live music with bowling, great for larger audiences.",
  },
  {
    id: 4,
    name: "Rockwood Music Hall",
    type: "Music Venue",
    location: "New York, NY",
    distance: "1.5 miles",
    capacity: "80-200",
    priceRange: "$400-700",
    rating: 4.4,
    reviews: 67,
    genres: ["Folk", "Indie", "Singer-Songwriter"],
    image: "/intimate-music-venue.jpg",
    phone: "(212) 477-4155",
    website: "rockwoodmusichall.com",
    nextAvailable: "Dec 12, 2024",
    description: "Intimate venue perfect for singer-songwriters and acoustic performances.",
  },
]

export function VenueList() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{venues.length} venues found</h3>
        <Button variant="ghost" size="sm">
          Sort by Distance
        </Button>
      </div>

      {venues.map((venue) => (
        <Card
          key={venue.id}
          className="glass-effect border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <CardHeader className="pb-3">
            <div className="flex gap-3">
              <img
                src={venue.image || "/placeholder.svg"}
                alt={venue.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{venue.name}</h4>
                    <p className="text-sm text-muted-foreground">{venue.type}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{venue.rating}</span>
                    <span className="text-xs text-muted-foreground">({venue.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {venue.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {venue.capacity}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {venue.priceRange}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{venue.description}</p>

            <div className="flex flex-wrap gap-1">
              {venue.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span>Next available: {venue.nextAvailable}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{venue.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span>{venue.website}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                Contact Venue
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Save for Later
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
