from flask_socketio import SocketIO, emit

origins = "*"

socketio = SocketIO(cors_allowed_origin=origins)

# @socketio.on("direct_message")
# def handle_direct_message(data):

#     # handle data by creating a new direct message
#     message = DirectMessage(
#         message= data['message'],
#         conversation_id = data['conversation_id'],
#         user_id = data['user_id'],
#         created_at = datetime.utcnow()
#     )
#     # add to seesion and commit
#     db.session.add(message)
#     conversation = DirectMessageConversation.query.get(data['conversation_id'])
#     conversation.updated_at = datetime.utcnow()
#     db. session.commit()
#     temp = message.to_dict()
#     # temp['created_at'] = temp['created_at'].strftime("%m/%d/%Y, %H:%M:%S")
#     emit("direct_message", temp, broadcast=True)