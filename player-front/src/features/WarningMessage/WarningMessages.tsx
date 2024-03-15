import { useAppSelector } from '../../app/hooks.ts';
import {
  selectArtistCreateError,
  selectArtistCreateSuccess,
  selectArtistDeleteError,
  selectArtistDeleteSuccess,
  selectArtistIsPublishedError,
  selectArtistIsPublishedSuccess
} from '../artists/artistsSlice.ts';
import SuccessMessage from './SuccessMessage.tsx';
import ErrorMessage from './ErrorMessage.tsx';
import {
  selectAlbumCreateError,
  selectAlbumCreateSuccess,
  selectAlbumDeleteError,
  selectAlbumDeleteSuccess,
  selectAlbumIsPublishedError,
  selectAlbumIsPublishedSuccess,
  selectAlbumsFetchError
} from '../ albums/albumsSlice.ts';
import {
  selectTrackCreateError,
  selectTrackCreateSuccess,
  selectTrackIsPublishedError,
  selectTrackIsPublishedSuccess,
  selectTracksDeleteError,
  selectTracksDeleteSuccess,
  selectTracksFetchingError
} from '../tracks/tracksSlice.ts';

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
  const albumFetchError = useAppSelector(selectAlbumsFetchError);

  const trackCreateSuccess = useAppSelector(selectTrackCreateSuccess);
  const trackDeleteSuccess = useAppSelector(selectTracksDeleteSuccess);
  const trackIsPublishedSuccess = useAppSelector(selectTrackIsPublishedSuccess);
  const trackCreateError = useAppSelector(selectTrackCreateError);
  const trackIsPublishedError = useAppSelector(selectTrackIsPublishedError);
  const trackDeleteError = useAppSelector(selectTracksDeleteError);
  const trackFetchError = useAppSelector(selectTracksFetchingError);
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
      {albumFetchError && <ErrorMessage errorMessage={albumFetchError.error}/>}

      {trackCreateSuccess && <SuccessMessage successMessage={trackCreateSuccess}/>}
      {trackDeleteSuccess && <SuccessMessage successMessage={trackDeleteSuccess}/>}
      {trackIsPublishedSuccess && <SuccessMessage successMessage={trackIsPublishedSuccess}/>}
      {trackCreateError && <ErrorMessage errorMessage={trackCreateError.error}/>}
      {trackIsPublishedError && <ErrorMessage errorMessage={trackIsPublishedError.error}/>}
      {trackDeleteError && <ErrorMessage errorMessage={trackDeleteError.error}/>}
      {trackFetchError && <ErrorMessage errorMessage={trackFetchError.error}/>}
    </>
  );
};

export default WarningMessage;