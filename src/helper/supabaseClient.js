import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ttpjcltiieudcmevgkgj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cGpjbHRpaWV1ZGNtZXZna2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDI4NzcsImV4cCI6MjA2MDcxODg3N30.AZO4t2HSxxRqHt8fgezJHgENAnXrP3f7tkK8cBPo2zo";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;