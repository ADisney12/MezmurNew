import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import OptionalText from "./OptionalText";


export default function SignIn() {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [invalidCred, setInvalidCred] = useState(false)

    useEffect(() => {
      if(rememberMe){
        localStorage.setItem('user', null);
          const itemSet = (localStorage.getItem('user') != null);

    
    }
    if (localStorage.getItem('user') != null)  {
      navigate(`/home/${localStorage.getItem('user')}`)
    }
    }, []);
    
    
      const palette = {
        primary: {
          main: '#207FE9',
        },
      }
    
    

    
    

    // set isMounted to false when we unmount the component
    const handleClick = async (event) => {
        event.preventDefault();
        try {
            fetch("http://localhost:3000/CheckUser/" + username + "/" + password)
            .then(res => res.json())
            .then(res=> {
                if(res.status == "success"){
                    console.log(res["content"]["_id"])
                    localStorage.setItem('user', res["content"]["_id"])
                 navigate(`/home/${res.content["_id"]}`)
                }
                if (res.status == "fail" ){
                    setInvalidCred((true))
                    console.log(invalidCred)
                }
            })
            .catch(err => {
                console.log(err)
            })
            
        } catch (err) {
            console.log(err.message)
        }
    }


  return (
    <Container maxWidth={false} sx ={{width: "100%",  height: "100vh"}}>
      <Box
        sx={{  
          marginTop: 12, // Increased top margin
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60%", 
         marginLeft: "20%" // Center the wider box
        }}
      >
        <Typography component="h1" variant="h3"> {/* Increased text size */}
          Sign in
        </Typography>
          
        <OptionalText invalid = {invalidCred}/>

          <TextField
          onChange={event => setUsername(event.target.value)}
            margin="normal"
            fullWidth
            label="Username"
            sx={{ 
              outlineColor: invalidCred ? "#f44336" : undefined,
              "& .MuiInputLabel-root": { fontSize: "1.5rem" }, // Bigger label
              "& .MuiInputBase-input": { fontSize: "1.5rem", padding: "15px" } // Bigger input text
            }}
          />
          <TextField
          onChange={event => setPassword(event.target.value)}
            margin="normal"
            fullWidth
            label="Password"
            sx={{
              "& .MuiInputLabel-root": { fontSize: "1.5rem" }, // Bigger label
              "& .MuiInputBase-input": { fontSize: "1.5rem", padding: "15px" } // Bigger input text
            }}
          />
          <FormControlLabel
            control={<Checkbox 
              value="remember" 
              color="primary" 
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ transform: "scale(1.5)", marginRight: 1 }}
            />}
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
              backgroundColor: "#AB90D6", 
              height: 60, // Taller button
              fontSize: "1.5rem" // Bigger button text
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/SignUp" variant="body2" style={{ fontSize: "1.2rem" }}> {/* Bigger link text */}
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}