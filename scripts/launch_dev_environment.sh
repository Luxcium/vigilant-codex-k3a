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
