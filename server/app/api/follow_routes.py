from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, Follow, db

follow_routes = Blueprint('follows', __name__)
