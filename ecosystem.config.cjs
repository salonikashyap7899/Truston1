module.exports = {
  apps: [
    {
      name: "truston",
      script: "./serve.mjs",
      interpreter: "node",
      cwd: "/root/TrustonDevelopers",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        // Supabase — set real values here or use `pm2 set` / a .env file
        // IMPORTANT: Replace the placeholder below with your actual service role key
        SUPABASE_URL: "https://riphytslpvrasnbcfpaw.supabase.co",
        SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI",
        VITE_SUPABASE_URL: "https://riphytslpvrasnbcfpaw.supabase.co",
        VITE_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI",
        // SUPABASE_SERVICE_ROLE_KEY: "YOUR_SERVICE_ROLE_KEY_HERE",
      },
    },
  ],
};
