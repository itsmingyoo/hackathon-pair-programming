import React from 'react';

interface ScreenShareButtonProps {
    toggleScreenShare: () => void;
    screenSharing: boolean;
}

const ScreenShareButton: React.FC<ScreenShareButtonProps> = ({ toggleScreenShare, screenSharing }) => {
    return (
        <button onClick={toggleScreenShare} id="share-screen-button">
            {screenSharing ? 'Stop Sharing' : 'Start Sharing'}
        </button>
    );
};

export default ScreenShareButton;
