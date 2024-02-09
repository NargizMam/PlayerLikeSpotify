export interface ArtistMutation {
    name: string;
    image: string;
    info: string;
}
export interface AlbumMutation {
    title: string;
    artist: string;
    image: string;
}
export interface TrackMutation {
    title: string;
    album: string;
    duration: string;
}