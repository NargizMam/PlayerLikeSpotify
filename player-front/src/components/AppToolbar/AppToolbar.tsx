import {NavLink} from 'react-router-dom';
import {AppBar, Button, Grid, styled, Toolbar, Typography} from '@mui/material';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to="/">Player</Link>
                    </Typography>
                    <nav>
                        <Button component={NavLink} to={'/'} color="inherit">Выбрать исполнителя</Button>
                        <Button component={NavLink} to="/albums" color="inherit"> Albums</Button>
                        <Button component={NavLink} to="/register" color="inherit"> Sign up</Button>
                    </nav>
                </Grid>

            </Toolbar>
        </AppBar>
    )
};

export default AppToolbar;