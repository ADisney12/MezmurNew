import React, { useEffect, useState, useRef } from 'react';
import { Container, TextField, Box, Button, Card, Typography, styled, createTheme, CardContent, CardMedia, CircularProgress } from "@mui/material";
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

  const handleCardClick = (e, index, state = null) => {

    if(state != null){
      if(state){
        setPlayerState(prevState => ({
          ...prevState,
          playing: true, // Toggle play/pause
          played: playerState.played,
      })
    );
  }
  if(state){
    setPlayerState(prevState => ({
      ...prevState,
      playing: true, // Toggle play/pause
      played: playerState.played,
  })
    )
  }
}
    console.log("Card clicked:", index); // Log the index of the clicked card
    console.log("Current playIndex:", playIndex); // Log the current playIndex

    const videoId = data[index]?.url.split('v=')[1]?.split('&')[0]; // Use optional chaining to avoid errors

    if (playIndex == index) {
        console.log("Toggling play/pause for the same video."); // Log when toggling play/pause
        setPlayerState(prevState => ({
            ...prevState,
            playing: !prevState.playing, // Toggle play/pause
            played: playerState.played,
        }));
        setPausedTimes(prev => ({
            ...prev,
            [index]: playerState.playedSeconds,
        }));
    } else {
        console.log("Playing a new video."); // Log when playing a new video
        setPlayIndex(index);
        setSelectedSongIndex(index); // Update the index of the selected song
        setSelectedSong(data[index]); // Set the selected song to the new video

        setPlayerState({
            playing: true, // Start playing the new video
            played: 0, // Reset played time for the new video
            playedSeconds: 0 // Reset played seconds for the new video
        });
    
        setPlayerUrl(`https://www.youtube.com/watch?v=${videoId}`);
    }
  };

  const RemovePlaylistScreenState = () => {
    setPlaylistScreen(false);
    setSelectedSong(null); // Clear the selected song when closing the screen
  }

  const ChangeSceenState = (e, index) => {
   
    setPlaylistScreen(true); // Open the AddToPlaylist screen
  }

  const MapElements = () => {
    if (loading) {
      return <CircularProgress sx={{marginLeft:"10%"}} />;
    }

    if (!data || data.length === 0) {
      return (
        <Box sx={{ marginLeft: "0%", color: "white", height: "100vh", fontSize: "25px" }}>
          <Typography sx={{ marginLeft: "5%", marginTop: "5%", color: "white", fontSize: "25px" }}>No songs found</Typography>
          <Box sx={{ width: "100%", height: "2px", backgroundColor: "white", marginTop: "2%", marginBottom: "2%" }} />
          <Typography sx={{ marginLeft: "5%", marginTop: "5%", fontFamily: "Ysabeau", color: "white", fontSize: "25px" }}>
            Try searching for something else
          </Typography>
        </Box>
      );
    }

    return (
      data.map((e, index) => (
        <StyledCard onClick={(e) => handleCardClick(e, index)} key={e.url} sx={{
            boxShadow: index == playIndex ? '0 20px 20px rgba(121, 222, 98, 0.2)' : '0 0px 0px rgba(65, 125, 51, 0.2)', 
            position: 'relative', 
            display: 'flex', 
            width: "40%", 
            minWidth:"2in", 
            marginBottom: index === data.length - 1 ? "0%" : "10%", 
            marginLeft: "10%"  
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', opacity:"100%"}}>
          
            <Box sx={{ 
              position: 'absolute', 
              top: 40, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0 20px'
            }}>
              <CardContent sx={{ flex: '1 0 auto', color:"white", maxWidth: '60%' }}>
                <Typography component="div" variant="h7" sx={{opacity:"100%", color:"gray"}}>
                  {e.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{color:"gray"}}>
                  {e.author.name}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', gap: 2, position: 'absolute', right: 20 }}>
                {playIndex == index ? (
                  <PauseIcon sx={{ fontSize: "50px", zIndex: 2 }} onClick={() => handleCardClick(e, index, true)} />
                ) : (
                  <StyledIcon sx={{ fontSize: "50px", zIndex: 2 }} onClick={() => handleCardClick(e, index, false)} />
                )}
                <AddIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    ChangeSceenState(e, index);
                  }}
                  sx={{
                    fontSize: "50px",
                    borderRadius: "25px",
                    transition: "transform 0.10s ease-in-out",
                    "&:hover": { transform: "scale(1.3, 1.3)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
                    zIndex: 2
                  }}
                />
              </Box>
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

  const handleVideoEnd = () => {
    if (playIndex !== null && playIndex < data.length - 1) {
      // Move to next video
      handleCardClick(null, playIndex + 1);
    } else {
      // Reset player state if it's the last video
      setPlayIndex(null);
      setPlayerState({ playing: false, played: 0 });
      setSelectedSong(null);
    }
  };

  return (
    <div>
      <Container maxWidth={false} maxHeight={false} sx={{ opacity: AddToPlaylistScreen ? 0.5 : 1, backgroundColor:"#041b3b", height: !loading ? "105%" : "100vh", color:"white", paddingBottom:"10%" }}>
        <ToolBar/>
      
            <Typography height={30} gutterBottom variant="h3" component="div" class="Ysabeau">
              Songs
            </Typography>
            <MapElements />
         

{selectedSong != null && (
        <div 
            sx={{ backgroundColor:"#103359", position:"relative" }}
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
          <VideoPlayer 
            key={playerUrl} // Ensures ReactPlayer reloads when URL changes
            VideoData={selectedSong} 
            index={selectedSongIndex}
            isPlaying={playerState.playing}
            listData={data}
            onVideoEnd={handleVideoEnd}
            sx={{ backgroundColor:"#103359", zIndex: 1, position: 'absolute', marginTop:"10%" }} 
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