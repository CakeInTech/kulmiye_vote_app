export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      reporters: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      areas: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          area_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          area_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          area_id?: string
          name?: string
          created_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          reporter_id: string
          location_id: string
          vote_count: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          location_id: string
          vote_count: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          location_id?: string
          vote_count?: number
          notes?: string | null
          created_at?: string
        }
      }
    }
    Functions: {
      get_area_stats: {
        Returns: {
          area_id: string
          area_name: string
          total_votes: number
        }[]
      }
    }
  }
}