import * as mongoose from 'mongoose';
import {Types} from "mongoose";
import User from "./User";

const ArtistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false
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
});
const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
