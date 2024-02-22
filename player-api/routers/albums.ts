import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation, AlbumsWithTrackCount} from "../types";
import Album from "../models/Album";
import album from "../models/Album";
import Track from "../models/Track";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    let albumsList;
    try {
        if (req.query.artist) {
            const artistsAlbum = await Album.find({'artist': req.query.artist}).populate('artist', 'name');
            if(artistsAlbum.length === 0){
                return  res.send('У данного альбома нет треков')
            }
            for (let i = 0; i < artistsAlbum.length; i++) {
                const albumTracksCount = await Track.find({album: artistsAlbum[i].id});
                const albumsWithTrackCount= {
                    ...artistsAlbum,
                    tracksCount: albumTracksCount.length
                }
            }
            return res.send(artistsAlbum.sort((a, b) => b.issueDate - a.issueDate));
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