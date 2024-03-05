import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation, AlbumsWithTrackCount} from "../types";
import Album from "../models/Album";
import Track from "../models/Track";

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
            }))
            return res.send(albumsWithTrackCount);
        }
        const allAlbumsList = await Album.find();
        for (let i = 0; i < allAlbumsList.length; i++) {
            const albumTracksCount = await Track.find({album: allAlbumsList[i].id});
            const albumsWithTrackCount: AlbumsWithTrackCount= {
                _id: allAlbumsList[i]._id.toString(),
                artist: allAlbumsList[i].artist,
                title: allAlbumsList[i].title,
                issueDate: allAlbumsList[i].issueDate,
                image:allAlbumsList[i].image,
                tracksCount: albumTracksCount.length,
                isPublished: allAlbumsList[i].isPublished,
            }
            albumsList.push(albumsWithTrackCount)
        }
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