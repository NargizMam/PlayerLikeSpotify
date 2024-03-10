import express from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Artist from "../models/Artist";

const adminsRouter = express.Router();

adminsRouter.get('/', auth, permit('admin'), async (req, res, next) => {
    try {
        const artistsList = await Artist.find();
        const adminsAlbumsList = await Promise.all(artistsList.map(async (artist) => {
            const albumsList = await Album.find({'artist': artist._id}).sort({ issueDate: -1 }).populate('artist', 'title');
            if (!albumsList || albumsList.length === 0) {
                return [];
            }

            return  await Promise.all(albumsList.map(async (album) => {
                const trackList = await Track.find({ album: album.id });
                return {
                    ...album.toObject(),
                    track: trackList,
                };
            }));
        }));


        return res.send(adminsAlbumsList);
    } catch (e) {
        next(e);
    }
})
export default adminsRouter;