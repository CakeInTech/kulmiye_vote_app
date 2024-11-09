"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const areaStats = [
  {
    name: "Hargeisa",
    total: 8750,
    progress: 85,
  },
  {
    name: "Burco",
    total: 6420,
    progress: 72,
  },
  {
    name: "Berbera",
    total: 4890,
    progress: 65,
  },
  {
    name: "Erigavo",
    total: 4529,
    progress: 58,
  },
]

export function AreaStats() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Area Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {areaStats.map((area) => (
            <div key={area.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{area.name}</p>
                <p className="text-sm text-muted-foreground">
                  {area.total.toLocaleString()} votes
                </p>
              </div>
              <Progress value={area.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}