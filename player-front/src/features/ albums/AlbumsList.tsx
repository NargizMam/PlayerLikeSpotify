import {CircularProgress, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {selectAlbumsFetchError, selectAlbumsFetching, selectAlbumsList} from "./albumsSlice.ts";
import AlbumsItem from "./components/AlbumsItem.tsx";
import {getAlbumsList} from "./albumsThunk.ts";
import {useParams} from "react-router-dom";
import {selectUser} from "../users/usersSlice.ts";

const AlbumsList = () => {
    const dispatch = useAppDispatch();
    const albumsList = useAppSelector(selectAlbumsList);
    const loading = useAppSelector(selectAlbumsFetching);
    const fetchingError = useAppSelector(selectAlbumsFetchError);
    const {id} = useParams();
    const [artistName, setArtistName] = useState<string | null>();
    let allAlbumsList;

    useEffect(() => {
        if (id) {
            dispatch(getAlbumsList(id));
        } else {
            dispatch(getAlbumsList());
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (albumsList.length > 0) {
            const albumsKey = albumsList.map(album => album.artist);
            setArtistName(albumsKey[0].title);
        }

    }, [albumsList]);

    if (albumsList && albumsList.length !== 0) {
        allAlbumsList = albumsList.map(album => (

            <AlbumsItem
                key={album._id}
                id={album._id}
                title={album.title}
                image={album.image}
                issueDate={album.issueDate}
                tracksCount={album.trackCount ? album.trackCount : 0}
                isPublished={album.isPublished}
                albumsUser={album.user}
            />));
    }else {
        allAlbumsList =  (<h1>У данного исполнителя не добавлен альбом</h1>);
    }


    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid>
                    {artistName && <Typography variant='h4'>{artistName}</Typography>}
                    <Grid container>
                        {fetchingError ? fetchingError.error : allAlbumsList}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AlbumsList;
