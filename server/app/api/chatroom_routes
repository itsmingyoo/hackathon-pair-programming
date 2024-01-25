from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, ChatRoom, Message, db

chatroom_routes = Blueprint('chatrooms', __name__)

@chatroom_routes.route('/', methods=['POST'])
@login_required
def start_room():
    return 0