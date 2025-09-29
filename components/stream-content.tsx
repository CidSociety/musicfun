"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Radio, Eye, Heart, MessageCircle, Settings, Camera, Mic, Monitor } from "lucide-react"

export function StreamContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Stream Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5" />
                Stream Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Stream preview will appear here</p>
                  <p className="text-sm text-muted-foreground">Click "Go Live" to start broadcasting</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Offline
                  </Badge>
                  <span className="text-sm text-muted-foreground">Ready to stream</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">Stream Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Stream Title</label>
                <Input placeholder="Enter stream title..." defaultValue="Live Music Session" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe your stream..."
                  className="min-h-[80px]"
                  defaultValue="Join me for an acoustic session featuring original songs and covers!"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select className="w-full p-2 rounded-md bg-input border border-border">
                  <option>Music & Audio</option>
                  <option>Live Performance</option>
                  <option>Acoustic Session</option>
                  <option>Band Practice</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">Stream Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  Viewers
                </span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Likes
                </span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  Messages
                </span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-semibold">00:00:00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stream History */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Acoustic Sunday Session",
                date: "Dec 8, 2024",
                duration: "1h 23m",
                viewers: 156,
                likes: 89,
              },
              {
                title: "New Song Preview",
                date: "Dec 5, 2024",
                duration: "45m",
                viewers: 203,
                likes: 124,
              },
              {
                title: "Q&A with Fans",
                date: "Dec 1, 2024",
                duration: "2h 15m",
                viewers: 89,
                likes: 67,
              },
            ].map((stream, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20">
                <div>
                  <h3 className="font-medium">{stream.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stream.date} • {stream.duration}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {stream.viewers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {stream.likes}
                  </span>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stream Settings */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Stream Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Video Settings
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution</span>
                  <span>1920x1080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frame Rate</span>
                  <span>30 FPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bitrate</span>
                  <span>2500 kbps</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Audio Settings
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sample Rate</span>
                  <span>48 kHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bitrate</span>
                  <span>128 kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Channels</span>
                  <span>Stereo</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Platform Settings
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary</span>
                  <span>YouTube Live</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Secondary</span>
                  <span>Twitch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="text-xs">
                    Connected
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
