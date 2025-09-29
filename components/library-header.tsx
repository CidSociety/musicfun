"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Search, Upload, Filter, Grid, List } from "lucide-react"

export function LibraryHeader() {
  return (
    <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Music Library</h1>
              <p className="text-muted-foreground">Organize and manage your music collection</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search songs, albums, artists..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <List className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </div>
  )
}
