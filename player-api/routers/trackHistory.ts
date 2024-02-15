import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';
import {TrackArtistApi, TrackHistoryMutation} from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
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
