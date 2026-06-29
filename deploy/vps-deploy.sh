#!/bin/bash
# TrustOn VPS Deploy Script
# Run this on your Hostinger VPS:
#   chmod +x deploy/vps-deploy.sh
#   ./deploy/vps-deploy.sh

set -e

APP_DIR="/root/TrustonDevelopers"
PM2_APP_NAME="truston"

cd "$APP_DIR"

echo "=== TrustOn VPS Deploy ==="

# 1. Pull latest code
echo "[1/5] Pulling latest code..."
git pull origin main

# 2. Install dependencies
echo "[2/5] Installing dependencies..."
npm install

# 3. Load .env so VITE_* vars are available at build time, then build
echo "[3/5] Building..."
set -a
source .env
set +a
npm run build

# 4. Remove old PM2 process
echo "[4/5] Stopping old PM2 process..."
pm2 stop $PM2_APP_NAME 2>/dev/null || true
pm2 delete $PM2_APP_NAME 2>/dev/null || true

# 5. Start fresh
echo "[5/5] Starting app with PM2..."
pm2 start ecosystem.config.cjs --env production
pm2 save

echo ""
echo "=== Deploy complete! ==="
echo "Status:  pm2 status"
echo "Logs:    pm2 logs $PM2_APP_NAME --lines 50"
