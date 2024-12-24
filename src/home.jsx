import React, { useEffect, useState, useRef } from 'react';
import { Container, TextField, Box, Button, Card, Typography, styled, createTheme, CardContent, CardMedia } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ToolBar from './appBar';
import PauseIcon from '@mui/icons-material/Pause';
import ReactPlayer from 'react-player';
import AddToPlaylist from './utills/AddToPlaylistScreen';
import AddIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams, useNavigate } from "react-router-dom";

import background from './assets/openart-image_c1h-whTq_1735019539338_raw (3)_enhanced.jpg';



export default function Home(){
    const nav = useNavigate();
    return (
        <div>
            <div class = "Mezmur" style={{fontSize: '6rem', fontWeight: 'bold', color: 'white', marginTop: '2%', marginLeft: '4%'}}>
                Mezmur
            </div>
            <img 
                src={background}
                alt="Background" 
                style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'cover',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
            />
            <Box sx={{opacity: 0.5}}>
                <Typography variant="h1" sx={{color: 'rgba(255,255,255)', fontSize: '5.5rem', marginTop: '20%', marginLeft: '10%'}}>Music is a Lifestyle </Typography>
                <Typography variant="h1" sx={{color: 'rgba(255,255,255)', fontWeight: 'bold', fontSize: '5.5rem', marginTop: '5%', marginLeft: '10%'}}>Embrace it.  </Typography>
            </Box>

            <Box sx={{
                position: 'absolute',
                top: '3%',
                right: '8%',
                display: 'flex',
                gap: '10px'
            }}>
                <Button 
                onClick={(event) => {
                    event.preventDefault();
                    nav('/login')
                }}
                    
                    variant="outlined" 
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '2vh 5vh',
                        fontSize: '1.2rem',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.3)'
                        }
                    }}
                >
                    Log In
                </Button>
                <Button 
                onClick={(event) => {
                    event.preventDefault();
                    nav('/SignUp')
                }}
                    variant="contained"
                    sx={{
                        backgroundColor: '#1C95E5',
                        padding: '2vh 5vh',
                        fontSize: '1.2rem',
                        '&:hover': {
                            backgroundColor: '#1570AC'
                        }
                    }}
                >
                    Sign Up
                </Button>
            </Box>
                </div>
    )
}