from flask_socketio import SocketIO, emit
from PIL import Image
import numpy as np
import cv2, base64, io

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

@socketio.on('video_capture')
def handle_video_capture(data_image):
    sbuf = io.StringIO()
    sbuf.write(data_image)
    b = io.BytesIO(base64.b64decode(data_image))
    pimg = Image.open(b)

    # DO WHATEVER IMAGE PROCESSING HERE{
    frame = cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)
    frame = cv2.flip(frame, flipCode=0)
    imgencode = cv2.imencode('.jpg', frame)[1]
    #}

    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpeg;base64,'
    stringData = b64_src + stringData
    emit('response_back', stringData)
