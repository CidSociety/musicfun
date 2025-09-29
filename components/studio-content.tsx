"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, Wifi, Car, Coffee, Guitar, Mic } from "lucide-react"

const studios = [
  {
    id: 1,
    name: "Sound Factory Studio",
    location: "Manhattan, NY",
    distance: "2.3 miles",
    rating: 4.8,
    reviews: 124,
    hourlyRate: 85,
    image: "/professional-recording-studio.jpg",
    amenities: ["WiFi", "Parking", "Coffee", "Instruments"],
    equipment: ["SSL Console", "Pro Tools", "Neumann Mics", "Yamaha Piano"],
    availability: "Available today",
  },
  {
    id: 2,
    name: "Analog Dreams",
    location: "Brooklyn, NY",
    distance: "4.1 miles",
    rating: 4.9,
    reviews: 89,
    hourlyRate: 120,
    image: "/vintage-analog-recording-studio.jpg",
    amenities: ["WiFi", "Coffee", "Instruments", "Lounge"],
    equipment: ["Neve Console", "Tape Machines", "Vintage Mics", "Hammond Organ"],
    availability: "Available tomorrow",
  },
  {
    id: 3,
    name: "Digital Harmony",
    location: "Queens, NY",
    distance: "6.8 miles",
    rating: 4.6,
    reviews: 156,
    hourlyRate: 65,
    image: "/modern-digital-recording-studio.jpg",
    amenities: ["WiFi", "Parking", "Coffee"],
    equipment: ["Logic Pro X", "Focusrite Interface", "KRK Monitors", "MIDI Controllers"],
    availability: "Available now",
  },
  {
    id: 4,
    name: "The Mix Room",
    location: "Manhattan, NY",
    distance: "3.2 miles",
    rating: 4.7,
    reviews: 203,
    hourlyRate: 95,
    image: "/mixing-mastering-studio.jpg",
    amenities: ["WiFi", "Parking", "Coffee", "Instruments"],
    equipment: ["Mixing Console", "Mastering Suite", "Reference Monitors", "Outboard Gear"],
    availability: "Available this week",
  },
]

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "WiFi":
      return Wifi
    case "Parking":
      return Car
    case "Coffee":
      return Coffee
    case "Instruments":
      return Guitar
    case "Lounge":
      return Users
    default:
      return Clock
  }
}

export function StudioContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Studios Found</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Guitar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rate</p>
                <p className="text-2xl font-bold">$89/hr</p>
              </div>
              <div className="h-8 w-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Now</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-8 w-8 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Mic className="h-4 w-4 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bookings</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Users className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Studios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studios.map((studio) => (
          <Card key={studio.id} className="glass-effect overflow-hidden">
            <div className="relative">
              <img src={studio.image || "/placeholder.svg"} alt={studio.name} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-background/80 text-foreground">{studio.availability}</Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{studio.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">
                      {studio.location} • {studio.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{studio.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({studio.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${studio.hourlyRate}</p>
                  <p className="text-sm text-muted-foreground">per hour</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {studio.amenities.map((amenity) => {
                      const Icon = getAmenityIcon(amenity)
                      return (
                        <div key={amenity} className="flex items-center gap-1 px-2 py-1 bg-secondary/30 rounded-md">
                          <Icon className="h-3 w-3" />
                          <span className="text-xs">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Equipment</p>
                  <div className="flex flex-wrap gap-1">
                    {studio.equipment.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Book Now</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
