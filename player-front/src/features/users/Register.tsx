import {Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {RegisterMutation} from '../../types';
import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {registerUser} from './usersThunk';
import {selectRegisterError} from './usersSlice';
import {GoogleLogin} from "@react-oauth/google";


const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: ''
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
        try {
            await dispatch(registerUser(state)).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e);
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
                {error && (<Alert variant="filled" severity="error">Error !!!</Alert>)}
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
                                error={Boolean(getFieldError('email'))}
                                helperText={getFieldError('email')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
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