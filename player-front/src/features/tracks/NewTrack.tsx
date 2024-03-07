import {Grid, MenuItem, TextField, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {TrackMutation} from "../../types";
import {LoadingButton} from "@mui/lab";
import React, {useEffect, useState} from "react";
import {selectArtistsList} from "../artists/artistsSlice.ts";
import {getArtistsList} from "../artists/artistsThunk.ts";
import {selectAlbumsList} from "../ albums/albumsSlice.ts";
import {getAlbumsList} from "../ albums/albumsThunk.ts";
import {selectTracksCreating} from "./tracksSlice.ts";
import {createTrack} from "./trackThunk.ts";

const initialState = {
    title: '',
    artist: '',
    album: '',
    duration: '',
    serialNumber: ''
}
const NewTrack = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const creating = useAppSelector(selectTracksCreating);
    const selectedAlbum = useAppSelector(selectAlbumsList);
    const selectedArtist = useAppSelector(selectArtistsList);

    const [state, setState] = useState<TrackMutation>(initialState);
    useEffect(() => {
        dispatch(getArtistsList());
        dispatch(getAlbumsList());
    }, [dispatch]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const onFormSubmit = async (e: React.FormEvent ) => {
        e.preventDefault();
        try {
            await dispatch(createTrack(state)).unwrap();
            setState(initialState);
            navigate('/');
        } catch (e) {
            throw e;
        }
    };

    return (
        <>
            <Typography variant="h4">Новый альбом</Typography>
            <form
                autoComplete="off"
                onSubmit={onFormSubmit}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item xs >
                        <TextField
                            select
                            id="artist" label="Выберите исполнителя"
                            value={state?.artist}
                            onChange={inputChangeHandler}
                            name="artist"
                            required
                        >
                            <MenuItem value="" disabled>Please select a artist</MenuItem>
                            {selectedArtist.map(artist => (
                                <MenuItem key={artist._id} value={artist._id}>
                                    {artist.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            select
                            id="album" label="Выберите альбом"
                            value={state?.album}
                            onChange={inputChangeHandler}
                            name="artist"
                            required
                        >
                            <MenuItem value="" disabled>Please select a artist</MenuItem>
                            {selectedAlbum.map(album => (
                                <MenuItem key={album._id} value={album._id}>
                                    {album.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="title" label="Title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            rows={3}
                            id="duration" label="Продолжительность"
                            value={state.duration}
                            onChange={inputChangeHandler}
                            name="duration"
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            rows={3}
                            id="serialNumber" label="Номер трека в альбоме"
                            value={state.serialNumber}
                            onChange={inputChangeHandler}
                            name="serialNumber"
                        />
                    </Grid>
                    <Grid item xs>
                        <LoadingButton
                            loading={creating}
                            type="submit"
                            color="primary"
                            variant="contained">Create</LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default NewTrack;
