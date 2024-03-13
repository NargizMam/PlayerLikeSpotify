import express from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import client from "../middleware/client";
import {log} from "util";


const artistsRouter = express.Router();

artistsRouter.get('/', client, async ( req: RequestWithUser, res, next) => {
  const user = req.user;

  try {
    let artistsList = await Artist.find({ isPublished: true });
    if(user?.role === 'admin'){
      artistsList = await Artist.find();
    } else if(user){
      artistsList = await Artist.find({
        $or: [
          { isPublished: true },
          { user: user._id, isPublished: false },
        ],
      });
    }
    return res.send(artistsList);
  } catch (e) {
    next(e);
  }
});
artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artistsId = req.params.id;

    const chosenArtist = await Artist.updateOne({_id: artistsId},
        {
          $set: {isPublished: !'$isPublished'}
        });
    if (chosenArtist.matchedCount === 0) {
      return res.status(404).json({error: 'Исполнитель не найден!'});
    }
    return res.send({message: 'artist'});
  }catch (e) {
    next (e);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  const user = req.user;
  try {
    if(!user?._id) return ;

    const artistData: ArtistMutation = {
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description || null,
      user: user._id.toString()
    };
    const artist = new Artist(artistData);
    await artist.save();
    return res.send('Испонитель был создан!');
  } catch (e) {
    next(e);
  }
});
artistsRouter.delete('/:id', auth,  async (req: RequestWithUser, res, next) => {
  const id = req.params.id;
  const user = req.user!;
  let deletedArtist;
  try{

    deletedArtist = await Artist.deleteOne({user: user._id, isPublished: false});
    if(user?.role === 'admin'){
      deletedArtist = await Artist.findByIdAndDelete(id);
    }

    if(!deletedArtist){
      return res.send('Исполнитель, возможно, был удален!');
    }
    return res.send('Исполнитель был удален!');
  }catch (e) {
    next(e);
  }

});

export default artistsRouter;
