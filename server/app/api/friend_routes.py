from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db, FriendRequest, FriendshipStatus
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/<int:UserId>')
def get_user_friends(UserId):

    """
    @route GET /<int:UserId>

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


    if not User:
        return {"error": "User not found"}, 404
    
    friends = {friend.id: friend.to_dict() for friend in user.friends.all()}
    sent_requests = {friend.receiver.id: friend.receiver.to_dict() for friend in user.sent_friend_requests if friend.status == FriendshipStatus.PENDING}
    received_requests = {friend.sender.id: friend.sender.to_dict() for friend in user.received_friend_requests if friend.status == FriendshipStatus.PENDING}

    return {"Friends": friends, "Sent": sent_requests, "Received": received_requests}

