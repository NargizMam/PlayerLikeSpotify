import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtistsFetching, selectArtistsList} from "./artistsSlice.ts";
import ArtistItem from "./components/ArtistItem.tsx";
import {useEffect} from "react";
import {getArtistsList} from "./artistsThunk.ts";
import {useParams} from "react-router-dom";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artistsList = useAppSelector(selectArtistsList);
    const loading = useAppSelector(selectArtistsFetching);
    const { key } = useParams();

    useEffect(() => {
        dispatch(getArtistsList());
    }, [dispatch, key]);

    const allArtists = artistsList.map(artist => (
        <ArtistItem
            key={artist._id}
            id={artist._id}
            title={artist.title}
            image={artist.image}
        />
    ));
    return (
        <>
            <Grid container justifyContent="space-around">
                {loading ? (<CircularProgress/>) : allArtists}
            </Grid>
        </>
    );
};

export default Artists;