import { Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ArtistMutation } from '../../types';
import { createArtist } from './artistsThunk.ts';
import { selectArtistsCreating } from './artistsSlice.ts';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { openErrorMessage, openSuccessMessage } from '../WarningMessage/warningMessageSlice.ts';
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
  image: null
};
const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creating = useAppSelector(selectArtistsCreating);

  const [state, setState] = useState<ArtistMutation>(initialState);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createArtist(state)).unwrap();
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
      <Typography variant="h4">New artist</Typography>
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
      >
        <Grid container direction="column" spacing={2}>
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
              id="description" label="Description"
              value={state.description}
              onChange={inputChangeHandler}
              name="description"
            />
          </Grid>
          <Grid item xs>
            <FileInput
              label="Image"
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

export default NewArtist;
