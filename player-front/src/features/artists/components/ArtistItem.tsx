import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import noImage from '../../../assets/images/image_not_available.png'
import {apiURL} from "../../../constants.ts";
import React from "react";
import {NavLink} from "react-router-dom";

interface Props {
   name: string;
   id: string;
   image: string | null;
}
const Artist: React.FC<Props> = ({name, image, id}) => {
    let cardImage = noImage;

    if (image) {
        cardImage = apiURL + '/' + image;
    }
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={cardImage}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={NavLink} to={`/albums/artist=${id}`} size="small">Посмотреть альбомы</Button>
            </CardActions>
        </Card>
    );
};

export default Artist;