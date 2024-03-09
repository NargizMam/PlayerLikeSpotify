import express from "express";
import Album from "../models/Album";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Artist from "../models/Artist";

const adminsRouter = express.Router();

adminsRouter.get('/', auth, permit('admin'), async (req, res, next) => {

    try {
        let adminsAlbumsList;
        const artistsList = await Artist.find();

        adminsAlbumsList = await Promise.all(artistsList.map(async (artist) => {
            const albumsList = await Album.find({'artist': artist._id}).sort({issueDate: -1}).populate('artist', 'title');
            if (!albumsList) {
                return res.status(404).send({error: 'У данного исполнителя нет альбомов'});
            }
              await Promise.all(albumsList.map(async (album) => {
                const track = await Track.find({album: album.id})
                return {
                    ...album.toObject(),
                    track,
                };
            }));
            return albumsList
        }))
        return res.send(adminsAlbumsList);
    } catch (e) {
        next(e);
    }
});
export default adminsRouter;