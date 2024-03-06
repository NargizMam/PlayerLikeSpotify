import express from 'express';
import {TrackApi, TrackMutation} from '../types';
import Track from '../models/Track';
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import albumsRouter from "./albums";
import Artist from "../models/Artist";
import artistsRouter from "./artists";

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
tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const trackId = req.params.id;

    const chosenTrack = await Track.findById(trackId);
    if(!chosenTrack){
      return res.status(404).json({ error: 'Трек не найден!' });
    }
    chosenTrack.isPublished = !chosenTrack.isPublished;
    await chosenTrack.save();
    return res.send(    { message: 'Success', isPublished: chosenTrack.isPublished });

  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
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
tracksRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  const id = req.params.id;

  const deletedTracks = await Track.findByIdAndDelete(id);
  if(!deletedTracks){
    return res.send('Трек, возможно, был удален!');
  }
  return res.send('Трек был удален!');
});


export default tracksRouter;
