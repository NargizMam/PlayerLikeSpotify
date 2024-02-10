import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../modules/Album";
import {Types} from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    let albumsList;
    try {
        if (req.query.params) {
            albumsList = await Album.find({'artist': req.query.params});
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
    let _id: Types.ObjectId;
    try {
        try {
            _id = new Types.ObjectId(req.params.id);
            // console.log(_id, '1') Спросить почему ошибка. Используется до инициализации
        } catch {
            res.status(404).send({error: "Неверный идентификатор!"});
        }
        const selectAlbum = await Album.findById(req.params.id).populate('artist', 'name');
        // console.log(req.params.id, '3')
        // console.log(_id);
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
        return res.send('Album was created!');
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;