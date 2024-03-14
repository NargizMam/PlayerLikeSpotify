import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {getAlbumsList} from "../../ albums/albumsThunk.ts";
import {openSnackBar} from "../../ErrorMessage/errorMessageSlice.ts";
import {getArtistsList, updateArtistPublished} from "../artistsThunk.ts";

interface Props {
    title: string;
    id: string;
    image: string | null;
    isPublished: boolean;
    artistUser: string;
}

const Artist: React.FC<Props> = ({title, image, id, isPublished, artistUser}) => {
    const user = useAppSelector(selectUser);
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
            navigate(`/albums?artist=${id}`);
        } catch (error) {
            dispatch(openSnackBar());
        }
    };
    const toPublishedArtist = async () => {
        try{
            await dispatch(updateArtistPublished(id)).unwrap();
            dispatch(getArtistsList());
        }catch (e) {
            dispatch(openSnackBar());
        }
    }
    if (isPublished && user) {
        if (user?.role === 'admin') {
            publishedAction = (<Grid>
                <Button>Удалить</Button>
            </Grid>)
        }
    }else if(!isPublished && user){
        if (user?.role === 'admin') {
            publishedAction = (
                <Grid>
                    <Button sx={{ml:1}}
                            variant="contained"
                            color='warning'
                            onClick={toPublishedArtist}
                    >Опубликовать</Button>
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