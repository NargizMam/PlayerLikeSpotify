import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {getTracksList, updateTrackPublished} from "../trackThunk.ts";
import {openSnackBar} from "../../ErrorMessage/errorMessageSlice.ts";
import {IS_PUBLISHED_ADMIN} from "../../../constants.ts";

interface Props {
    id: string;
    title: string;
    duration: string;
    serialNumber: number;
    onPlayer: React.MouseEventHandler;
    isPublished: boolean;
    tracksUser: string;
}

const TracksItem: React.FC<Props> = ({id, title, duration,serialNumber, onPlayer, isPublished, tracksUser}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    let publishedAction;
    const toPublishedAlbum = async () => {
        try{
            await dispatch(updateTrackPublished(id)).unwrap();
            dispatch(getTracksList(tracksUser));
        }catch (e) {
            dispatch(openSnackBar());
        }
    }
    if (IS_PUBLISHED_ADMIN) {
        publishedAction = (
            <Button >Удалить</Button>
        );
    } else if (!IS_PUBLISHED_ADMIN) {
        publishedAction = (
            <Button
                onClick={toPublishedAlbum}
                sx={{ ml: 1 }}
                color='warning'
            >Опубликовать</Button>
        );
    } else if (!isPublished && user && user.role !== 'admin' && user._id === tracksUser) {
        publishedAction = <Typography>Не опубликовано</Typography>;
    }
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
            <CardActions>
                {publishedAction}
            </CardActions>
        </Card>
    );
};

export default TracksItem;