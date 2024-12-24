import * as React from 'react';
import { Box, TextField, Chip, Typography, Divider, Button } from '@mui/material';
import { useState } from 'react';
import ChipComponent from './Chip';
import { useParams } from 'react-router-dom';

export default function AddPlaylist() {
  const [title, setTitle] = useState("");
  const [searchQuery, setSearch] = useState(""); // If you intend to use searchQuery elsewhere
  let params = useParams();

  const addPlaylistFunc = async () => {
    console.log("Clicked");
    try {
      const response = await fetch("http://localhost:3000/CreatePlaylist/" + title + "/" + params.id)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      window.location.reload();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box sx={{ height: "60%", width: "58%", backgroundColor: "#36425B", position: "absolute", top: "15%", left: "21%", opacity: "1" }}>
      <Typography
        height={30}
        gutterBottom
        variant="h3"
        component="div"
        fontFamily={"Ysabeau"}
        sx={{ marginLeft: "3%", color: "white", marginTop: "1%" }}
      >
        New Playlist
      </Typography>
      <Divider sx={{ borderColor: "#465470 ", marginTop: "4%" }} />
      <Typography
        height={30}
        gutterBottom
        variant="h3"
        component="div"
        fontFamily={"Ysabeau"}
        sx={{ marginLeft: "3%", color: "white", marginTop: "8%" }}
      >
        Title
      </Typography>
      <TextField
        variant='outlined'
        onChange={event => {
          setTitle(event.target.value);
        }}
        sx={{ fontSize: 20, backgroundColor: "#C0CDE9", outlineColor: "mintcream", left: "30%", width: "50%", color: "black", borderRadius: "7px", bottom: "7%" }}
        placeholder="This will be your playlist's name"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider sx={{ borderColor: "#465470", marginTop: "2%" }} />
      <Box sx={{}}>
        <Typography
          height={30}
          gutterBottom
          variant="h2"
          component="div"
          fontFamily={"Ysabeau"}
          sx={{ marginLeft: "3%", color: "white", marginTop: "5%", marginBottom: "5%" }}
        >
          Genres
        </Typography>

        <ChipComponent label={"Pop"} />
        <ChipComponent label={"Rap"} />
        <ChipComponent label={"Hop"} />
        <ChipComponent label={"Variety"} />
        <ChipComponent label={"Jazz"} />
        <ChipComponent label={"Regae"} />
      </Box>

      <Button variant='outlined' onClick={addPlaylistFunc} sx={{ marginLeft: "80%", fontSize: "1.5vh", bottom: "5%" }}>
        Add Playlist
      </Button>
    </Box>
  );
}
