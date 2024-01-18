import React, { useEffect } from 'react';
import io from 'socket.io-client';

// Define types for your props and state if needed
// interface Props {}

// Since you're not using props or state, we don't need to define them here

const VideoTest: React.FC = () => {
    function capture(video: HTMLVideoElement, scaleFactor: number = 1) {
        const w = video.videoWidth * scaleFactor;
        const h = video.videoHeight * scaleFactor;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get canvas context');
        }
        ctx.drawImage(video, 0, 0, w, h);
        return canvas;
    }

    const socket = io('http://localhost:5000');
    socket.on('connect', function () {
        console.log('Connection has been successfully established with socket.', socket.connected);
    });

    useEffect(() => {
        const video = document.querySelector('#videoElement') as HTMLVideoElement;
        video.width = 500;
        video.height = 375;

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (error: Error) {
                    console.error(error);
                    console.log('Something went wrong!');
                });
        }

        const FPS = 22;
        const interval = setInterval(() => {
            const type = 'image/jpg';
            const frame = capture(video, 1);
            let data = frame.toDataURL(type);
            data = data.replace('data:' + type + ';base64,', '');
            socket.emit('image', data);
        }, 10000 / FPS);

        return () => clearInterval(interval);
    }, []);

    socket.on('response_back', function (image: string) {
        const imageElement = document.getElementById('image') as HTMLImageElement;
        console.log(image);
        imageElement.src = image;
    });

    return (
        <>
            <div id="container">
                <canvas id="canvasOutput"></canvas>
                <video autoPlay={true} id="videoElement"></video>
            </div>
            <div className="video">
                <img id="image" />
            </div>
        </>
    );
};

export default VideoTest;
