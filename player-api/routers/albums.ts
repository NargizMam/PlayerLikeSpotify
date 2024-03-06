import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation, AlbumsWithTrackCount} from "../types";
import Album from "../models/Album";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    let albumsList: AlbumsWithTrackCount[] = [];
    try {
        if (req.query.artist) {
            const artistsAlbum = await Album.find({'artist': req.query.artist}).sort({issueDate: -1}).populate('artist', 'name');
            if(artistsAlbum.length === 0){
                return  res.send('У данного альбома нет треков')
            }
            const albumsWithTrackCount = await Promise.all(artistsAlbum.map(async (album) => {
                const trackCount = await Track.countDocuments({album: album.id});
                return {
                    ...album.toObject(),
                    trackCount,
                }
            }));
            return res.send(albumsWithTrackCount);
        }
        const allAlbumsList = await Album.find();
        const albumsWithTrackCount = await Promise.all(allAlbumsList.map(async (album) => {
            const trackCount = await Track.countDocuments({album: album.id});
            return {
                ...album.toObject(),
                trackCount,
            }
        }));
        return res.send(albumsWithTrackCount);
    } catch (e) {
        next(e);
    }
});
albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const selectAlbum = await Album.findById(req.params.id).populate('artist', 'name');

        if (!selectAlbum) {
            return res.status(404).send({error: 'Альбом не найден'});
        }
        return res.send(selectAlbum);
    } catch (e) {
        next(e);
    }
});
albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const albumsData: AlbumMutation = {
            title: req.body.title,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            issueDate: req.body.issueDate
        }
        const albums = new Album(albumsData);
        await albums.save();
        return res.send('Альбом был создан!');
    } catch (e) {
        next(e);
    }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    const id = req.params.id;

    const deletedAlbums = await Album.findByIdAndDelete(id);
    if(!deletedAlbums){
        return res.send('Альбом, возможно, был удален!');
    }
    return res.send('Альбом был удален!');
});
export default albumsRouter;