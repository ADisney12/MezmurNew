import { Button, Card, CardActions, CardContent, CardMedia, Typography, styled, createTheme, Container, AppBar, TextField, CircularProgress} from "@mui/material";
import "./fonts.css"
import AddIcon from  '@mui/icons-material/AddCircle';
import ToolBar from "./appBar"
import { useState, useEffect, useContext } from "react";
import AddPlaylist from "./utills/AddPlaylistsScreen";
import { useParams, useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { GlobalContext } from "./GlobalData";
const apiUrl = import.meta.env.VITE_API_URL;


const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.12, 1.12, 1)", Opacity: ".8",  boxShadow: '1px 2px 9px #F4AAB9' }, 
}))

const theme = createTheme({
  spacing: (factor) => `${0.25 * factor}in`, // (Bootstrap strategy)
});

theme.spacing(2);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default function home(){


  const {GlobalData, setGlobalData} = useContext(GlobalContext);
  const [Data, SetData] = useState(null);
  const [AddPlaylistScreen, setPlaylistScreen] = useState(false);

  let params = useParams();
  let nav = useNavigate()

 const PlaylistClicked = async (PlaylistName) => {
        console.log(params["id"])
        nav("/" + params["id"] + "/Playlist/" + PlaylistName)
        
    }
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/FetchPlaylist/${params.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(GlobalData);
      SetData(data.Playlists);
      setGlobalData(data);
      console.log(GlobalData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log(apiUrl);
    fetchData();
  }, []); 

  useEffect(() => {
    console.log(apiUrl);
    console.log(GlobalData);
  }, [GlobalData]); 

const RemovePlaylistScreenState = () => {
  setPlaylistScreen(false)
}
 
const ChangeSceenState = () => {
  setPlaylistScreen(!AddPlaylistScreen)
}
  const MapPlaylists = () => {
    if(Data == null) {
      return null
    }
    return (
      Data.map((e, index) => (
      <StyledCard onClick={ () => {PlaylistClicked(e.Name)}} sx={{ minWidth: "15%",minHeight:"40%", marginRight:"2%", height: 200, display:"inline-block" }}>
      
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {e.Name}
        
            </Typography>
        </CardContent>
       
      </StyledCard>
      ))
    )
  }
    
  

    return(
      <div>
        <Container maxWidth={false} sx={{backgroundColor:"#D2FFFC", width: "100%",  height: "100vh", opacity:  AddPlaylistScreen ? 0.7 : 1}}>

        <ToolBar/>
          <Card sx ={{boxShadow: '3px 3px 9px #BFC6CD', maxWidth: "70%", borderRadius: 10, marginLeft: 6, paddingLeft: 4, marginTop: 15, paddingBottom:10}}  >
              <Typography height={30} gutterBottom variant="h3" component="div" class = "Ysabeau">
                Playlists
              </Typography>
              {Data !== null ? (
                <div>
              <MapPlaylists/>
              <StyledCard onClick ={ChangeSceenState} sx={{ height: 200, display:"inline-block" }}>

                <CardContent sx={{ marginBottom:"90px"}}>
                  <AddIcon sx={{fontSize:"7vh", marginLeft:"15%", marginTop:"30%"}}/>
                  <Typography gutterBottom variant="h5" component="div">
                    Add Playlist

                  </Typography>

                </CardContent>

              </StyledCard>
                </div>
         
              ) : (
                <CircularProgress
              />
              )}
          
              
              
          </Card>
        
        </Container>
          {
              AddPlaylistScreen === true && (
                <div>
                    <AddPlaylist/>
                    <CancelIcon onClick={RemovePlaylistScreenState} sx={{position: "absolute", top:"10%", left:"80%", fontSize:"4vh"}}/>
                </div>
                
              )
            }
            
      </div>
    )

  }
