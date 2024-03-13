import React, {useCallback, useEffect} from "react";
import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAdminsAlbumsList} from "./adminsThunk.tsx";
import {selectList, selectListFetching} from "./adminsSlice.tsx";
import {AdminsAlbumsApi, TrackApi} from "../../types";
import {LoadingButton} from "@mui/lab";
import Loading from "../../components/UI/Spinner/Loading.tsx";
import {selectArtistsToggleFetching, selectArtistUpdateError} from "../artists/artistsSlice.ts";
import {selectTracksToggleFetching, selectTrackUpdateError} from "../tracks/tracksSlice.ts";
import {selectAlbumsToggleFetching, selectAlbumUpdateError} from "../ albums/albumsSlice.ts";
import {deleteAlbum, updateAlbumPublished} from "../ albums/albumsThunk.ts";
import {deleteTrack, updateTrackPublished} from "../tracks/trackThunk.ts";
import {deleteArtist, updateArtistPublished} from "../artists/artistsThunk.ts";


const AllItems = () => {
    const dispatch = useAppDispatch();
    const adminsList = useAppSelector(selectList);
    const fetching = useAppSelector(selectListFetching);
    const albumsUpdating = useAppSelector(selectAlbumsToggleFetching);
    const artistsUpdating = useAppSelector(selectArtistsToggleFetching);
    const tracksUpdating = useAppSelector(selectTracksToggleFetching);
    const artistError = useAppSelector(selectArtistUpdateError);
    const albumsError = useAppSelector(selectAlbumUpdateError);
    const tracksError = useAppSelector(selectTrackUpdateError);

    const getAllInfo = useCallback(() => {
        dispatch(getAdminsAlbumsList());
    }, [dispatch]);

    useEffect(() => {
        void getAllInfo();
    }, [getAllInfo]);

    const publishedItem = (id: string, model: string) => {
        switch (model) {
            case 'artist':
                dispatch(updateArtistPublished(id));
                break;
            case 'album':
                dispatch(updateAlbumPublished(id));
                break;
            case 'track':
                dispatch(updateTrackPublished(id));
                break;
            default:
                break;
        }
    };

    const deleteItem = (id: string, model: string) => {
        switch (model) {
            case 'artist':
                dispatch(deleteArtist(id));
                break;
            case 'album':
                dispatch(deleteAlbum(id));
                break;
            case 'track':
                dispatch(deleteTrack(id));
                break;
            default:
                break;
        }
    }
    return (
        <>
            {fetching && <Loading/>}
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize: 24}}>Исполнитель</TableCell>
                            <TableCell sx={{fontSize: 24}}>Альбом</TableCell>
                            <TableCell sx={{fontSize: 24}}>Выпуск</TableCell>
                            <TableCell sx={{fontSize: 24}}>Обложка</TableCell>
                            <TableCell sx={{fontSize: 24}}>Статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminsList.map((albumArray: AdminsAlbumsApi[], index: number) => (
                            <React.Fragment key={index}>
                                {albumArray.map((album: AdminsAlbumsApi, albumIndex: number) => (
                                    <React.Fragment key={albumIndex}>
                                        <TableRow>
                                            <TableCell><strong>{album.artist.title.toUpperCase()}</strong>
                                                {album.artist.isPublished ? (
                                                    <LoadingButton loading={artistsUpdating} color='warning'
                                                                   onClick={() => deleteItem(album._id, 'artist')}>
                                                        Удалить
                                                    </LoadingButton>
                                                ) : (
                                                    <>
                                                        <LoadingButton loading={artistsUpdating}
                                                                       onClick={() => publishedItem(album.artist._id, 'artist')}>
                                                            Опубликовать
                                                        </LoadingButton>
                                                        {artistError &&
                                                            <Alert severity="error">{artistError.error}</Alert>}
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell><strong>{album.title}</strong></TableCell>
                                            <TableCell><strong>{album.issueDate}</strong></TableCell>
                                            <TableCell><strong>{album.image}</strong></TableCell>
                                            <TableCell>
                                                {album.isPublished ? (
                                                    <LoadingButton loading={artistsUpdating} color='warning'
                                                                   onClick={() => deleteItem(album._id, 'album')}>
                                                        Удалить
                                                    </LoadingButton>
                                                ) : (
                                                    <>
                                                        <LoadingButton loading={albumsUpdating}
                                                                       onClick={() => publishedItem(album._id, 'album')}>
                                                            Опубликовать
                                                        </LoadingButton>
                                                        {albumsError &&
                                                            <Alert severity="error">{albumsError.error}</Alert>}
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Название трека</TableCell>
                                            <TableCell>Продолжительность</TableCell>
                                            <TableCell>Серийный номер</TableCell>
                                            <TableCell>Статус</TableCell>
                                        </TableRow>
                                        {album.track && album.track.map((track: TrackApi, trackIndex: number) => (
                                            <TableRow style={{backgroundColor: "#f5f5f5"}}
                                                      key={`track-${albumIndex}-${trackIndex}`}>
                                                <TableCell>{track.title}</TableCell>
                                                <TableCell>{track.duration}</TableCell>
                                                <TableCell>{track.serialNumber}</TableCell>
                                                <TableCell>
                                                    {track.isPublished ? (
                                                        <LoadingButton loading={artistsUpdating} color='warning'
                                                                       onClick={() => deleteItem(album._id, 'track')}>
                                                            Удалить
                                                        </LoadingButton>
                                                    ) : (
                                                        <>
                                                            <LoadingButton loading={tracksUpdating}
                                                                           onClick={() => publishedItem(track._id, 'track')}>
                                                                Опубликовать
                                                            </LoadingButton>
                                                            {tracksError &&
                                                                <Alert severity="error">{tracksError.error}</Alert>}
                                                        </>
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