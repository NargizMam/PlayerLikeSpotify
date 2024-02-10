import express from "express";
import {TrackMutation} from "../types";
import Track from "../modules/Track";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    let trackList;
    try {
        if (req.query.album) {
            trackList = await Track.find({'album': req.query.album});
            if(trackList.length === 0){
               return  res.send('У данного альбома нет треков')
            }
            return res.send(trackList);
        }
        trackList = await Track.find();
        return res.send(trackList);
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/',  async (req, res, next) => {
    try {
        const tracksData: TrackMutation = {
            title: req.body.title,
            album: req.body.album,
            duration: req.body.duration
        }
        const tracks = new Track(tracksData);
        await tracks.save();
        return res.send('Track was created!');
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;