import {CircularProgress, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {selectAlbumsFetching, selectAlbumsList} from "./albumsSlice.ts";
import AlbumsItem from "./components/AlbumsItem.tsx";
import {getAlbumsList} from "./albumsThunk.ts";
import {useParams} from "react-router-dom";
import {selectArtistsName} from "../artists/artistsSlice.ts";
import {getOneArtist} from "../artists/artistsThunk.ts";

const AlbumsList = () => {
    const dispatch = useAppDispatch();
    const albumsList = useAppSelector(selectAlbumsList);
    const loading = useAppSelector(selectAlbumsFetching);
    const { id} = useParams();
    const artistName = useAppSelector(selectArtistsName);

    useEffect(() => {
        console.log(id, artistName)

        if(id){
            dispatch(getOneArtist(id));
            dispatch(getAlbumsList(id));
        }
    }, [dispatch]);

    const allAlbums = albumsList.map(album => (
        <AlbumsItem
            key={album.id}
            id={album.id}
            title={album.title}
            image={album.image}
            artist={album.artist}
            issueDate={parseInt(album.issueDate)}
        />
        )
    );
    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid container>
                    <h1>{artistName?.name}</h1>
                    {allAlbums}
                </Grid>
            </Grid>
        </>
    );
};

export default AlbumsList;