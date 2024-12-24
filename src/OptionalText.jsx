import Typography from "@mui/material/Typography";

export default function OptionalText(props){
    if(props.invalid){
        return(
            <Typography component="h3" color={"#FF0A0A "}>
                Invalid Credentails
            </Typography>
        )
    }
}   