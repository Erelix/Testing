#!/bin/bash

cd /home/adriss/Documents/VU/3k2s/SoftwareTesting || exit 1

echo "--------------------------------------------------" >> cron.log
echo "Test executed: $(date '+%F %T')" >> cron.log
echo "--------------------------------------------------" >> cron.log

npx playwright test >> cron.log 2>&1

echo "" >> cron.log
