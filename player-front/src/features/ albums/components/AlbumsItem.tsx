import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {NavLink} from "react-router-dom";

interface Props {
    id: string;
    title: string;
    image: string | null;
    issueDate: number;
    tracksCount: number;
}

const AlbumsItem: React.FC<Props> = ({title, image, id, issueDate, tracksCount}) => {
    let cardImage = noImage;

    if (image) {
        cardImage = apiURL + '/' + image;
    }
    return (
        <Card sx={{maxWidth: 345, margin: 2}}>
            <CardMedia
                sx={{height: 140}}
                image={cardImage}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Название альбома:{title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Дата выпуска: {issueDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    В данном альбоме: {tracksCount} треков
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={NavLink} to={`/albums/${id}`} size="small">Посмотреть треки</Button>
            </CardActions>
        </Card>
    );
};

export default AlbumsItem;