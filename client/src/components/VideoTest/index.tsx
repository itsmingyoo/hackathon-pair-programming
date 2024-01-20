import React, { useEffect, MouseEventHandler, useState } from 'react';
import socket from '../../socket';

// Since you're not using props or state, we don't need to define them here
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

const VideoTest: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);

    const handleUserConnecting: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setIsConnected(true);
    };

    const handleUserDisconnecting: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setIsConnected(false);
    };

    useEffect(() => {
        if (isConnected) {
            socket.connect();
        } else {
            if (socket.connected) {
                socket.disconnect();
            }
        }

        socket.on('connect', () => console.log('Connected to socket server'));
        socket.on('disconnect', () => console.log('Disconnected from socket server'));

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [isConnected]);

    useEffect(() => {
        const video = document.getElementById('videoElement') as HTMLVideoElement;
        if (!video) return;

        const setupVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                await video.play();
            } catch (error) {
                console.error('Error setting up video stream:', error);
            }
        };

        if (navigator.mediaDevices.getUserMedia && typeof navigator.mediaDevices.getUserMedia === 'function') {
            setupVideo();
        }

        const FPS = 22;
        const interval = setInterval(() => {
            if (!video) return;
            const type = 'image/jpg';
            const frame = capture(video, 1);
            let data = frame.toDataURL(type);
            data = data.replace('data:' + type + ';base64,', '');
            socket.emit('image', data);
        }, 10000 / FPS);

        return () => {
            clearInterval(interval);
            if (video && video.srcObject) {
                (video.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        socket.on('response_back', (image) => {
            const imageElement = document.getElementById('image') as HTMLImageElement;
            imageElement.src = image;
        });

        return () => {
            socket.off('response_back');
        };
    }, []);

    // const handleUserConnecting: MouseEventHandler<HTMLButtonElement> = async (e) => {
    //     e.preventDefault();
    // };
    // const handleUserDisconnecting: MouseEventHandler<HTMLButtonElement> = async (e) => {
    //     e.preventDefault();
    // };
    // useEffect(() => {
    //     socket.on('connect', function () {
    //         console.log('Connection has been successfully established with socket.', socket.connected);
    //     });
    //     const video = document.querySelector('#videoElement') as HTMLVideoElement;
    //     video.width = 500;
    //     video.height = 375;

    //     if (navigator.mediaDevices.getUserMedia) {
    //         navigator.mediaDevices
    //             .getUserMedia({ video: true })
    //             .then(function (stream) {
    //                 video.srcObject = stream;
    //                 video.play();
    //             })
    //             .catch(function (error: Error) {
    //                 console.error(error);
    //                 console.log('Something went wrong!');
    //             });
    //     }

    //     // call the function we made to capture the frames
    //     const FPS = 22;
    //     const interval = setInterval(() => {
    //         const type = 'image/jpg';
    //         const frame = capture(video, 1);
    //         let data = frame.toDataURL(type);
    //         data = data.replace('data:' + type + ';base64,', '');
    //         socket.emit('image', data);
    //     }, 10000 / FPS);

    //     // cleanup function
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     socket.on('response_back', function (image) {
    //         const imageElement = document.getElementById('image') as HTMLImageElement;
    //         console.log(image);
    //         imageElement.src = image;
    //     });
    // }, []);

    return (
        <>
            <div id="container">
                <canvas id="canvasOutput"></canvas>
                <video autoPlay={true} id="videoElement"></video>
            </div>
            <div className="video">
                <img id="image" alt="Received Image" />
            </div>
            <button onClick={handleUserConnecting}>Connect!</button>
            <button onClick={handleUserDisconnecting}>Disconnect!</button>
        </>
    );
};

export default VideoTest;
