"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

const areaData = {
  hargeisa: {
    name: "Hargeisa",
    totalVotes: 8750,
    locations: [
      { name: "Central", votes: 2400 },
      { name: "North", votes: 1850 },
      { name: "South", votes: 1600 },
      { name: "East", votes: 1500 },
      { name: "West", votes: 1400 },
    ],
  },
  burco: {
    name: "Burco",
    totalVotes: 6420,
    locations: [
      { name: "Central", votes: 2200 },
      { name: "East", votes: 2120 },
      { name: "West", votes: 2100 },
    ],
  },
  berbera: {
    name: "Berbera",
    totalVotes: 4890,
    locations: [
      { name: "Port Area", votes: 1800 },
      { name: "North", votes: 1590 },
      { name: "South", votes: 1500 },
    ],
  },
  erigavo: {
    name: "Erigavo",
    totalVotes: 4529,
    locations: [
      { name: "Central", votes: 1729 },
      { name: "North", votes: 1400 },
      { name: "South", votes: 1400 },
    ],
  },
}

export default function AreasPage() {
  const [selectedArea, setSelectedArea] = useState("hargeisa")

  const maxVotes = Math.max(...Object.values(areaData).map(area => area.totalVotes))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Areas Overview</h1>

      <Tabs defaultValue="hargeisa" onValueChange={setSelectedArea}>
        <TabsList className="grid grid-cols-4 w-full">
          {Object.entries(areaData).map(([id, area]) => (
            <TabsTrigger key={id} value={id} className="text-sm">
              {area.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(areaData).map(([id, area]) => (
          <TabsContent key={id} value={id}>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Area Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Total Votes</p>
                      <p className="text-2xl font-bold">{area.totalVotes.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Progress</p>
                      <Progress 
                        value={(area.totalVotes / maxVotes) * 100} 
                        className="h-2 mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      {area.locations.map((location) => (
                        <div key={location.name} className="space-y-2">
                          <div className="flex justify-between">
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {location.votes.toLocaleString()} votes
                            </p>
                          </div>
                          <Progress 
                            value={(location.votes / area.totalVotes) * 100} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}