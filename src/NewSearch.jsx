import React, { useEffect, useState, useRef } from 'react';
import { Container, TextField, Box, Button, Card, Typography, styled, createTheme, CardContent, CardMedia } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import PlayCircleIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import ToolBar from './appBar';
import PauseIcon from '@mui/icons-material/PauseCircleTwoTone';
import ReactPlayer from 'react-player';
import AddToPlaylist from './utills/AddToPlaylistScreen';
import AddIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from './utills/VideoPlayer';
import zIndex from '@mui/material/styles/zIndex';
const apiUrl = import.meta.env.VITE_API_URL;



const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.06, 1.04, 1)", Opacity: ".8", boxShadow: '5px 10px 9px #F4AAB9' },
}));

const StyledIcon = styled(PlayCircleIcon)(({ theme }) => ({
  borderRadius: "25px",
  transition: "transform 0.10s ease-in-out",
  "&:hover": { transform: "scale3d(1.3, 1.3, 1)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // Change the default background color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Change the font family
  },
});

export default function Search() {
  const [AddToPlaylistScreen, setPlaylistScreen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null); // New state to hold selected song data
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null); 
  const [playIndex, setPlayIndex] = useState(null);
  const [pausedTimes, setPausedTimes] = useState({});
  const [playerUrl, setPlayerUrl] = useState(null);
  const [playerState, setPlayerState] = useState({ playing: false, played: 0 });
  const [isHovered, setIsHovered] = useState(false); // New state for hover effect
  const params = useParams();
  const navigate = useNavigate();

  const GetData = async () => {
    try {
      const response = await fetch(`${apiUrl}/SearchVideo/${params["SearchQuery"]}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
      const result = await response.json();
      setData(result);
      console.log(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(playerState.playing);
    GetData();
  }, []);

  useEffect(() => {
    console.log(selectedSong);
  }, [selectedSong]);

  const handleCardClick = (e, index) => {
    console.log(e);
    setSelectedSong(e);
    setSelectedSong(e);
    const videoId = data[index].url.split('v=')[1]?.split('&')[0];
    if (playIndex === index) {
      setPlayerState(prevState => ({
        ...prevState,
        playing: false,
        played: playerState.played,
      }));
      setPausedTimes(prev => ({
        ...prev,
        [index]: playerState.playedSeconds,
      }));
      setPlayIndex(null);
    } else {
      setPlayerState({
        playing: false,
        played: pausedTimes[index] || 0,
        playedSeconds: pausedTimes[index] || 0
      });
      setPlayIndex(index);
      setPlayerUrl(`https://www.youtube.com/watch?v=${videoId}`);

      // Use a callback to ensure the state is updated before playing
      setTimeout(() => {
        setPlayerState(prevState => ({
          ...prevState,
          playing: true,
          played: pausedTimes[index] || 0,
          playedSeconds: pausedTimes[index] || 0
        }));
      }, 0);
    }
  };

  const RemovePlaylistScreenState = () => {
    setPlaylistScreen(false);
    setSelectedSong(null); // Clear the selected song when closing the screen
  }

  const ChangeSceenState = (e, index) => {
    console.log(e);
    setSelectedSong(e); // Set the selected song
    setSelectedSongIndex(index); 
    setPlaylistScreen(true); // Open the AddToPlaylist screen
  }

  const MapElements = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data) {
      return null;
    }

    return (
      data.map((e, index) => (
        <StyledCard sx={{ position: 'relative', display: 'flex', width: "50%", minWidth:"2in", marginBottom: "10%", marginLeft: "10%" }} key={e.url}>
          <Box sx={{ display: 'flex', flexDirection: 'column', opacity:"100%"}}>
          
            <Box sx={{ position: 'absolute', top: 40, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ flex: '1 0 auto', color:"white" }}>
              <Typography component="div" variant="h7" sx={{opacity:"100%", color:"gray"}}>
                {e.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" sx={{color:"gray"}}>
                {e.author.name}
              </Typography>
            </CardContent>
              {playIndex === index ? (
                <>
                  <PauseIcon sx={{ fontSize: "50px", zIndex: 2 }} onClick={() => handleCardClick(e, index)} />
                  <AddIcon
                  onClick={() => ChangeSceenState(e, index)}
                    sx={{
                      fontSize: "50px", ml: 2, borderRadius: "25px", transition: "transform 0.10s ease-in-out",
                      "&:hover": { transform: "scale(1.3, 1.3)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9',  },
                      zIndex: 2
                    }}
                  />
                </>
              ) : (
                <>
                  <StyledIcon sx={{ fontSize: "50px", zIndex: 2 }} onClick={() => handleCardClick(e, index)} />
                  <AddIcon
                    onClick={() => ChangeSceenState(e, index)} // Pass the song data when clicking Add
                    sx={{
                      fontSize: "50px", ml: 2, zIndex: 2 , borderRadius: "25px", transition: "transform 0.10s ease-in-out",
                      "&:hover": { transform: "scale(1.3, 1.3)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
          <CardMedia
      sx={{
        width: "100%",
        transition: "opacity 0.5s",
        "&:hover": {
          opacity: .5, // Fully fades out on hover
        },
      }}
      component="img"
      image={e.thumbnail}
      alt="Live from space album cover"
      style={{ filter: "brightness(100%)" }}
    />

            </StyledCard>
          ))
        );
      };

  return (
    <div>
      <Container maxWidth={false} maxHeight={false} sx={{ opacity: AddToPlaylistScreen ? 0.5 : 1, backgroundColor:"#041b3b", height: !loading ? "100%" : "100vh", color:"white" }}>
        <ToolBar/>
      
            <Typography height={30} gutterBottom variant="h3" component="div" class="Ysabeau">
              Songs
            </Typography>
            <MapElements />
          {playerUrl && (
            <Box sx={{ width: "100%" }}>
              {/* <ReactPlayer
                url={playerUrl}
                playing={playerState.playing}
                controls
                width="0%"
                height="auto"
                onProgress={({ playedSeconds }) => {
                  setPlayerState(prevState => ({
                    ...prevState,
                    playedSeconds,
                  }));
                }}
                onPause={() => {
                  setPlayerState(prevState => ({
                    ...prevState,
                    playing: false,
                  }));
                }}
                onPlay={() => {
                  setPlayerState(prevState => ({
                    ...prevState,
                    playing: true,
                  }));
                }}
              /> */}
            </Box>
          )}

{selectedSong != null && (
        <div 
            sx={{ backgroundColor:"#103359", position:"relative" }}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
            <VideoPlayer 
                VideoData={selectedSong} 
                index={selectedSongIndex}
                isPlaying={playerState.playing}
                sx={{ backgroundColor:"#103359", zIndex: 1, position: 'absolute' }} 
            />
        
        </div>
      )}

      </Container>

      {
        AddToPlaylistScreen && (
          <div>
            <AddToPlaylist index = {selectedSongIndex} VideoData={selectedSong} /> {/* Pass the selected song as a prop */}
            <CancelIcon onClick={RemovePlaylistScreenState} sx={{ position: "absolute", top: `${ (10) +  60 * selectedSongIndex}%`, left: "80%", fontSize: "4vh" }} />
          </div>
        )
      }
    </div>
  );
}