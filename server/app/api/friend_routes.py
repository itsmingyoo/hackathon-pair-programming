from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db, FriendRequest, FriendshipStatus
from .auth_routes import validation_errors_to_error_messages

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/<int:UserId>')
def get_user_friends(UserId):

    """
    @route GET /api/friends/<int:UserId>

    @summary Retrieves a user's friends (accepted) and pending friend requests.

    @description Returns a dictionary containing friend data for current friends and pending requests (sent and received).

    @param {int:UserId} ID of the user to retrieve connections for.

    @returns {object} Friend list, sent & received friend requests (pending).

    @throws {404} User not found.

    Example Response:
    {
    "Friends": {...},
    "Sent": {...},
    "Received": {...},
    }
    """
    user = User.query.get(UserId)


    if not user:
        return {"error": "User not found"}, 404
    
    friends = {friend.id: friend.to_dict() for friend in user.friends.all()}
    sent_requests = {friend.receiver.id: friend.receiver.to_dict() for friend in user.sent_friend_requests if friend.status == FriendshipStatus.PENDING}
    received_requests = {friend.sender.id: friend.sender.to_dict() for friend in user.received_friend_requests if friend.status == FriendshipStatus.PENDING}

    return {"Friends": friends, "Sent": sent_requests, "Received": received_requests}

@friend_routes.route('/request/<int:receiver_id>', methods=["POST"])
@login_required
def send_friend_request(receiver_id):
    """
    @route POST /api/friends/request/<int:receiver_id>
    @login_required
    @summary Sends a friend request to another user.

    @description Creates a new friend request for the logged-in user to the user identified by the provided username.

    @param {object} JSON body containing a single field:
    - username {str}: Username of the user to send the friend request to.

    @returns {object} JSON response with the following structure:
        - message {str}: A success message upon successful request creation.
        - error (optional) {dict}: An error message and code if an error occurs.

    @throws:
        400 (Bad Request): If the request body is invalid (missing username).
        404 (Not Found): If the user with the provided username is not found.
        409 (Conflict): If a friend request already exists between the sender and receiver.
        500 (Internal Server Error): If an unexpected error occurs during database operations.

    Example Request Body:
    {
    "username": "friend_username"
    }

    Example Response (Success):
    {
    "message": "Friend request sent successfully"
    }

    Example Response (Error):
    {
    "error": {
        "code": 404,
        "message": "User not found"
    }
    }
    """

    # Validate and retrieve the receiver user
    receiver = User.query.get(receiver_id)
    if not receiver:
        return {"error": "User not found"}, 404
    
    # Check for existing friend request 
    existing_request = FriendRequest.query.filter(
    (FriendRequest.sender == current_user) & (FriendRequest.receiver == receiver) |
    (FriendRequest.sender == receiver) & (FriendRequest.receiver == current_user)
    ).first()
    if existing_request:
        return {"error": "Friend Request already exists"}, 409
    
    # Create new friend request
    new_request = FriendRequest(sender=current_user, receiver=receiver)
    db.session.add(new_request)
    db.session.commit()

    return {"success": "Friend request successfully sent!"}



