import {Model} from 'mongoose';

export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
  isPublished?: boolean;
}
export interface AlbumMutation {
  title: string;
  artist: string;
  issueDate: number;
  image?: string | null;
  tracksCount?: number;
  isPublished?: boolean;
}
export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  serialNumber: number;
  isPublished?: boolean;
}
export interface Artist {
  _id: string;
  name: string;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
  isPublished: boolean;
}
export interface TrackApi {
  _id: string;
  title: string;
  album: Album;
  duration: string;
  serialNumber: number;
  isPublished: boolean;
}
export interface TrackArtistApi {
  artist: string | null;
  title: string;
  duration: string;
  serialNumber: number;
  isPublished: boolean;
}
export interface TrackAlbumsApi {
  _id: string;
  artist: string | null;
  album: string;
  title: string;
  duration: string;
  serialNumber: number;
  tracksCount?: number;
  isPublished: boolean;
}
export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}
export interface TrackHistoryMutation {
  user: string;
  track: string;
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
  isPublished: boolean;
}