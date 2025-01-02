import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="video-player">
      <video controls>
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
