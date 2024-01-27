#!/bin/bash

# How to use
# run `sh setup.sh` in the terminal

# Stop the script if any command fails
set -e

# Navigate to the client directory and run npm commands
echo "Installing client dependencies..."
cd client
npm install
cd ..

# Navigate to the server directory and run pip commands
echo "Installing server dependencies..."
cd server

# File name
env_file=".env"

# Check if the .env file already exists
if [ ! -f "$env_file" ]; then
    # Create the .env file and add default values
    echo "Creating .env file with default values..."

    # Generate a UUID for the SECRET_KEY
    secret_key=$(uuidgen)

    # Using echo to add lines to the .env file
    echo "SECRET_KEY=$secret_key" > "$env_file" # > creates and overwrites
    echo "DATABASE_URL=sqlite:///dev.db" >> "$env_file" # >> appends
    echo "SCHEMA=flask_schema" >> "$env_file"

    echo ".env file created."
else
    echo ".env file already exists."
fi

# Function to run commands using pipenv
run_with_pipenv() {
    echo "Using pipenv to install dependencies and run migrations."
    pipenv run pip install -r requirements.txt
    pipenv run flask db migrate
    pipenv run flask db upgrade
    pipenv run flask seed all
}

# Function to run commands in the activated virtual environment
run_with_venv() {
    echo "Using virtual environment to install dependencies and run migrations."
    pip install -r requirements.txt
    flask db migrate
    flask db upgrade
    flask seed all
}

# Attempt to activate the virtual environment
if [ -d .venv ] || [ -f .venv ]; then
    echo "Virtual environment found. Activating..."
    source .venv/bin/activate
    run_with_venv
else
    echo "Virtual environment not found. Using pipenv."
    run_with_pipenv
fi

# Navigate back to the previous directory
cd ..


echo "Build and setup completed successfully!"
