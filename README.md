# $${\color{blue}hackathon-pair-programming}$$
<!-- FORMAT FOR THIS STYLING: $${\color{red}Welcome \space \color{lightblue}To \space \color{orange}Stackoverflow}$$ -->
$${\color{red}by \space \color{lightblue}Minh, \space \color{lightblue}Melinda, \space \color{lightblue}John, \space \color{lightblue}Saad}$$

# About
- **Accessibility-Focused**: Designed to assist users in finding pair-programming partners for practicing Data Structures & Algorithms.
- **Random Pairing Mechanism**: Implements a first-in, first-out system for connecting users randomly.
- **Interactive Platform**: Offers video camera sharing and chat functionalities for enhanced communication and problem-solving collaboration.
- **Community-Driven Initiative**: Aims to serve users struggling to find programming partners, fostering a supportive community environment.
- **Flexible Pairing Options**: Allows users to link up with a partner or choose to connect with a different participant.

# Features
1. Client to Client Video Calling
2. Client to Client Chatting
3. IDE DS&A Tests
4. User Following/Followers

# Technology
1. Python
2. Flask
3. React
4. Redux && @reduxjs/toolkit
5. TypeScript
6. [flask-socketio](https://flask-socketio.readthedocs.io/en/latest/)
7. OpenCV

# Getting Started

## Method 1: Use setup.sh script
- Run the install script in your terminal
    - `sh setup.sh`
        - This script will create a `.env` with necessary variables and values for you to initialize the project and install all dependencies on the client and server.
- Terminal 1:
    - `cd into client`
    - `npm run dev`
- Terminal 2:
    - `cd into server`
    - `pipenv shell`
    - `flask run`

## Method 2: Manual

### Server
- `cd` into the server folder
- Create a `.env` file with a key
    - `SECRET_KEY=<your secret key>`
    - `DATABASE_URL=sqlite:///dev.db`
    - `SCHEMA=<schema_name>`
- `pipenv install -r requirements.txt`
- `pipenv shell`
- `flask db migrate`
- `flask db upgrade`
- `flask seed all`
- `flask run`

### Client
- `cd` into the client folder
- `npm i`
- `npm run build` in one terminal for typescript
- `npm run dev` in another terminal


# Deployment

### Build Command
- `./build.sh`
- Inside build.sh
    ```
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
    cd server
    pip install -r requirements.txt
    pip install psycopg2
    flask db upgrade
    flask seed all
    cd ..

    echo "Build and setup completed successfully!"
    ```

### Start Command
- `cd server && gunicorn -k gevent -w 1 app:app`
