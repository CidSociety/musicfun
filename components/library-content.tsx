"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Download, Share, MoreHorizontal, Music, Clock } from "lucide-react"

const songs = [
  {
    id: 1,
    title: "Midnight Blues",
    artist: "Your Band",
    album: "Live Sessions",
    duration: "4:32",
    genre: "Blues",
    dateAdded: "Dec 10, 2024",
    plays: 1247,
    status: "published",
  },
  {
    id: 2,
    title: "Electric Dreams",
    artist: "Your Band",
    album: "Studio Album",
    duration: "3:45",
    genre: "Rock",
    dateAdded: "Dec 8, 2024",
    plays: 892,
    status: "draft",
  },
  {
    id: 3,
    title: "Acoustic Sunrise",
    artist: "Your Band",
    album: "Unplugged",
    duration: "5:12",
    genre: "Folk",
    dateAdded: "Dec 5, 2024",
    plays: 2156,
    status: "published",
  },
  {
    id: 4,
    title: "Jazz Fusion",
    artist: "Your Band",
    album: "Experimental",
    duration: "6:28",
    genre: "Jazz",
    dateAdded: "Dec 3, 2024",
    plays: 743,
    status: "published",
  },
]

const albums = [
  {
    id: 1,
    title: "Live Sessions",
    tracks: 8,
    duration: "32:15",
    releaseDate: "Nov 2024",
    cover: "/album-cover-live-sessions.jpg",
  },
  {
    id: 2,
    title: "Studio Album",
    tracks: 12,
    duration: "45:22",
    releaseDate: "Oct 2024",
    cover: "/album-cover-studio-album.jpg",
  },
  {
    id: 3,
    title: "Unplugged",
    tracks: 6,
    duration: "28:45",
    releaseDate: "Sep 2024",
    cover: "/album-cover-unplugged-acoustic.jpg",
  },
]

export function LibraryContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Songs</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Music className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Albums</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-8 w-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Music className="h-4 w-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Plays</p>
                <p className="text-2xl font-bold">15.2K</p>
              </div>
              <Play className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-2xl font-bold">3h 42m</p>
              </div>
              <Clock className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Albums */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Albums</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={album.cover || "/placeholder.svg"}
                    alt={album.title}
                    className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-medium truncate">{album.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {album.tracks} tracks • {album.duration}
                </p>
                <p className="text-xs text-muted-foreground">{album.releaseDate}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Songs List */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>All Songs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors group"
              >
                <div className="w-8 text-center text-sm text-muted-foreground group-hover:hidden">{index + 1}</div>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hidden group-hover:flex">
                  <Play className="h-4 w-4" />
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium truncate">{song.title}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                  </div>
                </div>

                <Badge variant={song.status === "published" ? "default" : "secondary"} className="text-xs">
                  {song.status}
                </Badge>

                <div className="text-sm text-muted-foreground">{song.plays.toLocaleString()} plays</div>

                <div className="text-sm text-muted-foreground">{song.duration}</div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
