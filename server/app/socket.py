from flask_socketio import SocketIO, emit, join_room
import random, time
from flask_login import current_user

origins = "*"

socketio = SocketIO(cors_allowed_origins=[])

socket_rooms = {}

@socketio.on('join_room')
def handle_join_room():
    user = current_user
    rooms = list(socket_rooms.keys())

    try:
        eligible_rooms = [room for room in rooms if len(socket_rooms[room]) == 1 and user.id not in socket_rooms[room]]

        if eligible_rooms:
            chosen_room = random.choice(eligible_rooms)
        else:
            while True:
                new_room = f'room_{int(time.time())}_{user.id}'
                if new_room not in rooms:
                    chosen_room = new_room
                    break
                else:
                    # Regenerate the room name if it already exists
                    new_room = f'room_{int(time.time())}_{user.id}'

        # Create the room in the dictionary if it doesn't exist
        socket_rooms.setdefault(chosen_room, [])

        # Add the user to the chosen room
        socket_rooms[chosen_room].append(user.id)

        join_room(chosen_room)

        socketio.emit('joined', {'user': user.id, 'room': chosen_room}, room=chosen_room)

    except Exception as e:
        # Handle exceptions (e.g., room not found, socket connection issue)
        socketio.emit('join_room_error', {'error': str(e)}, room=user.id)
