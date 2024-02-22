import express from 'express';
import {TrackAlbumsApi, TrackApi, TrackArtistApi, TrackMutation} from '../types';
import Track from '../models/Track';
import Artist from '../models/Artist';
import artist from "../models/Artist";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  let trackList:TrackAlbumsApi[] = [];

  try {
    if (req.query.album) {
      const albumsTrack: TrackApi[] = await Track.find({album: req.query.album}).populate('album', 'title artist');
      if (albumsTrack.length === 0) {
        return res.send('У данного альбома нет треков');
      }

      for (let i = 0; i < albumsTrack.length; i++) {
        const artistInfo = await Artist.findById(albumsTrack[i].album.artist);

        if (artistInfo) {
          const artistsTrack: TrackAlbumsApi = {
            artist: artistInfo.name,
            album: albumsTrack[i].album.title,
            title: albumsTrack[i].title,
            duration: albumsTrack[i].duration,
            serialNumber: albumsTrack[i].serialNumber
          }
          trackList.push(artistsTrack);
        }
      }
      return res.send(trackList);

    }
      if (req.query.artist) {
        const tracks: TrackApi[] = await Track.find().populate('album', {artist: req.query.artist});
        for (let i = 0; i < tracks.length; i++) {
          const artistInfo = await Artist.findById(tracks[i].album.artist);

          if (artistInfo) {
            const artistsTrack: TrackAlbumsApi = {
              artist: artistInfo.name,
              album: tracks[i].album.title,
              title: tracks[i].title,
              duration: tracks[i].duration,
              serialNumber: tracks[i].serialNumber
            }
            trackList.push(artistsTrack);
          }
        }
        return res.send('ll');
    }
    trackList = await Track.find();
    return res.send(trackList);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const tracksData: TrackMutation = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      serialNumber: parseInt(req.body.serialNumber)
    };
    const tracks = new Track(tracksData);
    await tracks.save();
    return res.send('Композиция создана!');
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;
