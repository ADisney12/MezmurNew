import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/PauseCircleFilled';
import { Box, Button, Container, Typography, LinearProgress } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

const VideoPlayer = ({VideoData, index, isPlaying, listData, onVideoEnd }) => {
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState({ playing: false, played: 0, playedSeconds: 0 });
  const [playerUrl, setPlayerUrl] = useState(null);
  const [playerindex, setPlayerindex] = useState(index);
  const [videoData, setvideoData] = useState(VideoData);
  const [percentage, setPercentage] = useState(0);
  const [pausedTimes, setPausedTimes] = useState({});

  useEffect(() => {
    if (videoData) {
      const videoId = videoData.url.split('v=')[1]?.split('&')[0];
      setPlayerUrl(`https://www.youtube.com/watch?v=${videoId}`);
      setPlayerState({ playing: true, played: 0, playedSeconds: 0 });
    }
  }, [videoData]);

  useEffect(() => {
    setPlayerState(prevState => ({
      ...prevState,
      playing: isPlaying
    }));
  }, [isPlaying]);

  const handleCardClick = () => {
    setPlayerState(prevState => ({
      ...prevState,
      playing: !prevState.playing
    }));
    setPausedTimes({
      ...pausedTimes,
      [index]: playerState.playedSeconds,
    });
  };

  const handleProgressClick = (event) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    
    const newPercentage = (clickPosition / progressBarWidth) * 100;
    
    setPercentage(newPercentage);
    
    // Seek to the clicked position
    if (playerRef.current) {
        playerRef.current.seekTo(newPercentage / 100);
    }
  };

  const handleVideoEnd = () => {
    if (listData != null) {
      console.log(listData);
      setPlayerUrl(listData[playerindex + 1]["url"]);
      setPlayerindex(playerindex + 1);
      setvideoData(listData[playerindex + 1]);
      setPlayerState(prevState => ({
        ...prevState,
        playing: true,
      }));
      setPercentage(0);
      
      // Call the onVideoEnd callback
      onVideoEnd(); // Notify the parent component
    }
  };

  return (
    <div className="video-player">
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#103359', p: 1, boxShadow: 3, height:"14%", color:"white" }}>
      <Box sx={{ position: 'relative' }}>
        <Typography variant="h7" sx={{ position: 'absolute', top:"5%" }}>{videoData["title"]}</Typography>
        {videoData["Author"] ? (
          <Typography variant="h8" sx={{ position: 'absolute', top: '30px' }}>{videoData["Author"]}</Typography>
        ) : (
          <Typography variant="h8" sx={{ position: 'absolute', top: '30px' }}>{videoData["author"]["name"]}</Typography>
        )}
      </Box>
      <FastRewindIcon sx={{position:"absolute", top:"25%", left:"45%",   fontSize:"50px",  transform:"translate(-50%, -50%)"}}/>
        {playerState.playing ? (
          <PauseIcon
            onClick={handleCardClick}
            sx={{
              fontSize:"50px", 
              textAlign:"center",
              position:"absolute",
              top:"25%",
              left:"50%",
              transform:"translate(-50%, -50%)"
            }}
          />
        ) : (
          <PlayCircleIcon
            onClick={handleCardClick}
            sx={{
              fontSize:"50px",
              textAlign:"center", 
              position:"absolute",
              top:"25%",
              left:"50%",
              transform:"translate(-50%, -50%)"
            }}
          />
        )}
    
    <FastForwardIcon sx={{position:"absolute", top:"25%", left:"55%",   fontSize:"50px",  transform:"translate(-50%, -50%)"}}/>
        <Box
          sx={{
            cursor: 'pointer',
            padding: '8px 0' // Add some padding to make it easier to click
          }}
        >
          <LinearProgress 
           onClick={handleProgressClick}
            variant="determinate" 
            value={percentage || 0}
            sx={{
              width:"60%",
              marginTop: "3%",
              marginBottom: 2,
              marginLeft:"20%",
              height: 8,
              borderRadius: 5
            }}
          />
        </Box>
        <ReactPlayer
          ref={playerRef}
          url={playerUrl}
          playing={playerState.playing}
          controls
          width="0%"
          height="auto"
          onProgress={({ played, playedSeconds }) => {
            setPlayerState(prevState => ({
              ...prevState,
              played,
              playedSeconds,
            }));
            setPercentage(played * 100); // Sync progress bar with video
          }}
          onPause={() => {
            const currentTime = Math.floor(playerState.playedSeconds);
            setPlayerState(prevState => ({
              ...prevState,
              playing: false,
            }));
            setPausedTimes(prev => ({
              ...prev,
              [currentTime]: (prev[currentTime] || 0) + 1
            }));
          }}
          onPlay={() => {
            setPlayerState(prevState => ({
              ...prevState,
              playing: true,
            }))
          }}
          onEnded={handleVideoEnd}
        />
             <Typography variant="h8" component="div" class="Ysabeau" sx={{position:"absolute", top:"55%", left:"90%"}}>
              Note: this feature is in beta stage.
            </Typography>
      </Box>  
    </div>
  );
};

export default VideoPlayer;
