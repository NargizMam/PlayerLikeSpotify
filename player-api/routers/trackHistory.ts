import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    if (req.body.track) {
      const trackId = await Track.findById(req.body.track);
      if (!trackId) return res.send('Композиция не найдена!');
      const newTrackHistory = {
        track: req.body.track,
        user: user._id.toString(),
      };
      const trackHistory = new TrackHistory(newTrackHistory);
      await trackHistory.save();
      return res.send(newTrackHistory);
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      next(e);
    }
  }
});
trackHistoryRouter.get('/', async (req, res, next) => {
  const newTrH = await TrackHistory.find();
  return res.send(newTrH);
});

export default trackHistoryRouter;
