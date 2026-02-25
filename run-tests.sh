#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Use default node version
nvm use default

cd /home/adriss/Documents/VU/3k2s/SoftwareTesting/Testing || exit 1

echo "--------------------------------------------------" >> cron.log
echo "Test executed: $(date '+%F %T')" >> cron.log
echo "--------------------------------------------------" >> cron.log

npx playwright test >> cron.log 2>&1

echo "" >> cron.log
