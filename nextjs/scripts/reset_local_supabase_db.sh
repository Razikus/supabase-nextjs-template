#!/usr/bin/env bash
set -e

# Calculate relevant directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SUPABASE_DIR="${PROJECT_ROOT}/supabase"

echo "🧹 Resetting and migrating local Supabase database..."
cd "$PROJECT_ROOT"
supabase db reset

echo "✅ Local Supabase database has been reset and all migrations have been applied!"