from flask_socketio import SocketIO, emit, join_room, leave_room, close_room
import random, time
from flask_login import current_user

origins = []

socketio = SocketIO(cors_allowed_origins=origins)

socket_rooms = {}


@socketio.on("join_room")
def handle_join_room():
    user = current_user
    rooms = list(socket_rooms.keys())

    try:
        eligible_rooms = [
            room
            for room in rooms
            if socket_rooms[room]["user_count"] <= 1 and user.id not in socket_rooms[room]["user_history"]
        ]

        if eligible_rooms:
            chosen_room = random.choice(eligible_rooms)
        else:
            while True:
                new_room = f"room_{int(time.time())}_{user.id}"
                if new_room not in rooms:
                    chosen_room = new_room
                    break

        # Create the room in the dictionary if it doesn't exist
        socket_rooms.setdefault(chosen_room, {"user_count": 0, "user_history": []})

        # Add the user to the chosen room
        socket_rooms[chosen_room]["user_count"] += 1
        socket_rooms[chosen_room]["user_history"].append(user.id)

        join_room(chosen_room)

        socketio.emit("joined", {"user": user.to_dict(), "room": chosen_room}, to=chosen_room)

    except Exception as e:
        # Handle exceptions (e.g., room not found, socket connection issue)
        print("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬", e)
        socketio.emit("join_room_error", {"error": str(e)}, to=user.id)


@socketio.on("leave_room")
def handle_leave_room(data):
    """
        If there is only one user in room, close room and delete from socket_rooms else leave room and update user_count in socket_rooms and let the room know a user left.
    """

    if socket_rooms[data["room"]]["user_count"] == 1:
        del socket_rooms[data["room"]]
        close_room(data["room"])
    else:
        leave_room(data["room"])
        socket_rooms[data["room"]]["user_count"] -= 1
        socketio.emit(
            "user_left", f"{current_user.username} has exited the room!", to=data["room"]
        )

