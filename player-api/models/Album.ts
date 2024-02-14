import mongoose from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
    ref: 'Artist',
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Исполнитель не найден!',
    },
  },
  issueDate: {
    type: String,
    required: true,
  },
  image: String,
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
