import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import { GlobalContext } from "./GlobalData";
import ToolBar from "./appBar"
import ReactPlayer from 'react-player';
import VideoPlayer from './utills/VideoPlayer';

import { Button, Card, CardActions, CardContent, CardMedia, Typography, styled, createTheme, Container, AppBar, TextField, CircularProgress, Stack, Box} from "@mui/material";
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
const apiUrl = import.meta.env.VITE_API_URL;
const StyledPlayCircleIcon = styled(PlayCircleIcon)(({ theme }) => ({
  borderRadius: "25px",
  transition: "transform 0.10s ease-in-out",
  "&:hover": { transform: "scale3d(1.3, 1.3, 1)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
}));




export default function Playlist() {
  const [selectedSong, setSelectedSong] = useState(null); // New state to hold selected song data
  const [playlist, setPlaylist] = useState(null);
  const [selectedSongData, setSelectedSongData] = useState(null); // New state to hold selected song data
  const [playIndex, setPlayIndex] = useState(null);
  const [list, setlist] = useState(null); // State to hold the next song data
  const [pausedTimes, setPausedTimes] = useState({});
  const [playerUrl, setPlayerUrl] = useState(null);
  const [playerState, setPlayerState] = useState({ playing: false, played: 0 });
  let params = useParams();

  const {GlobalData, setGlobalData } = useContext(GlobalContext);

  let nav = useNavigate()
  useEffect(() => {
  
    if (GlobalData && GlobalData.Playlists) {
      const currentPlaylist = GlobalData.Playlists.find(
        (playlist) => playlist.Name === params.name
      );
      setPlaylist(currentPlaylist);
      
      if(playlist == "Friday"){
        nav("/home/" + params["id"])
      }
    }
    
  }, []);

  useEffect(() => {
    console.log(playlist)
     // console.log(currentPlaylist)

  }, [playlist]);

  const MapPlaylist = () => {
    return (
      playlist["list"].map((e, index) => (
        <Box
        sx={{
          border: index == playIndex ?"1px solid #13DD36" : "1px solid black",
          borderRadius: '8px',     
          padding: '3px',  
          borderColor:index === playIndex ? "#13DD36" : "#1e4371",
          marginBottom:'2%',
          color: index === playIndex ? "#13DD36" : "#b9c3d2"
                  
        }}
      >
          {playIndex != index ? (
                <>
                  <StyledPlayCircleIcon  onClick={() => handleCardClick(e, index)} sx={{
                fontSize:"4vh",
                //  display:"inline",
                marginLeft:"90%",
                  marginBottom:'2%'        
                }}/>
                </>
              ) : (
                <>
                <PauseIcon sx={{
                fontSize:"4vh",
              
                marginLeft:"90%",
                  marginBottom:'2%'        
                }} onClick={() => handleCardClick(e, index)} />
                </>
              )}
        <Typography sx ={{marginTop:"0%", fontSize:"1.5rem"}}>{e.title}</Typography>
      
      </Box>
      ))
    )
  }
  

  const handleCardClick = (e, index) => {
    console.log(e);
    setSelectedSong(e);
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
      setPlayIndex(index);
      setPlayerUrl(playlist["list"][index]["url"]);
      setPlayerState({
        playing: true,
        played: pausedTimes[index] || 0,
        playedSeconds: pausedTimes[index] || 0
      });
    }
  };

  
  useEffect(() => {
  
  }, [GlobalData, params.name]); 

  const handleVideoEnd = () => {
    const nextIndex = (playIndex ?? -1) + 1;
    setPlayIndex(nextIndex);
    if (playlist && playlist["list"] && nextIndex < playlist["list"].length) {
      setSelectedSong(playlist["list"][nextIndex]);
      setPlayerUrl(playlist["list"][nextIndex]["url"]);
    }
  };

  const handleSkipNext = () => {
    if (!playlist || !playlist["list"]) return;
    if (playIndex !== null && playIndex + 1 < playlist["list"].length) {
      const nextIndex = playIndex + 1;
      handleCardClick(playlist["list"][nextIndex], nextIndex);
    }
  };

  const handleSkipPrev = () => {
    if (!playlist || !playlist["list"]) return;
    if (playIndex !== null && playIndex - 1 >= 0) {
      const prevIndex = playIndex - 1;
      handleCardClick(playlist["list"][prevIndex], prevIndex);
    }
  };

  return (
    <div>
      <Container maxWidth={false} sx={{ backgroundColor:"#041b3b", width: "100%",  minHeight: "100vh", padding: 0}}>
        <ToolBar/>

        {selectedSong && (
          <Box sx={{ width: "100%" }}>
            <VideoPlayer 
              VideoData={selectedSong} 
              listData={playlist["list"]}
              index={playIndex}
              isPlaying={playerState.playing}
              sx={{ backgroundColor:"#103359", zIndex: 1, position: 'absolute' }} 
              onVideoEnd={handleVideoEnd}
              onVideoPrev={() => {
                if (playIndex !== null && playIndex > 0) {
                  setPlayIndex(playIndex - 1);
                }
              }}
            />
          </Box>
        )}
        {playlist ? (
          <div style={{paddingTop: "20%"}}>
            <Card sx={{
              width: "90%", 
              marginLeft: "5%",
              marginTo: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              boxShadow: "0 3px 8px rgba(1,0,0,0.4)",
              padding: "5% 4% 2% 4%",
              backgroundColor:"#082b52",
              color: "b9c3d2",
              marginTop: "-15%" // Added negative margin to move card up
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8%', marginTop: '%' , color: "white",}}>
                <Typography height={30} gutterBottom variant="h1" component="div" class="Ysabeau" sx={{ fontSize:"3rem", marginRight: "1%" }}>
                  {playlist["Name"]}
                </Typography>
                <PlayCircleIcon onClick={() => {
                  console.log(playlist["list"][0]);
                  setSelectedSong(playlist["list"][0]);
                  setPlayIndex(0);
                  setPlayerUrl(playlist["list"][0]["url"]);
                  console.log(playlist["list"][0]);
                  setPlayerState({
                    playing: true,
                    played: pausedTimes[0] || 0,
                  });
                }} sx={{
                  borderRadius: "25px",
                  transition: "transform 0.10s ease-in-out",
                  fontSize:"6vh",
                  marginLeft: "15px",
                  marginBottom: 0,
                  "&:hover": { transform: "scale3d(1.3, 1.3, 1)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
                }}/>
                {/* {playIndex !== null && (
                  <>
                    <FastRewindIcon 
                      onClick={handleSkipPrev}
                      sx={{ fontSize:"5vh", marginLeft: "10px", cursor: 'pointer' }}
                    />
                    <FastForwardIcon 
                      onClick={handleSkipNext}
                      sx={{ fontSize:"5vh", marginLeft: "10px", cursor: 'pointer' }}
                    />
                  </>
                )} */}
              </Box>
              <MapPlaylist sx={{marginTop:"10%", color: "b9c3d2"}}/>
            </Card>
          </div>
        ) : (
          <p>Loading Playlist...</p>
        )}
      </Container>
    </div>
  );
}