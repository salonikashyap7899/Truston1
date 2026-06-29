module.exports = {
  apps: [
    {
      name: "truston",
      script: "serve.mjs",
      interpreter: "node",
      cwd: "/root/TrustonDevelopers",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      // All env vars are loaded from .env by serve.mjs at startup.
      // These entries act as a fallback — edit the .env file on the VPS instead
      // of putting secrets directly here.
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        SUPABASE_URL: "https://riphytslpvrasnbcfpaw.supabase.co",
        SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI",
        VITE_SUPABASE_URL: "https://riphytslpvrasnbcfpaw.supabase.co",
        VITE_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcGh5dHNscHZyYXNuYmNmcGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzAxMjEsImV4cCI6MjA5Nzk0NjEyMX0.kxar-gurnMm1QansyZmgkbjR6j3u0OCq-4Zna94q1gI",
        VITE_SUPABASE_PROJECT_ID: "riphytslpvrasnbcfpaw",
        // SUPABASE_SERVICE_ROLE_KEY must be set in .env on the VPS — never commit it here
      },
    },
  ],
};
