import { Model } from 'mongoose';

export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
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
export interface Album {
  _id: string;
  artist: string;
}
export interface TrackApi {
  _id: string;
  title: string;
  album: Album;
  duration: string;
  __v: number;
}
export interface TrackArtistApi {
  artist: string | null;
  title: string;
  duration: string;
}
export interface UserFields {
  username: string;
  password: string;
  token: string;
}
export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type UserModal = Model<UserFields, {}, UserMethods>;
