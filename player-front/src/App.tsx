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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import AllItems from "./features/Admins/AllItems.tsx";

const App = () => {
    const user = useAppSelector(selectUser);

    return(
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <Container>
                <Routes>
                    <Route path="/"  element={<Artists/>} />
                    <Route path="/register"  element={<Register/>}/>
                    <Route path="/tracksHistory"  element={(
                        <ProtectedRoute isAllowed={!!user}>
                            <TrackHistory/>
                        </ProtectedRoute>)}/>
                    <Route path="/login"  element={<Login/>}/>
                    <Route path="/artists/:id"  element={<AlbumsList/>} />
                    <Route path="/new-artist"  element={(
                        <ProtectedRoute isAllowed={!!user}>
                            <NewArtist/>
                        </ProtectedRoute>)}/>
                    <Route path="/new-album"  element={(
                        <ProtectedRoute isAllowed={!!user}>
                            <NewAlbum/>
                        </ProtectedRoute>)}/>
                    <Route path="/new-track"  element={(
                        <ProtectedRoute isAllowed={!!user}>
                            <NewTrack/>
                        </ProtectedRoute>)}/>
                    <Route path='/allItems' element={(
                        <ProtectedRoute isAllowed={Boolean(user?.role === 'admin')}>
                            <AllItems/>
                        </ProtectedRoute>)}/>
                    <Route path="/albums/:id"  element={<TracksList/>}/>
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
            </Container>

        </>
    )
};


export default App
