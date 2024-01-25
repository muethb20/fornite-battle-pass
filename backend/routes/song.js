"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playlist_model_db_1 = require("../src/db/playlist.model.db");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    playlist_model_db_1.SongDB.find().then(data => {
        if (!data) {
            throw new Error("Database is empty!");
        }
        res.status(200).send(data);
    }).catch(error => {
        console.log("--> GET Route Failed: " + error);
    });
});
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedID = req.params.id;
    const isInPlaylist = req.body.inPlaylist;
    console.log("--> UPDATING ID: " + requestedID);
    console.log("--> NEW VALUE: " + isInPlaylist);
    const updatedSong = yield playlist_model_db_1.SongDB.findByIdAndUpdate({ _id: requestedID }, { inPlaylist: isInPlaylist });
    if (updatedSong == null) {
        res.status(409).json({ "error": "Not found!" });
    }
    else {
        res.status(200).json(updatedSong);
    }
}));
router.post('/', (req, res) => {
    const newSong = req.body;
    const song = new playlist_model_db_1.SongDB(newSong);
    song.save().then(r => { console.log("--> Added new Song!"); })
        .catch(error => { console.log("--> ! ERROR while adding new Song !"); });
    res.status(200).json(newSong);
});
module.exports = router;
