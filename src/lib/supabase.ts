import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zjinktblxlbbckfjtioo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaW5rdGJseGxiYmNrZmp0aW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMzM2NTcsImV4cCI6MjA4NDkwOTY1N30.GWgQ0bo_sH8VqtzkN4Qo4OPujkTRrI_FGdazGiTr3sU"
);
