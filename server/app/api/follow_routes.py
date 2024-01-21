from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import follow, db

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/')
@login_required
def user_follow():
    return current_user