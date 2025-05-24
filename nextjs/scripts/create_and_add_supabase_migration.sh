#!/usr/bin/env bash
set -e

# Check for migration name argument
if [ -z "$1" ]; then
  echo "❌ Please provide a name for the migration."
  echo "📌 Example: bun run supabase:migration add_users_table"
  exit 1
fi

MIGRATION_NAME="$1"

# Find the absolute path to the project root (two levels up from this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SUPABASE_DIR="$PROJECT_ROOT/supabase"
MIGRATIONS_DIR="$SUPABASE_DIR/migrations"

cd "$SUPABASE_DIR"

echo "🔍 Generating migration based on current schema changes..."
supabase db diff -f "$MIGRATION_NAME"

# Find the latest migration file
LATEST_MIGRATION=$(ls -t "$MIGRATIONS_DIR"/*.sql | head -n1)

if [ -z "$LATEST_MIGRATION" ]; then
  echo "❌ Could not find a new migration file."
  exit 1
fi

cd "$PROJECT_ROOT"
git add "$LATEST_MIGRATION"

echo "✅ Migration '$LATEST_MIGRATION' has been created and added to git."