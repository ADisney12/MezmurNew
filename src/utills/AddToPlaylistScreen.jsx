import * as React from 'react';
import { Box, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import ChipComponent from './Chip';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddToPlaylist({VideoData, index}) {
    const [Stateindex, SetIndex] = useState(0);
    const [data, setData] = useState(null);
    const [selectedChip, setSelectedChip] = useState(null);
    const [loading, setLoading] = useState(true);

    let SongData = VideoData["song"];
    let params = useParams();

    const handleChipClick = (index) => {
        setSelectedChip(index);
        SetIndex(index);
    };

    const MapPlaylists = () => {
        if (!data) {
            return <CircularProgress sx={{ marginTop: "10%", marginLeft: "30%", fontSize: "10vl" }} />;
        }
        return (
            data.map((e, index) => (
                <ChipComponent
                    key={index}
                    label={e.Name}
                    clicked={selectedChip === index}
                    handleClick={() => handleChipClick(index)}
                />
            ))
        );
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/FetchPlaylist/${params.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data.Playlists);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const AddToPlaylistRequest = async () => {
        try {
            if (data && data[Stateindex]) {
                const response = await axios.post('http://localhost:3000/AddToPlaylist', {
                    Playlist: data[Stateindex].Name,
                    userId: params.id,
                    SongName: SongData["title"],
                    songThumbnail: SongData["thumbnail"],
                    SongUrl: SongData["url"],
                    Author: SongData["author"]["name"]
                });
                console.log(response.data);
            } else {
                console.error("Selected playlist data is not available.");
            }
        } catch (error) {
            console.error('Error adding to playlist:', error);
        }
    };

    return (
        <Box sx={{ height: "50%", width: "58%", backgroundColor: "#36425B", position: "absolute", top: `${ (10) + 60 * index}%`, left: "21%", opacity: "1" }}>
            <Divider sx={{ borderColor: "#465470", marginTop: "2%", paddingBottom: "6%" }} />
            <Box>
                <Typography
                    height={30}
                    gutterBottom
                    variant="h2"
                    component="div"
                    fontFamily={"Ysabeau"}
                    sx={{ marginLeft: "3%", color: "white", marginTop: "5%", marginBottom: "5%" }}
                >
                    Add song to Playlist
                </Typography>
                <MapPlaylists />
            </Box>
            <Button variant='outlined' onClick={AddToPlaylistRequest} sx={{ left: "80%", top: "10%", fontSize: "2rem", borderRadius: "10px", borderColor: "#D5E3FF", color: "#D5E3FF" }}>
                Add
            </Button>
        </Box>
    );
}
