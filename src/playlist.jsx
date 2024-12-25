import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import { GlobalContext } from "./GlobalData";
import ToolBar from "./appBar"
import ReactPlayer from 'react-player';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, styled, createTheme, Container, AppBar, TextField, CircularProgress, Stack, Box} from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;
const StyledPlayCircleIcon = styled(PlayCircleIcon)(({ theme }) => ({
  borderRadius: "25px",
  transition: "transform 0.10s ease-in-out",
  "&:hover": { transform: "scale3d(1.3, 1.3, 1)", Opacity: ".8", boxShadow: '1px 2px 9px #F4AAB9' },
}));




export default function Playlist() {
   const [selectedSong, setSelectedSong] = useState(null); // New state to hold selected song data
  const [playlist, setPlaylist] = useState(null);
  const [playIndex, setPlayIndex] = useState(null);
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
          border: index == playIndex ? "1px solid #13DD36" : "1px solid black",
          borderRadius: '8px',     
          padding: '3px',  
          marginBottom:'2%',
          color: index === playIndex ? "#13DD36" : "black"
                  
        }}
      >
          {playIndex != index ? (
                <>
                  <StyledPlayCircleIcon  onClick={() => handleCardClick(index)} sx={{
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
                }} onClick={() => handleCardClick(index)} />
                </>
              )}
        <Typography sx ={{marginTop:"0%", fontSize:"1.5rem"}}>{e.title}</Typography>
      
      </Box>
      ))
    )
  }
  
  const handleCardClick = (index) => {
    const videoId = playlist["list"]
    if (playIndex === index) {
      setPlayerState(prevState => ({
        ...prevState,
        playing: false,
        played: playerState.played,
      }));
      setPausedTimes({
        ...pausedTimes,
        [index]: playerState.playedSeconds,
      });
      setPlayIndex(null);
    } else {
      setPlayIndex(index);
      setPlayerUrl(playlist["list"][index]["url"]);
      console.log(playlist["list"][index]["url"]);
      setPlayerState({
        playing: true,
        played: pausedTimes[index] || 0,
      });
    }
  };

  
  useEffect(() => {
  
  }, [GlobalData, params.name]); 

  return (
    <div>
     <ToolBar/>

        <Container maxWidth={false} sx={{backgroundColor:"#DDF2ED ", width: "100%",  height: "100%"}}>

        {playerUrl && (
                    <Box sx={{ width: "100%" }}>
                      
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
               marginTop: "-15%" // Added negative margin to move card up
             }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8%', marginTop: '%' }}>
                  <Typography height={30} gutterBottom variant="h1" component="div" class="Ysabeau" sx={{ fontSize:"3rem", marginRight: "1%" }}>
                    {playlist["Name"]}
                  </Typography>
                  <PlayCircleIcon onClick={() => {
                    setPlayIndex(0);
                    setPlayerUrl(playlist["list"][0]["url"]);
                    console.log(playlist["list"][0]["url"]);
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
                </Box>
              <MapPlaylist sx={{marginTop:"10%"}}/>
             </Card>
            
          </div>
        ) : (
          <p>Loading Playlist...</p>
        )}
        <ReactPlayer
                        url={playerUrl}
                        playing={playerState.playing}
                        controls
                        width={"0%"}
                        height="0%"
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
                        onEnded={() => {
                          const nextIndex = (playIndex + 1) % playlist["list"].length;
                          setPlayIndex(nextIndex);
                          setPlayerUrl(playlist["list"][nextIndex]["url"]);
                          setPlayerState({
                            playing: true,
                            played: 0,
                          });
                        }}
                      />
      </Container>
      
    </div>
    
  
  );
}
