import { Model } from 'mongoose';

export interface ArtistMutation {
  title: string;
  image: string | null;
  description?: string;
  isPublished?: boolean;
  user: string;
}
export interface AlbumMutation {
  title: string;
  artist: string;
  issueDate: number;
  image?: string | null;
  tracksCount?: number;
  isPublished?: boolean;
  user: string;
}
export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  serialNumber: number;
  isPublished?: boolean;
  user: string;
}
export interface Artist {
  _id: string;
  title: string;
  description: string | null;
  isPublished: boolean;
  user: string;
}

export interface Album {
  _id: string;
  artist: Artist;
  title: string;
  isPublished: boolean;
  user: string;
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
  user: string;
}
export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image?: string;
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
