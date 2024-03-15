import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {deleteTrack, getTracksList, updateTrackPublished} from "../trackThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../../WarningMessage/warningMessageSlice.ts";
import {IS_PUBLISHED_ADMIN} from "../../../constants.ts";
import {LoadingButton} from "@mui/lab";
import {selectTracksDeleting, selectTracksIsPublishedUpdating} from "../tracksSlice.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    id: string;
    title: string;
    duration: string;
    serialNumber: number;
    onPlayer: React.MouseEventHandler;
    isPublished: boolean;
    tracksUser: string;
    albumId: string;
}

const TracksItem: React.FC<Props> = ({
                                         id,
                                         title,
                                         duration,
                                         serialNumber,
                                         onPlayer,
                                         isPublished,
                                         tracksUser,
                                         albumId
                                     }) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const updating = useAppSelector(selectTracksIsPublishedUpdating);
    const deleting = useAppSelector(selectTracksDeleting);
    let publishedAction;
    const onDeleteTrack = async () => {
        try {
            await dispatch(deleteTrack(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getTracksList(albumId));
            navigate(`/albums?artist=${albumId}`);
        } catch (e) {
            dispatch(openErrorMessage());
        }
    };
    const toPublishedTrack = async () => {
        try {
            await dispatch(updateTrackPublished(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getTracksList(albumId));
            navigate(`/albums?artist=${albumId}`);
        } catch (e) {
            dispatch(openErrorMessage());
        }
    }
    if (!IS_PUBLISHED_ADMIN) {
        publishedAction = (
            <LoadingButton loading={deleting} onClick={onDeleteTrack}>Удалить</LoadingButton>
        );
    } else if (IS_PUBLISHED_ADMIN) {
        publishedAction = (
            <LoadingButton
                loading={updating}
                onClick={toPublishedTrack}
                sx={{ml: 1}}
                color='warning'
            >Опубликовать</LoadingButton>
        );
    } else if (!isPublished && user && user.role !== 'admin' && user._id === tracksUser) {
        publishedAction = <Typography>Не опубликовано</Typography>;
    }
    return (
        <Card sx={{width: 460, margin: 2}}>
            <CardContent>
                <Typography gutterBottom variant='h4' component="div">
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