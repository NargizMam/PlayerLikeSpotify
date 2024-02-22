import express from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artistsList = await Artist.find();
    return res.send(artistsList);
  } catch (e) {
    next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const selectArtist = await Artist.findById(req.params.id);

    if (!selectArtist) {
      return res.status(404).send({error: 'Исполнитель не найден'});
    }
    return res.send(selectArtist.name);
  } catch (e) {
    next(e);
  }
});
artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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

export default artistsRouter;
