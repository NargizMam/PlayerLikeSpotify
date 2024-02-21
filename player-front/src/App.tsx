import './App.css'
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Artists from "./features/artists/Artists.tsx";
import AlbumsList from "./features/ albums/AlbumsList.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container className="container" maxWidth="xl">
            <Routes>
                <Route path="/"  element={<Artists/>} />
                <Route path="/artists/:id"  element={<AlbumsList/>} />
                <Route path="/register"  element={<Register/>} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>

    </>
);

export default App
