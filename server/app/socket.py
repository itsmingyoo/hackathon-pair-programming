from flask import request
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, disconnect
from flask_login import current_user
import random, time, functools, datetime, logging

origins = []

socketio = SocketIO(logger=True, engineio_logger=True, cors_allowed_origins=origins)

socket_rooms = {}

logging.basicConfig(level=logging.ERROR)

# @socketio.on('connect') # must take this out in order to have authenticated_only as a decorator
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
        print({"user_successfully_joined": '😀😁😂🤣😃😄😅',"user": user.to_dict(), 'room': chosen_room})
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
    print('🤡🤡🤡🤡USER LEFT!!!🤡🤡🤡🤡', response)
    disconnect()

@socketio.on_error()
def error_handler(e):
    logging.error(f"🤬🤬🤬🤬🤬🤬🤬SocketIO Error🤬🤬🤬🤬🤬🤬🤬: {e}")

@socketio.on("my error event")
def on_my_event(data):
    raise RuntimeError()

@socketio.on_error_default
def default_error_handler(e):
    print('🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶 on_error_default: ', e)
    print('Error in event:', request.event["message"])  # The event name, e.g., "join_room"
    print('With args:', request.event["args"])  # The event arguments
