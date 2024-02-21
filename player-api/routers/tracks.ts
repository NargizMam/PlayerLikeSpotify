import express from 'express';
import { TrackApi, TrackArtistApi, TrackMutation } from '../types';
import Track from '../models/Track';
import Artist from '../models/Artist';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  let trackList;
  try {
    if (req.query.album) {
      trackList = await Track.find({ album: req.query.album });
      if (trackList.length === 0) {
        return res.send('У данного альбома нет треков');
      }
      return res.send(trackList);
    }
    if (req.query.artist) {
      let artistTrack: TrackArtistApi[] = [];
      const tracks: TrackApi[] = await Track.find().populate('album', { artist: req.query.artist });
      for (let i = 0; i < tracks.length; i++) {
        const artistName = await Artist.findById(tracks[i].album.artist);
        if (artistName) {
          const artistsTrack: TrackArtistApi = {
            artist: artistName.name,
            title: tracks[i].title,
            duration: tracks[i].duration,
            serialNumber: tracks[i].serialNumber
          };
          artistTrack.push(artistsTrack);
        } else {
          res.send('У данного исполнителя не найдены композиции');
        }
      }
      return res.send(artistTrack);
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
