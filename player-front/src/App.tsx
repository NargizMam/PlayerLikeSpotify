import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/Artists.tsx";
import AlbumsList from "./features/ albums/AlbumsList.tsx";
import TracksList from './features/tracks/TracksList.tsx';
import Register from "./features/users/Register.tsx";
import AppToolbar from './components/AppToolbar/AppToolbar/AppToolbar.tsx';
import Login from "./features/users/Login.tsx";
import TrackHistory from "./features/trackHistories/TrackHistory.tsx";
import NewArtist from "./features/artists/NewArtist.tsx";
import NewAlbum from "./features/ albums/NewAlbum.tsx";
import NewTrack from "./features/tracks/NewTrack.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container>
            <Routes>
                <Route path="/"  element={<Artists/>} />
                <Route path="/register"  element={<Register/>}/>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/tracksHistory"  element={<TrackHistory/>}/>
                <Route path="/artists/:id"  element={<AlbumsList/>} />
                <Route path="/new-artist"  element={<NewArtist/>} />
                <Route path="/new-album"  element={<NewAlbum/>} />
                <Route path="/new-track"  element={<NewTrack/>} />
                <Route path="/albums/:id"  element={<TracksList/>}/>
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>

    </>
);

export default App
