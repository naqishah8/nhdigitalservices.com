#!/usr/bin/env bash
# Zero-downtime-ish update script for the VPS.
# Pulls latest main, reinstalls deps ONLY if lockfile changed, rebuilds,
# and hot-restarts the PM2 process.
#
# Usage (on the VPS, as the app user):
#   cd ~/site && ./scripts/deploy.sh
#
# First time:
#   chmod +x scripts/deploy.sh

set -euo pipefail

# --- config ------------------------------------------------------------------
APP_NAME="nhds"                  # PM2 process name (matches: pm2 start ... --name nhds)
BRANCH="main"
LOCKFILE="package-lock.json"
# -----------------------------------------------------------------------------

cd "$(dirname "$0")/.."          # jump to repo root regardless of where it's called from

log()  { printf '\033[1;36m▶ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m! %s\033[0m\n' "$*"; }
fail() { printf '\033[1;31m✗ %s\033[0m\n' "$*"; exit 1; }

# Fail fast if required tools aren't on PATH
command -v git  >/dev/null || fail "git not installed"
command -v node >/dev/null || fail "node not installed"
command -v npm  >/dev/null || fail "npm not installed"
command -v pm2  >/dev/null || fail "pm2 not installed (run: npm i -g pm2)"

# Capture the current lockfile hash BEFORE pulling so we can tell whether
# deps actually changed. Skipping `npm ci` saves 20-60s on small updates.
if [[ -f "$LOCKFILE" ]]; then
  before_lock="$(sha1sum "$LOCKFILE" | awk '{print $1}')"
else
  before_lock=""
fi

log "Fetching origin/$BRANCH"
git fetch --prune origin "$BRANCH"

# Stop if there are uncommitted local changes (avoids silent merge conflicts)
if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "Working tree has local changes — commit or discard before deploying."
fi

local_sha="$(git rev-parse HEAD)"
remote_sha="$(git rev-parse "origin/$BRANCH")"

if [[ "$local_sha" == "$remote_sha" ]]; then
  warn "Already on the latest commit ($local_sha). Rebuilding anyway."
else
  log "Pulling: ${local_sha:0:7} → ${remote_sha:0:7}"
  git reset --hard "origin/$BRANCH"
fi

# Reinstall deps only if lockfile content actually changed
if [[ -f "$LOCKFILE" ]]; then
  after_lock="$(sha1sum "$LOCKFILE" | awk '{print $1}')"
else
  after_lock=""
fi

if [[ "$before_lock" != "$after_lock" ]]; then
  log "Lockfile changed — running npm ci"
  npm ci --no-audit --no-fund
else
  ok "Dependencies unchanged — skipping install"
fi

log "Building (npm run build)"
npm run build

# Restart — PM2 keeps the old process up until the new one is ready
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  log "Restarting PM2 process '$APP_NAME'"
  pm2 reload "$APP_NAME" --update-env
else
  warn "PM2 process '$APP_NAME' not found — starting fresh"
  pm2 start "npm run start" --name "$APP_NAME" --time
  pm2 save
fi

ok "Deploy complete."
pm2 describe "$APP_NAME" | grep -E "status|uptime|restarts|memory" | sed 's/^ */  /'
