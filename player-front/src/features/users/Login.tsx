import React, { useState } from 'react';
import { RegisterMutation } from '../../types';
import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {googleLogin, loginUser } from './usersThunk';
import {selectLoginError} from "./usersSlice.ts";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);
    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: ''
    });
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(loginUser(state)).unwrap();
        navigate('/');
    };
    const googleLoginHandler =  async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                {error && (
                    <Alert severity="error" sx={{mt:3, width:'100%'}}>
                        {error.error}
                    </Alert>
                )}
                <Box>
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        if(credentialResponse.credential) {
                           void googleLoginHandler(credentialResponse.credential);
                        }
                    }}
                     onError={() => {
                         console.log('Login failed!')
                     }}
                    />
                </Box>

                <Box component="form"  onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="E-mail"
                                name="email"
                                value={state.email}
                                onChange={inputChangeHandler}
                                autoComplete="current-email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="password"
                                label="Password"
                                type="password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Log in
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Or sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;