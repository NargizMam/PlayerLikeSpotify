import {CircularProgress, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {selectAlbumsFetching, selectAlbumsList, selectAlbumUpdateError} from "./albumsSlice.ts";
import AlbumsItem from "./components/AlbumsItem.tsx";
import {useLocation} from "react-router-dom";
import {getAlbumsList} from "./albumsThunk.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

const AlbumsList = () => {
    const albumsList = useAppSelector(selectAlbumsList);
    const loading = useAppSelector(selectAlbumsFetching);
    const [artistName, setArtistName] = useState<string | null>();
    const {search} = useLocation();
    const dispatch = useAppDispatch();
    const artistId = new URLSearchParams(search).get('artist');
    const updateError = useAppSelector(selectAlbumUpdateError);
    let allAlbumsList;

    useEffect(() => {
        if(artistId){
            dispatch(getAlbumsList(artistId));
        }
    }, [dispatch]);

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
            {updateError && <ErrorMessage errorMessage={updateError.error}/>}
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid>
                    {artistName && <Typography variant='h4'>{artistName}</Typography>}
                    <Grid container>
                        {allAlbumsList}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AlbumsList;
