import {Button, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";

interface Props {
    title: string;
    duration: string;
    serialNumber: number;
    onPlayer: React.MouseEventHandler;
}

const TracksItem: React.FC<Props> = ({title, duration,serialNumber, onPlayer}) => {
    const user = useAppSelector(selectUser);
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
                {user ? (<Button variant="contained" onClick={onPlayer}>Play</Button>) : null}
            </CardContent>
        </Card>
    );
};

export default TracksItem;