import React, {useCallback, useEffect} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    getAdminsAlbumsList,
    updateAlbumPublished,
    updateArtistPublished,
    updateTrackPublished
} from "./adminsThunk.tsx";
import {
    selectAlbumsToggleFetching,
    selectArtistsToggleFetching,
    selectList,
    selectListFetching,
    selectTracksToggleFetching
} from "./adminsSlice.tsx";
import {AdminsAlbumsApi, TrackApi} from "../../types";
import {LoadingButton} from "@mui/lab";
import Loading from "../../components/UI/Spinner/Loading.tsx";


const AllItems = () => {
    const dispatch = useAppDispatch();
    const adminsList  = useAppSelector(selectList);
    const fetching = useAppSelector(selectListFetching);
    const albumsUpdating = useAppSelector(selectAlbumsToggleFetching);
    const artistsUpdating = useAppSelector(selectArtistsToggleFetching);
    const tracksUpdating = useAppSelector(selectTracksToggleFetching);

    const getAllInfo = useCallback(() => {
        dispatch(getAdminsAlbumsList());
    }, [dispatch]);

    useEffect(() => {
       void getAllInfo();
    }, [getAllInfo]);

    const onToggleAlbum = async (id: string) => {
       await dispatch(updateAlbumPublished(id));
    };

    const onToggleTrack = (id: string) => {
        dispatch(updateArtistPublished(id));
    };

    const onToggleArtist = (id: string) => {
        dispatch(updateTrackPublished(id));
    };
    return (
        <>
            {fetching && <Loading/>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 24 }}>Исполнитель</TableCell>
                            <TableCell sx={{ fontSize: 24 }}>Альбом</TableCell>
                            <TableCell sx={{ fontSize: 24 }}>Выпуск</TableCell>
                            <TableCell sx={{ fontSize: 24 }}>Обложка</TableCell>
                            <TableCell sx={{ fontSize: 24 }}>Статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminsList.map((albumArray: AdminsAlbumsApi[], index: number) => (
                            <React.Fragment key={index}>
                                {albumArray.map((album: AdminsAlbumsApi, albumIndex: number) => (
                                    <React.Fragment key={albumIndex}>
                                        <TableRow>
                                            <TableCell><strong>{album.artist.title.toUpperCase()}</strong>
                                                {!album.artist.isPublished && (
                                                    <LoadingButton loading={artistsUpdating} onClick={() => onToggleArtist(album.artist._id)}>
                                                        Опубликовать
                                                    </LoadingButton>
                                                )}
                                            </TableCell>
                                            <TableCell><strong>{album.title}</strong></TableCell>
                                            <TableCell><strong>{album.issueDate}</strong></TableCell>
                                            <TableCell><strong>{album.image}</strong></TableCell>
                                            <TableCell>
                                                <strong>{album.isPublished && 'Опубликовано'}</strong>
                                                {!album.isPublished && (
                                                    <LoadingButton loading={albumsUpdating} onClick={() => onToggleAlbum(album._id)}>
                                                        Опубликовать
                                                    </LoadingButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        {album.track && album.track.map((track: TrackApi, trackIndex: number) => (
                                            <TableRow style={{ backgroundColor: "#f5f5f5" }} key={`track-${albumIndex}-${trackIndex}`}>
                                                <TableCell>{track.title}</TableCell>
                                                <TableCell>{track.duration}</TableCell>
                                                <TableCell>{track.serialNumber}</TableCell>
                                                <TableCell>
                                                    <strong>{track.isPublished && 'Опубликовано'}</strong>
                                                    {!track.isPublished && (
                                                        <LoadingButton loading={tracksUpdating} onClick={() => onToggleTrack(track._id)}>
                                                            Опубликовать
                                                        </LoadingButton>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
    )
};

export default AllItems;