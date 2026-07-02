#!/usr/bin/env node
/* Temporary compatibility shim.
   The real generator was renamed to delta-generate-plans.js.
   This shim keeps the old Vercel Build Command (`node generate-plans.js`)
   working until it is updated to `node delta-generate-plans.js` in
   Vercel Project Settings > Build & Development. Delete this file once
   the Build Command has been updated. */
require('./delta-generate-plans.js');
