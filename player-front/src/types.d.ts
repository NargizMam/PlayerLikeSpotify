export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
}
export interface RegisterMutation {
    email: string;
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
    _id: string;
    title: string;
    isPublished: boolean;
    user: string;
}
export interface ArtistApi {
    _id: string;
    title: string;
    image: string | null;
    isPublished: boolean;
    user: string;
}
export interface ArtistMutation {
    title: string;
    image: string | null;
    description: string | null;
}
export interface Album {
    _id: string;
    title: string;
    artist: Artist;
    user: string;
}
export interface AlbumsApi {
    _id: string;
    title: string;
    artist: Artist;
    issueDate: number;
    image: string | null;
    trackCount?: number;
    isPublished: boolean;
    user: string;
}
export interface AdminsAlbumsApi {
    _id: string;
    title: string;
    artist: Artist;
    issueDate: number;
    image: string | null;
    trackCount?: number;
    isPublished: boolean;
    track: TrackApi[]
}

export interface AlbumMutation {
    title: string;
    artist: string;
    description: string;
    issueDate: string;
    image: string | null;
}

export interface TrackApi {
    _id: string;
    title: string;
    album: Album;
    duration: string;
    serialNumber: number;
    isPublished: boolean;
    user: string;
}
export interface TrackMutation {
    title: string;
    album: string;
    artist: string;
    duration: string;
    serialNumber: string;
}
export interface GlobalError {
    error: string
}
export interface LoginMutation {
    email: string;
    password: string;
}
export interface TrackHistoryApi {
    _id: string;
    track: {
        _id: string;
        title: string;
        album: Album;
    }
    createdAt: string;
    updateAt: string;
}
