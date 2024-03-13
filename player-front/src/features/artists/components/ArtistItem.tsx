import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";

interface Props {
    title: string;
    id: string;
    image: string | null;
    isPublished: boolean;
    artistUser: string;
}

const Artist: React.FC<Props> = ({title, image, id, isPublished, artistUser}) => {
    const user = useAppSelector(selectUser);

    let cardImage = noImage;
    if (image) {
        cardImage = apiURL + '/' + image;
    }
    let publishedAction = null;

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
                    <Button sx={{ml:1}} variant="contained" color='warning'>Опубликовать</Button>
                </Grid>
            )}else if(user?.role !== 'admin'&& user._id === artistUser){
            publishedAction = <Typography>Не опубликовано</Typography>
        }
    }
    return (
        <Card sx={{width: '28%', m: 2 , p: 2, alignItems:'center', textDecoration:'none', borderRadius: 10}} component={NavLink} to={`/artists/${id}`}>
            <CardActionArea sx={{p: 1}}>
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