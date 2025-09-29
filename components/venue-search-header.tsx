import { ArrowLeft, Search, MapPin, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function VenueSearchHeader() {
  return (
    <header className="glass-effect border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Venue Discovery</h1>
              <p className="text-sm text-muted-foreground">Find the perfect venues for your music</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by venue name, city, or genre..."
              className="pl-10 w-80 bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Bot className="h-4 w-4" />
            AI Suggest
          </Button>
        </div>
      </div>
    </header>
  )
}
