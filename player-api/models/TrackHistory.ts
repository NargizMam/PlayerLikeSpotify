import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import Track from './Track';

const TrackHistorySchema = new Schema({
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
  track: {
    type: String,
    required: true,
    ref: 'Track',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await Track.findById(value);
        return Boolean(user);
      },
      message: 'Композиция не найдена!',
    },
  },
  datetime: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
