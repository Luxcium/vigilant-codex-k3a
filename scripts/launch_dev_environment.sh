## =============================================================================
#? Script Name: launch_dev_environment.sh
#? Aim: Launch the web development environment
#? Purpose: Start the development server, monitor logs, and open the application in the browser
#? Decision Rationale: Provides a streamlined workflow for web development
#? Usage: ./launch_dev_environment.sh
#? Dependencies: pnpm, xdg-open
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: package.json, pnpm-workspace.yaml
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/bin/bash

# Launch the development server
pnpm run web:dev &

# Wait for the server to start
sleep 5

# Open the application in the default browser
xdg-open http://localhost:3000

# Monitor logs and metrics
pnpm run web:lint &
pnpm run web:test &

# Keep the script running to monitor the processes
wait
