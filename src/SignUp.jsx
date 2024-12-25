import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

import { useEffect, useState, useCallback, useRef } from "react";


export default function SignUp() {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isSending, setIsSending] = useState(false)
    

    useEffect(() => {
      if(rememberMe){
        localStorage.setItem('user', null);
          const itemSet = (localStorage.getItem('user') != null);

      }
   
        if(localStorage.getItem('user') != null)  {
            navigate(`/home/${localStorage.getItem('user')}`)
        }
    }, [])

    // set isMounted to false when we unmount the component
    const handleClick = async (event) => {
        event.preventDefault();
        console.log(username, password)
        try {
            fetch(`${apiUrl}/CreateUser/${username}/${password}`)
            .then(res => res.json())
            .then(res=> {
                console.log(res)
              //  localStorage.setItem('user', res["_id"])
              navigate(`/home/${res["_id"]}`)
//
            })
            .catch(err => {
                console.log(err)
            })
            
        } catch (err) {
            console.log(err.message)
        }
    }


  return (
    <Container maxWidth={false} sx={{width: "100%", height: "100vh"}}>
      <Box
        sx={{  
          marginTop: 12,
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          width: "60%",
          marginLeft: "20%"
        }}
      >
        <Typography component="h1" variant="h3">
          Sign Up
        </Typography>
          <TextField
          onChange={event => setUsername(event.target.value)}
            margin="normal"
            fullWidth
            label="Username"
            sx={{
              "& .MuiInputLabel-root": { fontSize: "1.5rem" },
              "& .MuiInputBase-input": { fontSize: "1.5rem", padding: "15px" }
            }}
          />
          <TextField
          onChange={event => setPassword(event.target.value)}
            margin="normal"
            fullWidth
            label="Password"
            sx={{
              "& .MuiInputLabel-root": { fontSize: "1.5rem" },
              "& .MuiInputBase-input": { fontSize: "1.5rem", padding: "15px" }
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" sx={{ transform: "scale(1.5)", marginRight: 1 }} onChange={(e) => setRememberMe(e.target.checked)}/>}
            label="Remember me"
            sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.2rem" } }}
          />
          <Button
          onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{ 
              mt: 4,
              mb: 3,
              backgroundColor: "#24DC15",
              height: 60,
              fontSize: "1.5rem"
            }}
          >
            Sign Up
          </Button>
        </Box>
    </Container>
  );
}