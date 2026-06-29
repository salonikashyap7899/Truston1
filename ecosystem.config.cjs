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
      },
    },
  ],
};
