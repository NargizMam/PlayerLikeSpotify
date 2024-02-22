import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {selectTracksFetching, selectTracksList} from "./tracksSlice.ts";
import {getTracksList} from "./trackThunk.ts";
import TracksItem from "./components/TracksItem.tsx";


const TracksList = () => {
    const dispatch = useAppDispatch();
    const tracksList = useAppSelector(selectTracksList);
    const loading = useAppSelector(selectTracksFetching);
    const {id} = useParams();
    const [albumsInfo, setAlbumsInfo] = useState('');
    // const [artistInfo, setArtistInfo] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(getTracksList(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (tracksList.length > 0) getAlbumsInfo();
        console.log(tracksList)
    }, [tracksList]);
    const getAlbumsInfo = () => {
        const tracksKey = tracksList.map(track => track.album);
        setAlbumsInfo(tracksKey[0].title);
    };

    const allTracks = tracksList.map(track => (
            <TracksItem
                key={track._id}
                title={track.title}
                duration={track.duration}
                serialNumber={track.serialNumber}
            />
        )
    );

    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid>
                    <h1>{albumsInfo}</h1>
                    <Grid container>
                        {allTracks}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default TracksList;