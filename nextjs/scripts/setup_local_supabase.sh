#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SUPABASE_DIR="${PROJECT_ROOT}/supabase"
NEXTJS_DIR="${PROJECT_ROOT}/nextjs"

echo "⏳ Starting local Supabase instance (if not already running)..."
cd "$PROJECT_ROOT"
supabase start

# Parse variables from supabase status output
SUPABASE_STATUS=$(supabase status)

API_URL=$(echo "$SUPABASE_STATUS" | grep -E 'API URL:' | sed 's/.*API URL:[[:space:]]*//')
ANON_KEY=$(echo "$SUPABASE_STATUS" | grep -E 'anon key:' | sed 's/.*anon key:[[:space:]]*//')
SERVICE_ROLE_KEY=$(echo "$SUPABASE_STATUS" | grep -E 'service_role key:' | sed 's/.*service_role key:[[:space:]]*//')

# If not found, fallback to config.toml or defaults
if [ -z "$API_URL" ]; then
  API_URL="http://localhost:54321"
fi
if [ -z "$ANON_KEY" ]; then
  ANON_KEY=$(grep 'anon_key' "${SUPABASE_DIR}/config.toml" | head -n1 | awk '{print $3}' | tr -d '"')
fi
if [ -z "$SERVICE_ROLE_KEY" ]; then
  SERVICE_ROLE_KEY=$(grep 'service_role_key' "${SUPABASE_DIR}/config.toml" | head -n1 | awk '{print $3}' | tr -d '"')
fi

# Always convert 127.0.0.1 to localhost for frontend use
API_URL=${API_URL//127.0.0.1/localhost}

ENV_FILE="${NEXTJS_DIR}/.env.local"
touch "$ENV_FILE"

update_env_var() {
  local key="$1"
  local value="$2"
  if grep -q "^${key}=" "$ENV_FILE"; then
    sed -i '' "s|^${key}=.*|${key}=${value}|" "$ENV_FILE"
  else
    # Ensure the file ends with a newline before appending
    tail -c1 "$ENV_FILE" | read -r _ || echo >> "$ENV_FILE"
    echo "${key}=${value}" >> "$ENV_FILE"
  fi
}

echo "📝 Updating Supabase environment variables in ${ENV_FILE}..."

update_env_var NEXT_PUBLIC_SUPABASE_URL "$API_URL"
update_env_var NEXT_PUBLIC_SUPABASE_ANON_KEY "$ANON_KEY"
update_env_var PRIVATE_SUPABASE_SERVICE_KEY "$SERVICE_ROLE_KEY"

echo "✅ .env.local has been updated in nextjs/!"

echo ""
echo "Preview of changed variables in .env.local:"
grep -E "NEXT_PUBLIC_SUPABASE_URL=|NEXT_PUBLIC_SUPABASE_ANON_KEY=|PRIVATE_SUPABASE_SERVICE_KEY=" "$ENV_FILE"