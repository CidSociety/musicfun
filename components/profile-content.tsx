"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Music, DollarSign, Users, Camera, Edit } from "lucide-react"

export function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and settings</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/musician-profile.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">Professional Musician</p>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">Jazz</Badge>
                <Badge variant="secondary">Blues</Badge>
                <Badge variant="secondary">Rock</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Total Gigs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">$12.4K</div>
                <div className="text-sm text-muted-foreground">Earnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2.3K</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="social">Social & Links</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your basic personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="john.doe@example.com" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input id="location" defaultValue="New York, NY" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      defaultValue="Professional musician with over 10 years of experience performing jazz, blues, and rock music. Available for weddings, corporate events, and private parties."
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Professional Details
                  </CardTitle>
                  <CardDescription>Your musical background and professional information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stage-name">Stage Name</Label>
                    <Input id="stage-name" defaultValue="Johnny Blues" disabled={!isEditing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genres">Genres</Label>
                    <Input
                      id="genres"
                      defaultValue="Jazz, Blues, Rock, Soul"
                      disabled={!isEditing}
                      placeholder="Separate genres with commas"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instruments">Instruments</Label>
                    <Input
                      id="instruments"
                      defaultValue="Guitar, Piano, Vocals"
                      disabled={!isEditing}
                      placeholder="Separate instruments with commas"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" defaultValue="12" disabled={!isEditing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate">Hourly Rate ($)</Label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <Input id="rate" type="number" defaultValue="150" disabled={!isEditing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Textarea
                      id="availability"
                      placeholder="Describe your availability..."
                      defaultValue="Available weekends and evenings. Can travel within 50 miles of NYC. Advance booking preferred."
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Social Media & Links
                  </CardTitle>
                  <CardDescription>Connect your social media accounts and portfolio links</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      defaultValue="https://johnnyblues.com"
                      disabled={!isEditing}
                      placeholder="https://your-website.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spotify">Spotify</Label>
                    <Input
                      id="spotify"
                      defaultValue="https://open.spotify.com/artist/johnnyblues"
                      disabled={!isEditing}
                      placeholder="Spotify artist profile URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      defaultValue="https://youtube.com/@johnnyblues"
                      disabled={!isEditing}
                      placeholder="YouTube channel URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      defaultValue="@johnnyblues_music"
                      disabled={!isEditing}
                      placeholder="Instagram handle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soundcloud">SoundCloud</Label>
                    <Input
                      id="soundcloud"
                      defaultValue="https://soundcloud.com/johnnyblues"
                      disabled={!isEditing}
                      placeholder="SoundCloud profile URL"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
