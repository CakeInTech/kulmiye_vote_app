import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentSubmissions } from "@/components/dashboard/recent-submissions"
import { AreaStats } from "@/components/dashboard/area-stats"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <Overview />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentSubmissions />
        <AreaStats />
      </div>
    </div>
  )
}