import mongoose from 'mongoose';
import Album from './Album';

const TrackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
    ref: 'Album',
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Альбом не найден!',
    },
  },
  duration: {
    type: String,
    required: true,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
