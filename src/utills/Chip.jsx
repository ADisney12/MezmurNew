import { Chip } from "@mui/material";
import { useState } from "react";
export default function ChipComponent({ label }) {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }
    return (
        <Chip
            onClick={handleClick}
            label={label}
            variant="outlined"
            sx={{
                backgroundColor: clicked ? "#D8E5FF" : "#36425B",
                marginLeft: "4%",
                marginTop: "3%",
                fontSize: "2em",
                height: "auto",
                fontFamily: "Ysabeau",
                color: clicked ? "#000000" : "white",
                borderColor: "#C1D5FF",
                '&:hover': {
                    // backgroundColor: "#36425B",
                    // color: "#000000",
                },
            }}
        />
    );
}
