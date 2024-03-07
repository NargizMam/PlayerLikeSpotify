import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtistsFetching, selectArtistsList} from "./artistsSlice.ts";
import ArtistItem from "./components/ArtistItem.tsx";
import {useEffect} from "react";
import {getArtistsList} from "./artistsThunk.ts";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artistsList = useAppSelector(selectArtistsList);
    const loading = useAppSelector(selectArtistsFetching);

    useEffect(() => {
        dispatch(getArtistsList());
    }, [dispatch]);

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