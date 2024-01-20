import React, { useEffect } from 'react';
import socket from '../../socket';

// Define types for your props and state if needed
// interface Props {}

// Since you're not using props or state, we don't need to define them here

const VideoTest: React.FC = () => {
    let mediaStream: MediaStream | null = null;

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

    useEffect(() => {
        socket.on('connect', function () {
            console.log('Connection has been succesfully established with socket.', socket.connected);
        });

        const video = document.querySelector('#videoElement') as HTMLVideoElement;
        video.width = 500;
        video.height = 375;

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                    mediaStream = stream; // Store the media stream reference under video.play()
                })
                .catch(function (error: Error) {
                    console.error(error);
                    console.log('Something went wrong!');
                });
        }

        // call the function we made to capture the frames
        const FPS = 22;
        const interval = setInterval(() => {
            const type = 'image/jpg';
            const frame = capture(video, 1);
            let data = frame.toDataURL(type);
            data = data.replace('data:' + type + ';base64,', '');
            socket.emit('image', data);
        }, 10000 / FPS);

        // cleanup function
        return () => {
            if (mediaStream) {
                const tracks = mediaStream.getTracks();
                tracks.forEach((track) => track.stop());
            }
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        socket.on('response_back', function (image) {
            const imageElement = document.getElementById('image') as HTMLImageElement;
            // console.log(image);
            imageElement.src = image;
        });
        // socket.on('response_back', function (videoData) {
        //     const videoElement = document.getElementById('video') as HTMLVideoElement;

        //     videoElement.src = 'data:image/jpeg;base64,' + videoData;

        //     if (videoElement.paused) {
        //         videoElement.play();
        //     }
        // });
    }, []);

    return (
        <>
            <div id="container">
                {/* LOCAL CAMERA */}
                <canvas id="canvasOutput"></canvas>
                <video autoPlay={true} id="videoElement"></video>
            </div>
            <div className="video">
                {/* PROCESSED FRAMES FROM CAMERA */}
                <img id="image" />
            </div>
        </>
    );
};

export default VideoTest;
