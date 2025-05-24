#!/usr/bin/env bash
set -e

# Resolve project root and file destination
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TYPES_DEST="${PROJECT_ROOT}/nextjs/src/lib/types.ts"

# Read project id from supabase/config.toml
SUPABASE_DIR="${PROJECT_ROOT}/supabase"
PROJECT_ID=$(grep 'project_id' "${SUPABASE_DIR}/config.toml" | head -n1 | awk -F'=' '{print $2}' | tr -d ' "')

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Could not find 'project_id' in supabase/config.toml"
  exit 1
fi

echo "📝 Generating Supabase TypeScript types from remote project '$PROJECT_ID' ..."

supabase gen types typescript --local > "$TYPES_DEST"

echo "✅ Types written to $TYPES_DEST"