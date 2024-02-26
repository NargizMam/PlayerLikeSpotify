import express from 'express';
import {TrackApi, TrackMutation} from '../types';
import Track from '../models/Track';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  let trackList: TrackApi[] = [];
  try {
    if (req.query.album) {
      trackList = await Track.find({album: req.query.album})
          .sort({ serialNumber: 1 })
          .populate([{path:'album', select:'title artist', populate:[{path: 'artist', select: 'name'}]}]);
      if (trackList.length === 0) {
        return res.send('У данного альбома нет треков');
      }
      return res.send(trackList);

    }
      if (req.query.artist) {
        trackList = await Track.find().sort({ serialNumber: 1 }).populate([{path:'album', select:{artist: req.query.artist},populate:[{path: 'artist', select: 'name'}]}]);
        return res.send(trackList);
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
