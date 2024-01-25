from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, ChatRoom, Message, db

message_routes = Blueprint('messages', __name__)

