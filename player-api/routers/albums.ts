import express from 'express';
import { imagesUpload } from '../multer';
import { AlbumMutation } from '../types';
import Album from '../models/Album';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import client from '../middleware/client';
import Artist from '../models/Artist';

const albumsRouter = express.Router();

albumsRouter.get('/', client, async (req: RequestWithUser, res, next) => {
  const user = req.user;
  const artistId = req.query.artist;
  try {
    let albumsList;
    if (artistId) {
      if (user && user.role === 'admin') {
        albumsList = await Album.find({ artist: artistId }).sort({ issueDate: -1 }).populate('artist', 'title');
      } else if (user) {
        albumsList = await Album.find({
          $or: [
            { artist: artistId, isPublished: true },
            { artist: artistId, user: user._id, isPublished: false },
          ],
        }).populate('artist', 'title');
      } else {
        albumsList = await Album.find({ artist: artistId, isPublished: true })
          .sort({ issueDate: -1 })
          .populate('artist', 'title');
      }
    } else {
      if (user && user.role === 'admin') {
        albumsList = await Album.find().sort({ issueDate: -1 }).populate('artist', 'title');
      } else if (user && user.role !== 'admin') {
        albumsList = await Album.find({
          $or: [{ isPublished: true }, { user: user._id, isPublished: false }],
        }).populate('artist', 'title');
      } else {
        albumsList = await Album.find({ isPublished: true }).sort({ issueDate: -1 }).populate('artist', 'title');
      }
    }
    if (!albumsList || albumsList.length <= 0) {
      return res.status(404).send({ error: 'К сожалению,у данного исполнителя нет альбомов!' });
    }
    const albumsWithTrackCount = await Promise.all(
      albumsList.map(async (album) => {
        const trackCount = await Track.countDocuments({ album: album.id });
        return {
          ...album.toObject(),
          trackCount,
        };
      }),
    );
    return res.send(albumsWithTrackCount);
  } catch (e) {
    next(e);
  }
});
albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const selectAlbum = await Album.findById(req.params.id).populate('artist', 'title');

    if (!selectAlbum) {
      return res.status(404).send({ error: 'Альбом не найден' });
    }
    return res.send(selectAlbum);
  } catch (e) {
    next(e);
  }
});
albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const albumsId = req.params.id;

    Album.findById(albumsId).then((album) => {
      if (!album) {
        throw new Error('Документ не найден');
      }
      album.isPublished = !album.isPublished;

      album.save();
    });
    return res.send('Альбом успешно опубликован');
  } catch (e) {
    next(e);
  }
});
albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  const user = req.user;
  try {
    if (!user?.id) return;
    const albumsData: AlbumMutation = {
      title: req.body.title,
      artist: req.body.artist,
      image: req.file ? req.file.filename : null,
      issueDate: req.body.issueDate,
      user: user?.id.toString(),
    };
    const albums = new Album(albumsData);
    await albums.save();
    return res.send('Альбом был создан!');
  } catch (e) {
    next(e);
  }
});

albumsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  const id = req.params.id;
  const user = req.user!;

  try {
    let deletedAlbums;
    deletedAlbums = await Artist.deleteOne({ user: user._id, isPublished: false });
    if (user.role === 'admin') {
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
