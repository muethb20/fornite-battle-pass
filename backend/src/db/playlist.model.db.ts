import * as mongoose from "mongoose";
import {mongo, Schema} from "mongoose";
import {Song} from "../model/Song";

const songSchema = new mongoose.Schema({
    title: String,
    interpret: String,
    duration: [Number],
    inPlaylist: Boolean
})

export const SongDB = mongoose.model<Song>('Song', songSchema);

