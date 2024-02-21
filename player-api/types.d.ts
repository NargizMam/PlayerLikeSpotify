import { Model } from 'mongoose';

export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
}
export interface AlbumMutation {
  title: string;
  artist: string;
  issueDate: number;
  image: string | null;
}
export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  serialNumber: number;
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
  serialNumber: number;
}
export interface TrackArtistApi {
  artist: string | null;
  title: string;
  duration: string;
  serialNumber: number;
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
