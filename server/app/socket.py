from flask_socketio import SocketIO, emit
from PIL import Image
import numpy as np
import cv2, base64, io

origins = "*"

socketio = SocketIO(cors_allowed_origins=[])


@socketio.on('image')
def handle_video_capture(data_image):
    #separate out the mime type and valid base64 string
    header, encoded_data = data_image.split(',', 1)
    b = io.BytesIO(base64.b64decode(encoded_data))
    pimg = Image.open(b)

    # DO WHATEVER IMAGE PROCESSING HERE{
    frame = cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)
    frame = cv2.flip(frame, flipCode=1)
    imgencode = cv2.imencode('.jpg', frame)[1]
    #}

    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpeg;base64,'
    stringData = b64_src + stringData
    emit('response_back', stringData)
