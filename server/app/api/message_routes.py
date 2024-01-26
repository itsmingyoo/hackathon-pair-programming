from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import User, ChatRoom, Message, DirectMessage, db
from ..forms import NewMessage
from datetime import datetime

message_routes = Blueprint('messages', __name__)

@message_routes.route('/direct/<int:user2_id>')
@login_required
def get_direct_messages(user2_id):
    user2 = User.query.get(user2_id)

    messages = DirectMessage.query.filter((DirectMessage.sender_id == user2.id and DirectMessage.receiver_id == current_user.id) or (DirectMessage.sender_id == current_user.id and DirectMessage.receiver_id == user2.id))
    return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/direct/<int:user2_id>', methods=['POST'])
@login_required
def send_direct_message(user2_id):
    user2 = User.query.get(user2_id)

    form = NewMessage()
    form['csrf_token'].data = request.cookies['csrf_token']

    message = DirectMessage(
        message_text = form.data['message'],
        created_at = datetime.now(),
        sender_id = current_user.id,
        receiver_id = user2.id
    )

    db.session.add(message)
    db.session.commit()
    return message.to_dict()
