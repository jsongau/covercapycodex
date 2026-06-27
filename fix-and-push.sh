#!/bin/bash
###############################################################################
# fix-and-push.sh  (clean-history version)
#
# Pushes your CURRENT site (with the T6 page fixes) to GitHub as a brand-new,
# single-commit history. None of the old commits are pushed, so the old
# 239 MB zip and the old leaked key cannot block it.
#
# Old history is preserved locally on 'backup-2026-06-26' and a fresh
# 'pre-clean-backup-*' branch. Only GitHub's main is reset to the clean version.
#
# Run with:   bash "fix-and-push.sh"
###############################################################################
set -e
cd "/Users/kytlegacy/covercapycodex ultimate 21JUN26"

echo "==> Clearing any stale git lock"
rm -f .git/index.lock

echo "==> Snapshotting current main as a dated local backup branch"
git branch -f "pre-clean-backup-$(date +%Y%m%d-%H%M)" main || true

echo "==> Safety checks before building clean history"
# Pattern built from parts so this script never matches itself.
KEYPAT="sb""_secret_"
if grep -rIq "$KEYPAT" . --exclude-dir=.git --exclude=fix-and-push.sh; then
  echo "!! A Supabase service key is still present in the files. Aborting."; exit 1
fi
BIG=$(find . -path ./.git -prune -o -type f -size +100M -print | head -1)
if [ -n "$BIG" ]; then
  echo "!! A file over 100 MB is in the working tree: $BIG"; echo "   Aborting."; exit 1
fi
echo "    OK: no service keys, no oversized files."

echo "==> Building a fresh single-commit history from your current files"
git branch -D __clean_main 2>/dev/null || true
git checkout --orphan __clean_main
git add -A
git reset -q -- fix-and-push.sh 2>/dev/null || true   # keep this helper out of the repo
git commit -m "CoverCapy: T6 renderer repaired across all 1,148 /dentists pages (clean history)"

echo "==> Replacing main with the clean branch"
git branch -D main
git branch -m main

echo "==> Pushing clean history to GitHub (force)"
git push origin main --force

echo ""
echo "==> DONE. GitHub accepted the push. Vercel will redeploy in ~2 minutes."
echo "    Old history preserved locally on 'backup-2026-06-26' and 'pre-clean-backup-*'."
