import { VenueSearchHeader } from "@/components/venue-search-header"
import { VenueMap } from "@/components/venue-map"
import { VenueFilters } from "@/components/venue-filters"
import { VenueList } from "@/components/venue-list"

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col">
          <VenueSearchHeader />
          <div className="flex-1 flex overflow-hidden">
            <div className="w-80 glass-effect border-r border-border/50 flex flex-col">
              <VenueFilters />
              <div className="flex-1 overflow-y-auto">
                <VenueList />
              </div>
            </div>
            <div className="flex-1">
              <VenueMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
