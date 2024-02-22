import {Card, CardContent, Typography} from "@mui/material";
import React from "react";

interface Props {
    title: string;
    duration: string;
    serialNumber: number;
}

const TracksItem: React.FC<Props> = ({title, duration,serialNumber}) => {

    return (
        <Card sx={{width: 460, margin: 2}}>
            <CardContent>
                <Typography gutterBottom variant='h4'  component="div">
                   {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Порядковый номер: <span>{serialNumber}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Продолжительность: {duration}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TracksItem;