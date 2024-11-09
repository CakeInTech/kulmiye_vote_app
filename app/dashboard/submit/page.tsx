"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const formSchema = z.object({
  area: z.string().min(1, "Area is required"),
  location: z.string().min(1, "Location is required"),
  votes: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Votes must be a valid number",
  }),
  notes: z.string().optional(),
})

const areas = [
  { id: "hargeisa", name: "Hargeisa" },
  { id: "burco", name: "Burco" },
  { id: "berbera", name: "Berbera" },
  { id: "erigavo", name: "Erigavo" },
]

const locations = {
  hargeisa: ["Central", "North", "South", "East", "West"],
  burco: ["Central", "East", "West"],
  berbera: ["Port Area", "North", "South"],
  erigavo: ["Central", "North", "South"],
}

export default function SubmitVotesPage() {
  const [selectedArea, setSelectedArea] = useState("")
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: "",
      location: "",
      votes: "",
      notes: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase.from("votes").insert({
        area: values.area,
        location: values.location,
        votes: parseInt(values.votes),
        notes: values.notes,
        reporter_id: user?.id,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Vote data submitted successfully",
      })

      form.reset()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit vote data",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Submit Vote Count</CardTitle>
          <CardDescription>
            Enter the vote count for your assigned location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedArea(value)
                        form.setValue("location", "")
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedArea}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedArea &&
                          locations[selectedArea as keyof typeof locations].map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="votes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vote Count</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="Enter number of votes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional information"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Vote Count
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}