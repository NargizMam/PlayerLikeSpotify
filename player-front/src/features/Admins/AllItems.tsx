import React, { useEffect } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { getAdminsAlbumsList } from "./adminsThunk.tsx";
import { selectList } from "./adminsSlice.tsx";
import {AdminsAlbumsApi, TrackApi} from "../../types";
import {LoadingButton} from "@mui/lab";


const AllItems = () => {
    const dispatch = useAppDispatch();
    const adminsList  = useAppSelector(selectList);

    useEffect(() => {
        dispatch(getAdminsAlbumsList());
    }, [dispatch]);

    const onToggleAlbum = (id: string) => {
        console.log(id)
    }
    return (
        <>
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
                                            <TableCell><strong>{album.artist.title.toUpperCase()}</strong></TableCell>
                                            <TableCell><strong>{album.title}</strong></TableCell>
                                            <TableCell><strong>{album.issueDate}</strong></TableCell>
                                            <TableCell><strong>{album.image}</strong></TableCell>
                                            <TableCell><strong>{album.isPublished && 'Published'}</strong></TableCell>
                                            {!album.isPublished && (
                                                <LoadingButton onClick={() => onToggleAlbum(album._id)}>Опубликовать</LoadingButton>)}
                                        </TableRow>
                                        <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: 18 }}>Название трека</TableCell>
                                            <TableCell sx={{ fontSize: 18 }}>Продолжительность</TableCell>
                                            <TableCell sx={{ fontSize: 18 }}>Порядковый номер</TableCell>
                                            <TableCell sx={{ fontSize: 18 }}>Статус</TableCell>
                                        </TableRow>
                                    </TableHead>
                                        <TableBody>
                                            {album.track && album.track.map((track: TrackApi, trackIndex: number) => (
                                                <TableRow style={{ backgroundColor: "#f5f5f5" }}
                                                          key={`track-${albumIndex}-${trackIndex}`}>
                                                    <TableCell>{track.title}</TableCell>
                                                    <TableCell>{track.duration}</TableCell>
                                                    <TableCell>{track.serialNumber}</TableCell>
                                                    <TableCell>{track.isPublished && 'Опубликовано'}</TableCell>
                                                    {!track.isPublished && (
                                                        <LoadingButton onClick={onToggle}>Опубликовать</LoadingButton>)}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AllItems;