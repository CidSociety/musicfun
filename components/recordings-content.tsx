"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Square, Mic, AudioWaveform as Waveform, Clock, Calendar, Download, Edit, Trash2 } from "lucide-react"

const recordings = [
  {
    id: 1,
    title: "Blues Jam Session",
    duration: "12:34",
    size: "45.2 MB",
    quality: "48kHz/24bit",
    date: "Dec 10, 2024",
    status: "completed",
    waveform: "/audio-waveform.png",
  },
  {
    id: 2,
    title: "Vocal Recording Take 3",
    duration: "4:22",
    size: "18.7 MB",
    quality: "44.1kHz/16bit",
    date: "Dec 9, 2024",
    status: "processing",
    waveform: "/audio-waveform-vocal.jpg",
  },
  {
    id: 3,
    title: "Guitar Solo Practice",
    duration: "8:15",
    size: "32.1 MB",
    quality: "48kHz/24bit",
    date: "Dec 8, 2024",
    status: "completed",
    waveform: "/audio-waveform-guitar.jpg",
  },
  {
    id: 4,
    title: "Band Rehearsal Full",
    duration: "45:12",
    size: "156.8 MB",
    quality: "48kHz/24bit",
    date: "Dec 7, 2024",
    status: "completed",
    waveform: "/audio-waveform-band.jpg",
  },
]

export function RecordingsContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Recording Controls */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Quick Record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button size="lg" className="rounded-full w-16 h-16">
                <Mic className="h-6 w-6" />
              </Button>
              <div className="flex flex-col gap-1">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Ready to record</span>
                <Badge variant="outline" className="text-xs">
                  48kHz/24bit
                </Badge>
              </div>
              <div className="w-full bg-secondary/30 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300"></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>00:00</span>
                <span>Input Level: -12dB</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Recordings</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Mic className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Duration</p>
                <p className="text-2xl font-bold">4h 32m</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">1.2 GB</p>
              </div>
              <div className="h-8 w-8 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Waveform className="h-4 w-4 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Calendar className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recordings List */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Recordings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div>
                    <h3 className="font-medium">{recording.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{recording.duration}</span>
                      <span>•</span>
                      <span>{recording.size}</span>
                      <span>•</span>
                      <span>{recording.quality}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 mx-4">
                  <img
                    src={recording.waveform || "/placeholder.svg"}
                    alt="Waveform"
                    className="w-full h-10 object-cover rounded opacity-60"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <Badge variant={recording.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {recording.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{recording.date}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
