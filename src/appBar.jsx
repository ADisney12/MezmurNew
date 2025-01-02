import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import icon from './icon';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useNavigate } from "react-router-dom";
import Icon from './icon';
import { useState } from 'react';
import { useParams, useLocation } from "react-router-dom";

const drawerWidth = 240;

const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: "#E8EEF3"
  }
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  

const Search = styled('TextField')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 4, 1, 2),
    // vertical padding + font size from searchIcon
    marginLeft: `calc(0.5em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    marginRight: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:hover': {
        width: '20ch',
      },
    },
  },
}));




export default function ToolBar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [SearchQuery, SetSearch] = useState("")
    const location = useLocation();

    let params = useParams();


    const handleDrawerOpen = () => {
        setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    let nav = useNavigate()

    const SearchFunc = async (e) => {
        console.log(params["id"])
        nav("/" + params["id"] + "/Search/" + SearchQuery)
        window.location.reload();
    }

    const handleMovmenet = async (e) => {
      if(e == 0 && location.pathname != "/home/" + params["id"] && open ==true){
        nav("/home/" + params["id"])
        //window.location.reload();
      }
    }
  
  
  return (
    <Box sx={{ flexGrow: 1 }} class = "Mezmur">
      <AppBar position="static" sx={{backgroundColor: "#0CB4CF"}}>
        <Toolbar>
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Soon', 'Soon', 'Soon'].map((text, index) => (
            <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMovmenet(index)}>
            <ListItemText primary={text} />
            <Icon value={index} />
          </ListItemButton>

            </ListItem>
          ))}
        </List>
        <Divider />

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
          <IconButton
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <div class = "Mezmur">
            Mezmur
            </div>
            
          </Typography>
          <Search  
          fullWidth
          label="Password"
          > 
            <StyledInputBase 
            onChange={event => {
              SetSearch(event.target.value)
        
            }}
              sx={{fontSize:20}}
              placeholder="Search For Songs…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box>
          <StyledButton onClick={SearchFunc}
            sx={{ mt: 3, mb: 2, backgroundColor: "#10ACC5", height: 60, marginBottom: 3 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            </StyledButton>
          </Box>
        </Toolbar> 
      </AppBar>
    </Box>
  );
} 