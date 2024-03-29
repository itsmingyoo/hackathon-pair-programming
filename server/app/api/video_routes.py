from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
import numpy as np
import cv2 as cv

video_routes = Blueprint('video', __name__)

@login_required
@video_routes.route('/')
def test_video():
    cap = cv.VideoCapture(0)
    if not cap.isOpened():
        exit()
    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        # if frame is read correctly ret is True
        if not ret:
            break
        # Our operations on the frame come here
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        # Display the resulting frame
        cv.imshow('frame', gray)
        if cv.waitKey(1) == ord('q'):
            break
    # When everything done, release the capture
    cap.release()
    cv.destroyAllWindows()
