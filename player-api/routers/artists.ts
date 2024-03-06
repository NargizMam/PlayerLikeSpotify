import express from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artistsList = await Artist.find();
    return res.send(artistsList);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const artistData: ArtistMutation = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info || null,
    };
    const artist = new Artist(artistData);
    await artist.save();
    return res.send('Испонитель был создан!');
  } catch (e) {
    next(e);
  }
});
artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  const id = req.params.id;

  const deletedArtist = await Artist.findByIdAndDelete(id);
  if(!deletedArtist){
    return res.send('Исполнитель, возможно, был удален!');
  }
  return res.send('Исполнитель был удален!');
});

export default artistsRouter;
