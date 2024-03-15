import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation } from '../../types';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { selectAlbumCreateError, selectAlbumsCreating } from './albumsSlice.ts';
import { createAlbum } from './albumsThunk.ts';
import { selectArtistsList } from '../artists/artistsSlice.ts';
import { getArtistsList } from '../artists/artistsThunk.ts';
import { openErrorMessage, openSuccessMessage } from '../WarningMessage/warningMessageSlice.ts';
import ErrorMessage from '../WarningMessage/ErrorMessage.tsx';

const initialState = {
  title: '',
  description: '',
  artist: '',
  issueDate: '',
  image: null
};
const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(selectAlbumsCreating);
  const selectedArtist = useAppSelector(selectArtistsList);
  const createErrorMessage = useAppSelector(selectAlbumCreateError);

  const [state, setState] = useState<AlbumMutation>(initialState);

  useEffect(() => {
    dispatch(getArtistsList());
  }, [dispatch]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAlbum(state)).unwrap();
      dispatch(openSuccessMessage());
      setState(initialState);
      navigate('/');
    } catch (e) {
      dispatch(openErrorMessage());
    }
  };
  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <>
      {createErrorMessage && <ErrorMessage errorMessage={createErrorMessage.error}/>}
      <Typography variant="h4">Новый альбом</Typography>
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
      >

        <Grid container direction="column" spacing={2}>
          <Grid item xs>
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
              id="title" label="Title"
              value={state.title}
              onChange={inputChangeHandler}
              name="title"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              multiline rows={3}
              id="description" label="Описание альбома"
              value={state.description}
              onChange={inputChangeHandler}
              name="description"
            />
          </Grid>
          <Grid item xs>
            <TextField
              rows={3}
              id="issueDate" label="Дата выпуска"
              value={state.issueDate}
              type='number'
              onChange={inputChangeHandler}
              name="issueDate"
            />
          </Grid>
          <Grid item xs>
            <FileInput
              label="Обложка альбома"
              name="image"
              onChange={fileInputChangeHandler}
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

export default NewAlbum;
