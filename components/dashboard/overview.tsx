"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Vote, BarChart3, Map, Users } from "lucide-react"

const stats = [
  {
    name: "Total Votes",
    value: "24,589",
    icon: Vote,
    description: "Total votes recorded",
  },
  {
    name: "Areas",
    value: "18",
    icon: Map,
    description: "Active voting areas",
  },
  {
    name: "Locations",
    value: "142",
    icon: BarChart3,
    description: "Voting locations",
  },
  {
    name: "Reporters",
    value: "38",
    icon: Users,
    description: "Active reporters",
  },
]

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.name}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}