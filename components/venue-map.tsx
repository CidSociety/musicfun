"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Layers, Maximize2, ExternalLink } from "lucide-react"

// Mock venue data with coordinates
const venueMarkers = [
  {
    id: 1,
    name: "The Blue Note",
    lat: 40.7308,
    lng: -74.0014,
    type: "Jazz Club",
    priceRange: "$800-1200",
    rating: 4.8,
    address: "131 W 3rd St, New York, NY 10012",
  },
  {
    id: 2,
    name: "Mercury Lounge",
    lat: 40.7223,
    lng: -73.9878,
    type: "Rock Club",
    priceRange: "$600-900",
    rating: 4.6,
    address: "217 E Houston St, New York, NY 10002",
  },
  {
    id: 3,
    name: "Brooklyn Bowl",
    lat: 40.7218,
    lng: -73.957,
    type: "Concert Hall",
    priceRange: "$1200-2000",
    rating: 4.7,
    address: "61 Wythe Ave, Brooklyn, NY 11249",
  },
  {
    id: 4,
    name: "Rockwood Music Hall",
    lat: 40.7205,
    lng: -73.9865,
    type: "Music Venue",
    priceRange: "$400-700",
    rating: 4.4,
    address: "196 Allen St, New York, NY 10002",
  },
]

export function VenueMap() {
  const [selectedVenue, setSelectedVenue] = useState<(typeof venueMarkers)[0] | null>(null)
  const [mapView, setMapView] = useState<"list" | "interactive">("list")

  const handleGetDirections = (venue: (typeof venueMarkers)[0]) => {
    const query = encodeURIComponent(`${venue.name}, ${venue.address}`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank")
  }

  const handleToggleView = () => {
    setMapView(mapView === "list" ? "interactive" : "list")
  }

  return (
    <div className="relative h-full">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="glass-effect" onClick={handleToggleView}>
          <Layers className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="glass-effect">
          <Navigation className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="glass-effect">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Interactive Map View */}
      <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-4xl mx-auto p-6">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">NYC Music Venues</h3>
              <p className="text-muted-foreground">Discover and connect with the best music venues in New York City</p>
            </div>
          </div>

          {/* Venue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venueMarkers.map((venue) => (
              <Card
                key={venue.id}
                className={`glass-effect border-border/50 cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-lg ${
                  selectedVenue?.id === venue.id ? "border-primary ring-1 ring-primary/20" : ""
                }`}
                onClick={() => setSelectedVenue(venue)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{venue.name}</h4>
                        <p className="text-sm text-muted-foreground">{venue.type}</p>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {venue.rating} ★
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{venue.address}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">{venue.priceRange}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleGetDirections(venue)
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Venue Info Panel */}
      {selectedVenue && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <Card className="glass-effect border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedVenue.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedVenue(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary">{selectedVenue.type}</Badge>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {selectedVenue.rating}
                </span>
                <span>{selectedVenue.priceRange}</span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedVenue.address}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Contact Venue
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleGetDirections(selectedVenue)}
                >
                  Get Directions
                </Button>
                <Button size="sm" variant="outline">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
