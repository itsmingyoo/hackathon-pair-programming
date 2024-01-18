from flask_socketio import SocketIO, emit

origins = "*"

socketio = SocketIO(cors_allowed_origin=origins)