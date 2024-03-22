from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Friend
from .auth_routes import validation_errors_to_error_messages


friend_routes = Blueprint('friends', __name__)