#!/bin/bash

# Stop the script if any command fails
set -e

# Navigate to the client directory and run npm commands
echo "Installing client dependencies and building the client..."
cd client
npm install
npm run start
cd ..

# Navigate to the server directory and run pip commands
echo "Installing server dependencies and setting up the database..."
pip install -r requirements.txt
pip install psycopg2
flask db upgrade
flask seed all
cd ..

echo "Build and setup completed successfully!"
