from flask import request
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, disconnect
from flask_login import current_user
import random, time, functools, datetime, logging

origins = []

# socketio = SocketIO(cors_allowed_origins=origins)
# For development, allowing all origins (use cautiously)
socketio = SocketIO(logger=True, engineio_logger=True, cors_allowed_origins='http://127.0.0.1:5173')

# For production, specify allowed origins
# socketio = SocketIO(cors_allowed_origins=['http://localhost:5173'])


socket_rooms = {}

@socketio.on('connect')
def authenticated_only(f):
    """
        Defines authenticated only wrapper that will check if a user is authenticated before calling the original function. If not authenticated it will disconnect the user from the socket.
    """
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else:
            return f(*args, **kwargs)
    return wrapped


@socketio.on("join_room")
@authenticated_only
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
        print({"joined_room": '😀😁😂🤣😃😄😅',"user": user.to_dict(), 'room': chosen_room})
        emit("joined", {"user": user.to_dict(), "room": chosen_room}, to=chosen_room)

    except Exception as e:
        # Handle exceptions (e.g., room not found, socket connection issue)
        print("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬", e)
        socketio.emit("join_room_error", {"error": str(e)}, to=user.id)


@socketio.on("leave_room")
@authenticated_only
def handle_leave_room(data):
    """
        If there is only one user in room, close room and delete from socket_rooms else leave room and update user_count in socket_rooms and let the room know a user left.

        Exxpected data:
        {
            "room": "example_room_name"
        }
    """

    if socket_rooms[data["room"]]["user_count"] == 1:
        del socket_rooms[data["room"]]
        close_room(data["room"])
    else:
        leave_room(data["room"])
        socket_rooms[data["room"]]["user_count"] -= 1
        emit(
            "user_left", f"{current_user.username} has exited the room!", to=data["room"]
        )


@socketio.on("temp_chat_message")
@authenticated_only
def handle_temp_chat(data):
    """
        Creates a response dictionary with the user who sent it, the current date and time, and the message and emits the message to the specified room.

        Expected data:
        {
            "message": "Example message content",
            "room": "example_room_name"
        }
    """

    response = {
        "from": current_user.to_dict(),
        "message": data["message"],
        "created_at": datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S"),
    }

    emit("temp_message_received", response, to=data["room"])

@socketio.on('user_leaving')
@authenticated_only
def handle_user_leaving(data):
    response = {
        "user": data['userId'],
        "reason": 'Refreshed, Reloaded, or Closed Tab'
    }
    print('🤡🤡🤡🤡🤡🤡🤡🤡', response)
    disconnect()

@socketio.on_error()  # Handles the default namespace
def error_handler(e):
    logging.basicConfig(level=logging.ERROR)
    logging.error(f"🤬🤬🤬🤬🤬🤬🤬SocketIO Error🤬🤬🤬🤬🤬🤬🤬: {e}")

@socketio.on("my error event")
def on_my_event(data):
    raise RuntimeError()

@socketio.on_error_default
def default_error_handler(e):
    print(request.event["message"]) # "my error event"
    print(request.event["args"])    # (data,)
