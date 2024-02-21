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
    const artistName = useAppSelector(selectArtistsName);//как сделать так чтобы не было обязательным
    let name = 'vj';
    if(artistName && artistName.name){
        name = artistName.name;
        console.log(name)
    }

    useEffect(() => {
        if(id){
            dispatch(getOneArtist(id));
            dispatch(getAlbumsList(id));
        }
    }, [dispatch, id]);
    const sortedAlbums = [...albumsList].sort((a,b) => b.issueDate - a.issueDate);
    const allAlbums = sortedAlbums.map(album => (
        <AlbumsItem
            key={album._id}
            id={album._id}
            title={album.title}
            image={album.image}
            artist={album.artist}
            issueDate={album.issueDate}
        />
        )
    );

    return (
        <>
            <Grid container justifyContent="space-around">
                {loading && <CircularProgress/>}
                <Grid>
                    <h1>{name}</h1>
                    <Grid container>
                        {allAlbums}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AlbumsList;