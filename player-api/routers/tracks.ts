import express from 'express';
import {TrackMutation} from '../types';
import Track from '../models/Track';
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import client from "../middleware/client";
import Artist from "../models/Artist";
import Album from "../models/Album";

const tracksRouter = express.Router();

tracksRouter.get('/', client, async (req: RequestWithUser, res, next) => {
  const user = req.user;

  let trackList = await Track.find({isPublished: true});
  try {
    if(user?.role === 'admin'){
      trackList = await Track.find();
      if (req.query.album) {
        trackList = await Track.find({album: req.query.album})
            .sort({ serialNumber: 1 })
            .populate([{path:'album', select:'title artist', populate:[{path: 'artist', select: 'title'}]}]);
        if (trackList.length === 0) {
          return res.send('У данного альбома нет треков');
        }
        return res.send(trackList);

      }
      if (req.query.artist) {
        trackList = await Track.find().sort({ serialNumber: 1 }).populate([{path:'album', select:{artist: req.query.artist},populate:[{path: 'artist', select: 'title'}]}]);
        return res.send(trackList);
      }
    }
    else {
      trackList = await Track.find({
        $or: [
          { isPublished: true },
          { user: user?._id, isPublished: false },
        ],
      });
    }
    if (req.query.album) {
      if(user){
        trackList = await Track.find({album: req.query.album, user: user.id})
      }
      trackList = await Track.find({album: req.query.album, isPublished: true})
          .sort({ serialNumber: 1 })
          .populate([{path:'album', select:'title artist', populate:[{path: 'artist', select: 'title'}]}]);
      if (trackList.length === 0) {
        return res.send('У данного альбома нет треков');
      }
      return res.send(trackList);

    }
    if (req.query.artist) {
      trackList = await Track.find({isPublished: true}).sort({ serialNumber: 1 }).populate([{path:'album', select:{artist: req.query.artist},populate:[{path: 'artist', select: 'title'}]}]);
      return res.send(trackList);
    }
    return res.send(trackList);
  } catch (e) {
    next(e);
  }
});
tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const trackId = req.params.id;

    const chosenTrack = await Track.updateOne({_id: trackId},
        {
          $set: {isPublished: !'$isPublished'}
        });
    if (chosenTrack.matchedCount === 0) {
      return res.status(404).json({error: 'Трек не найден!'});
    }
    return res.send({message: 'track'});
  } catch (e) {
    next(e);
  }
});

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  const user = req.user;
  try {
    if(!user?.id) return ;
    const tracksData: TrackMutation = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      serialNumber: parseInt(req.body.serialNumber),
      user: user?.id.toString()
    };
    const tracks = new Track(tracksData);
    await tracks.save();
    return res.send('Композиция создана!');
  } catch (e) {
    next(e);
  }
});
tracksRouter.delete('/:id', auth,  async (req: RequestWithUser, res, next) => {
  const id = req.params.id;
  const user = req.user!;

  try {
    let deletedTracks;
    deletedTracks = await Track.deleteOne({user: user._id, isPublished: false});
    if(user.role === 'admin'){
      deletedTracks = await Track.findByIdAndDelete(id);
    }
    if(!deletedTracks){
      return res.send('Трек, возможно, был удален!');
    }
    return res.send('Трек был удален!');
  }catch (e) {
    next (e);
  }

});


export default tracksRouter;
