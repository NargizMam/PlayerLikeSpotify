export interface ArtistMutation {
    name: string;
    image: string | null;
    info?: string ;
}
export interface AlbumMutation {
    title: string;
    artist: string;
    issueDate: string;
    image: string | null;
}
export interface TrackMutation {
    title: string;
    album: string;
    duration: string;
}
export interface ArtistApi extends ArtistMutation{
    _id: string;
}