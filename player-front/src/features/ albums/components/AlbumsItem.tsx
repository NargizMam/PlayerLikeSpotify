import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";

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
    const user = useAppSelector(selectUser)!;

    let cardImage = noImage;

    if (image) {
        cardImage = apiURL + '/' + image;
    }
    let publishedAction = null;

    if (isPublished && user) {
        if (user?.role === 'admin') {
            publishedAction = (
                <Button>Удалить</Button>)
        }
    }else if(!isPublished && user){

        if (user?.role === 'admin') {
            publishedAction = (
                <Grid>
                <Button sx={{ml:1}} variant="contained" color='warning'>Опубликовать</Button>
            </Grid>
            )}else if(user?.role !== 'admin' && user._id === albumsUser){
            publishedAction = <Typography>Не опубликовано</Typography>
        }
    }

    return (
        <Card sx={{width: '40%', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 10}}
              component={NavLink} to={`/artists/${id}`}>
            <CardActionArea sx={{p: 1}}>
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
                <CardActions>
                    {publishedAction}
                </CardActions>
        </CardActionArea>
</Card>
)
    ;
};

export default AlbumsItem;