import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../models/Album";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import client from "../middleware/client";
import Artist from "../models/Artist";
import user from "../models/User";

const albumsRouter = express.Router();

albumsRouter.get('/', client, async (req: RequestWithUser, res, next) => {
    const user = req.user;
    try {
        let albumsList = await Album.find({isPublished: true});
        if(req.query.artist){
            albumsList = await Album.find({'artist': req.query.artist, isPublished: true}).sort({issueDate: -1}).populate('artist', 'title');
            if (albumsList.length <= 0) {
                return res.status(404).send({error: 'У данного исполнителя нет альбомов'});
            }
        }
        if(user && user?.role === 'admin'){
            albumsList = await Album.find();
            if (req.query.artist) {
                albumsList = await Album.find({'artist': req.query.artist })
                    .sort({issueDate: -1})
                    .populate('artist', 'title');
                if (albumsList.length <= 0) {
                    return res.status(404).send({error: 'У данного исполнителя нет альбомов'});
                }
            }
        if(user && user?.role !== 'admin'){
            albumsList = await Album.find({
                $or: [
                    { isPublished: true },
                    { user: user?._id, isPublished: false },
                ],
            });
            if(req.query.artist){
                albumsList = await Album.find({ 'artist': req.query.artist, user: user?._id, issueDate: { $gt: 0 } })
                    .sort({ issueDate: -1 })
                    .populate('artist', 'title');
                if (albumsList.length <= 0) {
                    return res.status(404).send({error: 'У данного исполнителя нет альбомов'});
                }}
        }


    }
        if (!albumsList || albumsList.length <= 0) {
            return res.status(404).send({error: 'Нет данных'});
        }

        const albumsWithTrackCount = await Promise.all(albumsList.map(async (album) => {
            const trackCount = await Track.countDocuments({album: album.id});
            return {
                ...album.toObject(),
                trackCount,
            };
        }));
        return res.send(albumsWithTrackCount);
    } catch (e) {
        next(e);
    }
});
albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const selectAlbum = await Album.findById(req.params.id).populate('artist', 'title');

        if (!selectAlbum) {
            return res.status(404).send({error: 'Альбом не найден'});
        }
        return res.send(selectAlbum);
    } catch (e) {
        next(e);
    }
});
albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const albumsId = req.params.id;

        const chosenAlbum = await Album.updateOne({_id: albumsId},
            {
                $set: { isPublished: !'$isPublished' }
            });
        if (chosenAlbum.matchedCount === 0) {
            return res.status(404).json({error: 'Альбом не найден!'});
            }
        return res.send({message: 'album'});

    } catch (e) {
        next(e);
    }
});
albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    const user = req.user;
    try {
        if(!user?.id) return ;
        const albumsData: AlbumMutation = {
            title: req.body.title,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            issueDate: req.body.issueDate,
            user: user?.id.toString()
        }
        const albums = new Album(albumsData);
        await albums.save();
        return res.send('Альбом был создан!');
    } catch (e) {
        next(e);
    }
});

albumsRouter.delete('/:id', auth,  async (req: RequestWithUser, res, next) => {
    const id = req.params.id;
    const user = req.user!;

    try {
        let deletedAlbums;
        deletedAlbums = await Artist.deleteOne({user: user._id, isPublished: false});
        if(user.role === 'admin'){
            deletedAlbums = await Album.findByIdAndDelete(id);
        }

        if (!deletedAlbums) {
            return res.send('Альбом, возможно, был удален!');
        }
        return res.send('Альбом был удален!');
    } catch (e) {
        next(e);
    }

});
export default albumsRouter;