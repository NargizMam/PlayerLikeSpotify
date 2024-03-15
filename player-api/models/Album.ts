import mongoose, { Types } from 'mongoose';
import Artist from './Artist';
import User from './User';

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
  user: {
    type: String,
    required: true,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'Пользователь не найден!',
    },
  },
  issueDate: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
