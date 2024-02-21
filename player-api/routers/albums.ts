import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../models/Album";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    let albumsList;
    try {
        if (req.query.params) {
            albumsList = await Album.find({'artist': req.query.params}).populate('artist', 'name');
            if(albumsList.length === 0){
                return  res.send('У данного альбома нет треков')
            }
            return res.send(albumsList);
        }
        albumsList = await Album.find();
        return res.send(albumsList);
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
albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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

export default albumsRouter;