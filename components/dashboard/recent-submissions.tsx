"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const recentSubmissions = [
  {
    id: 1,
    location: "Hargeisa Central",
    votes: 234,
    reporter: "Ahmed M.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    location: "Burco East",
    votes: 187,
    reporter: "Faduma H.",
    time: "5 minutes ago",
  },
  {
    id: 3,
    location: "Berbera North",
    votes: 156,
    reporter: "Mohamed A.",
    time: "12 minutes ago",
  },
  {
    id: 4,
    location: "Erigavo Center",
    votes: 198,
    reporter: "Amina S.",
    time: "15 minutes ago",
  },
]

export function RecentSubmissions() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{submission.location}</p>
                  <p className="text-sm text-muted-foreground">
                    Reported by {submission.reporter}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{submission.votes} votes</p>
                  <p className="text-sm text-muted-foreground">
                    {submission.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}