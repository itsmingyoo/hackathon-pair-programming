from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, follow, db

from sqlalchemy import select

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('<int:follow_id>/follow/<int:user_id>', methods=['POST'])
@login_required
def follow_user(follow_id, user_id):

    user = User.query.get(user_id)
    following_user = User.query.get(follow_id)

    if not following_user or not user:
        return {'error': 'User not found'}
    
    query = select([follow]).where(
        (follow.c.followed_user == follow_id) & (follow.c.follower == user_id)
    )

    res = db.session.execute(query)

    in_follows = res.fetchone() is not None

    if in_follows:
        user.follows.remove(following_user)
        db.session.commit()
        return following_user.to_dict()
    else:
        user.follows.append(following_user)
        db.session.commit()
        return following_user.to_dict()