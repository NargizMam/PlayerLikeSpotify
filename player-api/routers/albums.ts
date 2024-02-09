import express from "express";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import Album from "../modules/Album";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    let albumsList;
    try{
        if(req.query.params){
            albumsList = await Album.find({'artist': req.query.params});
            return res.send(albumsList);
        }
        albumsList = await Album.find();
        return res.send(albumsList);
    }catch (e) {
        next(e);
    }
});
albumsRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    try{
        const albumsData: AlbumMutation = {
            title: req.body.title,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null,
            issueDate: req.body.issueDate
        }
        const albums = new Album(albumsData);
        await albums.save();
        return res.send('Album was created!');
    }catch (e) {
        next(e);
    }
});

export default albumsRouter;