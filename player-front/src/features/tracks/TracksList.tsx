import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {selectTracksFetching, selectTracksList} from "./tracksSlice.ts";
import {getTracksList} from "./trackThunk.ts";
import TracksItem from "./components/TracksItem.tsx";
import {addTrackInHistory} from "../trackHistories/trackHistoryThunk.ts";
import {selectUser} from "../users/usersSlice.ts";


const TracksList = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const tracksList = useAppSelector(selectTracksList);
    const loading = useAppSelector(selectTracksFetching);
    const {id} = useParams();
    const [tracksInfo, setTracksInfo] = useState({
        artist: '',
        album: ''
    });

    useEffect(() => {
        dispatch(getTracksList(null));
        if (id) {
            dispatch(getTracksList(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (tracksList.length > 0) getAlbumsInfo();
    }, [tracksList]);

    const getAlbumsInfo = () => {
        tracksList.map(track => {
            setTracksInfo((prevState) => ({
                ...prevState,
                album: track.album.title,
                artist: track.album.artist?.name
            }))
        });
    };
    const createTrackHistory = (id: string) => {
        if(user){
            const infoForAddTrack = {
                trackId: id,
                token: user.token
            }
            dispatch(addTrackInHistory(infoForAddTrack))
        }else {
            navigate('/login');
        }
    };
    const allTracks = tracksList.map(track => (
            <TracksItem
                key={track._id}
                title={track.title}
                duration={track.duration}
                serialNumber={track.serialNumber}
                onPlayer={() =>createTrackHistory(track._id)}
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