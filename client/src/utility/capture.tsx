export function capture(video: HTMLVideoElement, scaleFactor: number = 1) {
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
