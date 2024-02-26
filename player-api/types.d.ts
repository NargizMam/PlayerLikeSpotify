import {Model} from 'mongoose';

export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
}
export interface AlbumMutation {
  title: string;
  artist: string;
  issueDate: number;
  image?: string | null;
  tracksCount?: number;
}
export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  serialNumber: number;
}
export interface Artist {
  _id: string;
  name: string;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
}
export interface TrackApi {
  _id: string;
  title: string;
  album: Album;
  duration: string;
  serialNumber: number;
}
export interface TrackArtistApi {
  artist: string | null;
  title: string;
  duration: string;
  serialNumber: number;
}
export interface TrackAlbumsApi {
  _id: string;
  artist: string | null;
  album: string;
  title: string;
  duration: string;
  serialNumber: number;
  tracksCount?: number;

}
export interface UserFields {
  username: string;
  password: string;
  token: string;
}
export interface TrackHistoryMutation {
  user: string;
  track: string;
}
export interface TrackHistoryApi {
  user: string;
  track: string;
  createdAt: string;
  updateAt: string;
}
export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type UserModal = Model<UserFields, {}, UserMethods>;
export interface Artist{
  id: string,
  name: string
}
export interface AlbumsWithTrackCount {
  _id: string;
  title: string;
  artist: string;
  issueDate: number;
  image?: string | null;
  tracksCount?: number;
}