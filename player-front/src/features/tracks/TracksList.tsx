import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {selectTracksFetching, selectTracksList} from "./tracksSlice.ts";
import {getTracksList} from "./trackThunk.ts";
import TracksItem from "./components/TracksItem.tsx";


const TracksList = () => {
    const dispatch = useAppDispatch();
    // const user = useAppSelector(selectUser);
    const tracksList = useAppSelector(selectTracksList);
    const loading = useAppSelector(selectTracksFetching);
    const {id} = useParams();
    const [tracksInfo, setTracksInfo] = useState({
        artist: '',
        album: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(getTracksList(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (tracksList.length > 0) getAlbumsInfo();
    }, [tracksList]);

    const getAlbumsInfo = () => {
        const tracksAlbum = tracksList.map(track => track.album);
        const tracksArtist = tracksList.map(track => track.artist);
        setTracksInfo((prevState) => ({
            ...prevState,
            album: tracksAlbum[0],
            artist: tracksArtist[0]
        }))
    };
    const createTrackHistory = (id: string) => {
        console.log(id)
    }
    const allTracks = tracksList.map(track => (
            <TracksItem
                key={track.id}
                id={track.id}
                title={track.title}
                duration={track.duration}
                serialNumber={track.serialNumber}
                onPlayer={() =>createTrackHistory(track.id)}

            />
        )
    );

    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid>
                    <h1>Исполнитель: {tracksInfo.artist}</h1>
                    <h6>Альбом: {tracksInfo.album}</h6>
                    <Grid >
                        {allTracks}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default TracksList;