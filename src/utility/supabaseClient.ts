import { createClient } from "@pankod/refine-supabase";

const SUPABASE_URL = "https://yugvqjtbebyqngdpstws.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z3ZxanRiZWJ5cW5nZHBzdHdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Nzk5NjU3OCwiZXhwIjoxOTkzNTcyNTc4fQ.YKsP7ludiZ7jhp3f-3fcqVGL8eZeMDbfekWsKC67p7w";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
