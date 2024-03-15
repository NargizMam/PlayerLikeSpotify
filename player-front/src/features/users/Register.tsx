import {Alert, Avatar, Box, Container, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {RegisterMutation} from '../../types';
import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {googleLogin, registerUser} from './usersThunk';
import {selectRegisterError, selectRegisterLoading} from './usersSlice';
import {GoogleLogin} from "@react-oauth/google";
import {openErrorMessage} from "../WarningMessage/warningMessageSlice.ts";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import ErrorMessage from '../WarningMessage/ErrorMessage.tsx';
import LoadingButton from "@mui/lab/LoadingButton";


const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const registering = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: '',
        displayName: '',
        image: null
    });
    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!state.email || !state.password || !state.displayName) {
            (dispatch(openErrorMessage()))
            return (
                <ErrorMessage errorMessage={'Необходимые поля не заполнены!'}/>
            )
        }
        try {
            await dispatch(registerUser(state)).unwrap();
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
    const googleLoginHandler =  async (credential: string) => {
        try{
            await dispatch(googleLogin(credential)).unwrap();
            navigate('/');
        }catch (e) {
            dispatch(openErrorMessage());
        }
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
                    <LockOutlinedIcon/>
                </Avatar>
                {error && (<Alert variant="filled" severity="error">{error.message}</Alert>)}
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
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
                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="E-mail"
                                name="email"
                                value={state.email}
                                onChange={inputChangeHandler}
                                autoComplete="new-email"
                                error={Boolean(getFieldError('email'))}
                                helperText={getFieldError('email')}
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
                                autoComplete="new-password"
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="displayName"
                                label="Display name"
                                type="displayName"
                                value={state.displayName}
                                onChange={inputChangeHandler}
                                autoComplete="new-displayName"
                                error={Boolean(getFieldError('displayName'))}
                                helperText={getFieldError('displayName')}
                            />
                        </Grid>
                        <Grid item xs>
                            <FileInput
                                label="Image"
                                name="image"
                                onChange={fileInputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        loading={registering}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default Register;