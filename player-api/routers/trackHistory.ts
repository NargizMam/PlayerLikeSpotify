import express from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';
import {TrackArtistApi, TrackHistoryMutation} from "../types";
import Artist from "../models/Artist";
import Album from "../models/Album";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const trackHistoryList = await TrackHistory.find().populate('track', 'title');
    console.log(trackHistoryList)
    trackHistoryList.map(async history => {
      // const trackTitle = await Album.find({id: history.album});
    })
    return res.send(trackHistoryList);
  } catch (e) {
    next(e);
  }
});
trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  const user = req.user?.id;
  try {
    if (req.body.track) {
      const trackId = await Track.findById(req.body.track);
      if (!trackId) return res.send('Композиция не найдена!');
      const newTrackHistory: TrackHistoryMutation = {
        track: req.body.track.toString(),
        user: user._id.toString(),
      };
      const trackHistory = new TrackHistory(newTrackHistory);
      await trackHistory.save();
      const tracksHistory = await TrackHistory.find<TrackArtistApi[]>();
      return res.send(tracksHistory);
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      next(e);
    }
  }
});

export default trackHistoryRouter;
