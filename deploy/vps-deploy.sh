#!/bin/bash
# TrustOn VPS Deploy Script
# Run this on your Hostinger VPS from the /root/TrustonDevelopers directory:
#   chmod +x deploy/vps-deploy.sh
#   ./deploy/vps-deploy.sh

set -e

APP_DIR="/root/TrustonDevelopers"
cd "$APP_DIR"

echo "=== TrustOn VPS Deploy ==="

# 1. Pull latest code from GitHub
echo "[1/5] Pulling latest code..."
git pull origin main

# 2. Clean install all dependencies (wipe node_modules to avoid stale cache issues)
echo "[2/5] Installing dependencies (clean)..."
rm -rf node_modules
npm install

# 3. Load .env and export all vars so they are available to the Vite build
#    VITE_* vars must be present in the shell environment at build time.
echo "[3/5] Loading .env and building..."
set -a
source .env
set +a
npm run build

# 4. Stop old PM2 process if running (ignore error if not found)
echo "[4/5] Stopping old PM2 process..."
pm2 stop truston 2>/dev/null || true
pm2 delete truston 2>/dev/null || true

# 5. Start fresh with PM2 using ecosystem config
#    Starting fresh (not restart) guarantees env vars are loaded cleanly.
echo "[5/5] Starting app with PM2..."
pm2 start ecosystem.config.cjs --env production
pm2 save

echo ""
echo "=== Deploy complete! ==="
echo "Check status: pm2 status"
echo "Check logs:   pm2 logs truston --lines 50"
