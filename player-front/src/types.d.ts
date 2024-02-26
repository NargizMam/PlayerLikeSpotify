export interface User {
    _id: string;
    username: string;
    token: string;
}
export interface RegisterMutation {
    username: string;
    password: string;
}
export interface RegisterResponse {
    message: string;
    user: User;
}
export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface Artist {
    id: string;
    name: string;
}
export interface ArtistApi {
    _id: string;
    name: string;
    image: string | null;
}
export interface AlbumsApi {
    _id: string;
    title: string;
    artist: Artist;
    issueDate: number;
    image: string | null;
    tracksCount?: number;
}
export interface TrackApi {
    _id: string;
    title: string;
    album: {
        _id: string;
        title: string;
        artist: {
            _id: string;
            name: string;
        };
    };
    duration: string;
    serialNumber: number;
}
export interface GlobalError {
    error: string
}
export interface LoginMutation {
    username: string;
    password: string;
}
export interface TrackHistoryMutation {
    token: string;
    track: string;
}
export interface TrackHistoryApi {
    id: string;
    user: string;
    track: string;
    createdAt: string;
    updateAt: string;
}