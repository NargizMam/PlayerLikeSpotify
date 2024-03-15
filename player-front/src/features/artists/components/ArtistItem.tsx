import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {getAlbumsList} from "../../ albums/albumsThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../../WarningMessage/warningMessageSlice.ts";
import {deleteArtist, getArtistsList, updateArtistPublished} from "../artistsThunk.ts";
import {selectArtistDeleting, selectArtistsIsPublishedFetching} from "../artistsSlice.ts";
import {LoadingButton} from "@mui/lab";

interface Props {
    title: string;
    id: string;
    image: string | null;
    isPublished: boolean;
    artistUser: string;
}

const Artist: React.FC<Props> = ({title, image, id, isPublished, artistUser}) => {
    const user = useAppSelector(selectUser);
    const updatingIsPublished = useAppSelector(selectArtistsIsPublishedFetching);
    const deleting = useAppSelector(selectArtistDeleting);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    let cardImage = noImage;
    if (image) {
        cardImage = apiURL + '/' + image;
    }
    let publishedAction = null;
    const getArtistsAlbum = async () => {
        try {
            await dispatch(getAlbumsList(id)).unwrap();
            dispatch(openSuccessMessage());
            navigate(`/albums?artist=${id}`);
        } catch (error) {
            dispatch(openErrorMessage());
        }
    };
    const onDeleteArtist = async () =>{
        try{
            await dispatch(deleteArtist(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getArtistsList());
            navigate('/');
        }catch (e) {
            dispatch(openErrorMessage());
        }
    };
    const toPublishedArtist = async () => {
        try{
            await dispatch(updateArtistPublished(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getArtistsList());
        }catch (e) {
            dispatch(openErrorMessage());
        }
    }
    if (isPublished && user) {
        if (user?.role === 'admin') {
            publishedAction = (<Grid>
                <LoadingButton loading={deleting} onClick={onDeleteArtist}>Удалить</LoadingButton>
            </Grid>)
        }
    }else if(!isPublished && user){
        if (user?.role === 'admin') {
            publishedAction = (
                <Grid>
                    <LoadingButton sx={{ml:1}}
                            variant="contained"
                            color='warning'
                                   loading={updatingIsPublished}
                            onClick={toPublishedArtist}
                    >Опубликовать</LoadingButton>
                </Grid>
            )}else if(user?.role !== 'admin'&& user._id === artistUser){
            publishedAction = <Typography>Не опубликовано</Typography>
        }
    }
    return (
        <Card sx={{width: '28%', m: 2 , p: 2, alignItems:'center', textDecoration:'none', borderRadius: 10}}>
              <CardActionArea sx={{p: 1}} onClick={getArtistsAlbum}>
            <CardMedia
                sx={{height: 250, borderRadius: 8}}
                image={cardImage}
                title={title}
            />
            <CardContent >
                <Typography gutterBottom variant="h5" component="div"  >
                {title}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                {publishedAction}
            </CardActions>
        </Card>
    );
};

export default Artist;