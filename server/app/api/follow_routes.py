from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, Follow, db

follow_routes = Blueprint('follows', __name__)

# @follow_routes.route('/<int:id>')
# @login_required
# def user_follow(id):
#     user = User.query.get(id)
#     return {'Followers': user.to_followers, 'Follows': user.to_follows}