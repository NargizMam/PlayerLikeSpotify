import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import {randomUUID} from "crypto";

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    toke: {
        type: String,
        required: true,
    }
});

UserSchema.methods.generateToken = function (){
    this.token = randomUUID();
};
UserSchema.methods.checkPassword = function(password: string){
    return bcrypt.compare(password, this.password);
};
UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(salt, this.password);
    next();
});
UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);