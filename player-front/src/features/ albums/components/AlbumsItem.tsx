import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {NavLink} from "react-router-dom";

interface Props {
    id: string;
    title: string;
    image: string | null;
    artist: string;
    issueDate: number;
}

const AlbumsItem: React.FC<Props> = ({title, image, id, issueDate, artist}) => {
    let cardImage = noImage;

    if (image) {
        cardImage = apiURL + '/' + image;
    }
    const getTrack = () => {
        console.log(id);
    }
    return (
        <Card sx={{maxWidth: 345, margin: 2}} onClick={getTrack}>
            <CardMedia
                sx={{height: 140}}
                image={cardImage}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {issueDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={NavLink} to={`/albums?artist=${artist}`} size="small">Посмотреть альбомы</Button>
            </CardActions>
        </Card>
    );
};

export default AlbumsItem;