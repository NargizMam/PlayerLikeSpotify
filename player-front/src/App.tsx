import './App.css'
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import AlbumsList from "./features/ albums/AlbumsList.tsx";
import TracksList from './features/tracks/TracksList.tsx';
import Register from "./features/users/Register.tsx";
import AppToolbar from './components/AppToolbar/AppToolbar/AppToolbar.tsx';
import Login from "./features/users/Login.tsx";
import TrackHistory from "./features/trackHistories/TrackHistory.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container className="container" maxWidth="xl">
            <Routes>
                <Route path="/"  element={<Artists/>} />
                <Route path="/register"  element={<Register/>}/>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/tracks"  element={<TracksList/>}/>
                <Route path="/tracksHistory"  element={<TrackHistory/>}/>
                <Route path="/artists/:id"  element={<AlbumsList/>} />
                <Route path="/albums/:id"  element={<TracksList/>}/>
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>

    </>
);

export default App
