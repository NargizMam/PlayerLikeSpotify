import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';
import { TrackHistoryMutation } from '../types';

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  try {
    const trackHistoryList = await TrackHistory.find()
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'track',
          select: 'title album',
          populate: { path: 'album', select: 'title artist', populate: { path: 'artist', select: 'name' } },
        },
      ]);

    return res.send(trackHistoryList);
  } catch (e) {
    next(e);
  }
});
trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  const user = req.user?.id;
  try {
    if (req.body) {
      const trackId = await Track.findById(req.body.trackId);
      if (!trackId) return res.send('Композиция не найдена!');
      const newTrackHistory: TrackHistoryMutation = {
        track: req.body.trackId,
        user: user,
      };
      const trackHistory = new TrackHistory(newTrackHistory);
      await trackHistory.save();
      return res.send(trackHistory);
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
