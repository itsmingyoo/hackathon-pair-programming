from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Friend, FriendshipStatus
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.orm import joinedload

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/<int:UserId>')
def get_user_friends(UserId):
    """
        Retrieves a user's friends accepted and pending friend requests.

        Returns a dictionary with "Friends" and "Requests" keys, containing friend data.

        Parameters:
            UserId (int): The user ID.

        Returns:
            User data dictionary or 404 if user not found.

        Example Response:
        {
            "Friends": {...},
            "Requests": {...}
        }
        """

    user = User.query.get(UserId)

    if not User:
        return {"error": "User not found"}, 404
    
    friends = {friend.id: friend.to_dict() for friend in user.friends.filter(Friend.status == FriendshipStatus.ACCEPTED).all()}
    # requests = {friend.id: friend.user_id.to_dict() for friend in Friend.query.filter_by(friend_id=user.id, status=FriendshipStatus.PENDING).all()}

    return {"Friends": friends}

