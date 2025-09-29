import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Users, DollarSign, Calendar, Music } from "lucide-react"

const genres = ["Rock", "Jazz", "Blues", "Country", "Electronic", "Hip Hop", "Folk", "Classical"]

const venueTypes = ["Concert Hall", "Club", "Bar", "Festival", "Theater", "Outdoor", "Private Event"]

export function VenueFilters() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm">
          Clear All
        </Button>
      </div>

      {/* Location */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">New York, NY</Badge>
            <Badge variant="outline">Los Angeles, CA</Badge>
            <Badge variant="outline">Nashville, TN</Badge>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Distance (miles)</label>
            <Slider defaultValue={[25]} max={100} step={5} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>25 miles</span>
              <span>100+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capacity */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Capacity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Slider defaultValue={[100, 500]} max={2000} step={50} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50</span>
              <span>100-500</span>
              <span>2000+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Budget Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Slider defaultValue={[500, 2000]} max={5000} step={100} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$500-$2000</span>
              <span>$5000+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Genre */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Music className="h-4 w-4" />
            Genre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox id={genre} />
                <label
                  htmlFor={genre}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Venue Type */}
      <Card className="glass-effect border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Venue Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {venueTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
