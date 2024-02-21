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
export interface ArtistApi {
    _id: string;
    name: string;
    image: string | null;
}
export interface AlbumsApi {
    _id: string;
    title: string;
    artist: string;
    issueDate: number;
    image: string;
}