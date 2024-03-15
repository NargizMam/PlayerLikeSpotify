import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {selectTracksFetching, selectTracksFetchingError, selectTracksList} from "./tracksSlice.ts";
import TracksItem from "./components/TracksItem.tsx";
import {addTrackInHistory} from "../trackHistories/trackHistoryThunk.ts";
import {getTracksList} from "./trackThunk.ts";
import ErrorMessage from "../WarningMessage/ErrorMessage.tsx";


const TracksList = () => {
    const dispatch = useAppDispatch();
    const tracksList = useAppSelector(selectTracksList);
    const loading = useAppSelector(selectTracksFetching);
    const fetchingError = useAppSelector(selectTracksFetchingError)
    const {search} = useLocation();
    const albumId = new URLSearchParams(search).get('album');
    const [tracksInfo, setTracksInfo] = useState({
        artist: '',
        album: ''
    });
    // const [showPlayer, setShowPlayer] = useState(false);
    //
    // const youtubeOpts = {
    //     height: "390",
    //     width: "640",
    //     playerVars: {},
    // };
    useEffect(() => {
        if(albumId){
            dispatch(getTracksList(albumId));
        }
    }, [dispatch]);
    useEffect(() => {
        if (tracksList.length > 0) getAlbumsInfo();
    }, [tracksList]);

    const getAlbumsInfo = () => {
        tracksList.map(track => {
            setTracksInfo((prevState) => ({
                ...prevState,
                album: track.album.title,
                artist: track.album.artist?.title
            }))
        });
    };
    const createTrackHistory = async (id: string) => {
       await dispatch(addTrackInHistory(id)).unwrap();
       // setShowPlayer(true);
    };

    const allTracks = tracksList.map(track => (
            <TracksItem
                key={track._id}
                id={track._id}
                title={track.title}
                duration={track.duration}
                serialNumber={track.serialNumber}
                isPublished={track.isPublished}
                tracksUser={track.user}
                onPlayer={() =>createTrackHistory(track._id)}
            />
        )
    );

    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                {fetchingError && <ErrorMessage
                    errorMessage={fetchingError.error}/> }
                <Grid>
                    <h1>Исполнитель: {tracksInfo.artist}</h1>
                    <h6>Альбом: {tracksInfo.album}</h6>
                    <Grid >
                        {allTracks}
                    </Grid>
                    {/*{showPlayer && (*/}
                    {/*    <Modal open={showPlayer}*/}

                        {/*    <Box>*/}
                        {/*        <YouTubePlayer videoId='usy6l6sEr7g' opts={youtubeOpts}/>*/}
                        {/*        <button onClick={() => setShowPlayer(false)}>Close</button>*/}
                        {/*    </Box>*/}
                        {/*</Modal>)}*/}
                </Grid>
            </Grid>
        </>
    );
};

export default TracksList;