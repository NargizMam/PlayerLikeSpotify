import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {selectAlbumsFetching, selectAlbumsList} from "./albumsSlice.ts";
import AlbumsItem from "./components/AlbumsItem.tsx";
import {getAlbumsList} from "./albumsThunk.ts";
import {useParams} from "react-router-dom";

const AlbumsList = () => {
    const dispatch = useAppDispatch();
    const albumsList = useAppSelector(selectAlbumsList);
    const loading = useAppSelector(selectAlbumsFetching);
    const {id} = useParams();
    const [artistName, setArtistName] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(getAlbumsList(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        const getArtistInfo = () => {
            const albumsKey = albumsList.map(album => album.artist);
            setArtistName(albumsKey[0].name);
        }
        if (albumsList.length > 0) getArtistInfo();
    }, [albumsList]);


    const allALbumsList = albumsList.map(album => (
        <AlbumsItem
            key={album._id}
            id={album._id}
            title={album.title}
            image={album.image}
            issueDate={album.issueDate}
        />
    ));
    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid>
                    <h1>{artistName}</h1>
                    <Grid container>
                        {allALbumsList}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AlbumsList;