import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL, IS_PUBLISHED_ADMIN} from "../../../constants.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {getTracksList} from "../../tracks/trackThunk.ts";
import {openSnackBar} from "../../ErrorMessage/errorMessageSlice.ts";
import {getAlbumsList, updateAlbumPublished} from "../albumsThunk.ts";

interface Props {
    id: string;
    title: string;
    image: string | null;
    issueDate: number;
    tracksCount: number;
    isPublished: boolean;
    albumsUser: string;
}

const AlbumsItem: React.FC<Props> = ({
                                         title, image, id,
                                         issueDate, tracksCount,
                                         isPublished, albumsUser
                                     }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser)!;

    let cardImage = noImage;

    if (image) {
        cardImage = apiURL + '/' + image;
    }
    let publishedAction = null;
    const toPublishedAlbum = async () => {
        try{
            await dispatch(updateAlbumPublished(id)).unwrap();
            dispatch(getAlbumsList(albumsUser));
        }catch (e) {
            dispatch(openSnackBar());
        }
    }
    const getAlbumsTrackList = async () => {
        await dispatch(getTracksList(id)).unwrap();
        navigate(`/tracks?album=${id}`);
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
    } else if (!isPublished && user && user.role !== 'admin' && user._id === albumsUser) {
        publishedAction = <Typography>Не опубликовано</Typography>;
    }

    return (
        <Card sx={{width: '40%', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 10}}>
            <CardActionArea sx={{p: 1}} onClick={getAlbumsTrackList}>
                <CardMedia
                    sx={{height: 250, borderRadius: 8}}
                    image={cardImage}
                    title={title}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Дата выпуска: {issueDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        В данном альбоме: {tracksCount} треков
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {publishedAction}
            </CardActions>
        </Card>
)
    ;
};

export default AlbumsItem;