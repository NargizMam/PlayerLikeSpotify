import {useAppSelector} from "../../app/hooks.ts";
import {
    selectArtistCreateError,
    selectArtistCreateSuccess, selectArtistDeleteError,
    selectArtistDeleteSuccess, selectArtistIsPublishedError,
    selectArtistIsPublishedSuccess
} from "../artists/artistsSlice.ts";
import SuccessMessage from "./SuccessMessage.tsx";
import ErrorMessage from "./ErrorMessage.tsx";
import {
    selectAlbumCreateError,
    selectAlbumCreateSuccess, selectAlbumDeleteError, selectAlbumDeleteSuccess, selectAlbumIsPublishedError,
    selectAlbumIsPublishedSuccess
} from "../ albums/albumsSlice.ts";

const WarningMessage = () => {
    const artistCreateSuccess = useAppSelector(selectArtistCreateSuccess);
    const artistsDeleteSuccess = useAppSelector(selectArtistDeleteSuccess);
    const artistIsPublishedSuccess = useAppSelector(selectArtistIsPublishedSuccess);
    const artistsCreateError = useAppSelector(selectArtistCreateError);
    const artistIsPublishedError = useAppSelector(selectArtistIsPublishedError);
    const artistDeleteError = useAppSelector(selectArtistDeleteError);
    const albumCreateSuccess = useAppSelector(selectAlbumCreateSuccess);
    const albumDeleteSuccess = useAppSelector(selectAlbumDeleteSuccess);
    const albumIsPublishedSuccess = useAppSelector(selectAlbumIsPublishedSuccess);
    const albumCreateError = useAppSelector(selectAlbumCreateError);
    const albumIsPublishedError = useAppSelector(selectAlbumIsPublishedError);
    const albumDeleteError = useAppSelector(selectAlbumDeleteError);
    return (
        <>
            {artistCreateSuccess && <SuccessMessage successMessage={artistCreateSuccess}/>}
            {artistsDeleteSuccess && <SuccessMessage successMessage={artistsDeleteSuccess}/>}
            {artistIsPublishedSuccess && <SuccessMessage successMessage={artistIsPublishedSuccess}/>}
            {artistsCreateError && <ErrorMessage errorMessage={artistsCreateError.error}/>}
            {artistIsPublishedError && <ErrorMessage errorMessage={artistIsPublishedError.error}/>}
            {artistDeleteError && <ErrorMessage errorMessage={artistDeleteError.error}/>}
            {albumCreateSuccess && <SuccessMessage successMessage={albumCreateSuccess}/>}
            {albumDeleteSuccess && <SuccessMessage successMessage={albumDeleteSuccess}/>}
            {albumIsPublishedSuccess && <SuccessMessage successMessage={albumIsPublishedSuccess}/>}
            {albumCreateError && <ErrorMessage errorMessage={albumCreateError.error}/>}
            {albumIsPublishedError && <ErrorMessage errorMessage={albumIsPublishedError.error}/>}
            {albumDeleteError && <ErrorMessage errorMessage={albumDeleteError.error}/>}
        </>
    );
};

export default WarningMessage;