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

# Handle image data received from client, process it using OpenCV and PIL, then send the processed image back to the client
@socketio.on('video_capture')
def handle_video_capture(data_image): # accept image data
    # Step 1: Decode data_image
    b = io.BytesIO(base64.b64decode(data_image)) # decodes data_image from base64 encoded string to bytes using `base64.b64decode` and creates a BytesIO object with the bytes
    pimg = Image.open(b) # opens the image from the previous line using PIL 'Image.open(arg)'

    # Step 2: convert to numpy array for opencv to process (flipping image & encoding the frame into jpeg format then store binary image data)
    # DO WHATEVER IMAGE PROCESSING HERE{
    frame = cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR) # converts pimg to NumPy array which is OpenCVs working format
    frame = cv2.flip(frame, flipCode=1) # flips the image, flipCode=0 flips it vertically
    imgencode = cv2.imencode('.jpg', frame)[1] # encode the 'frame' into a JPEG format : returns a tuple and the [1] accesses the second element of this tuple which is the binary image data
    #}

    # Step 3: encode JPEG binary image data into a string, embed it with a prefix, and emit the data to the client
    stringData = base64.b64encode(imgencode).decode('utf-8') # encode JPEG image data into a base64 string to transmit the binary data over the network in a safe manner
    b64_src = 'data:image/jpeg;base64,' # define prefix to be embedded to the base64 encoded image data `stringData`
    stringData = b64_src + stringData # concatenate them
    emit('response_back', stringData) # send this processed image back to the client
