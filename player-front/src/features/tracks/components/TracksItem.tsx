import {Card, CardContent, Typography} from "@mui/material";
import React from "react";

interface Props {
    title: string;
    duration: string;
    serialNumber: number;
}

const TracksItem: React.FC<Props> = ({title, duration,serialNumber}) => {

    return (
        <Card sx={{maxWidth: 260, margin: 2}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {serialNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {duration}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TracksItem;