import express, {Request, Response} from 'express';
import {SongDB} from "../src/db/playlist.model.db";
import {initDB} from "../src/db/playlist.service.db";
import {Song} from "../src/model/Song";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    SongDB.find().then(data => {
        if (!data){
            throw new Error("Database is empty!");
        }
        res.status(200).send(data);
    }).catch(error => {
        console.log("--> GET Route Failed: " + error)
    })
})

router.patch('/:id', async (req:Request, res:Response) => {
    const requestedID = req.params.id;
    const isInPlaylist = req.body.inPlaylist;

    console.log("--> UPDATING ID: " + requestedID);
    console.log("--> NEW VALUE: " + isInPlaylist)

    const updatedSong = await SongDB.findByIdAndUpdate({_id: requestedID}, {inPlaylist: isInPlaylist})

    if (updatedSong == null){
        res.status(409).json({"error": "Not found!"})
    }else{
        res.status(200).json(updatedSong);
    }
})

router.post('/', (req:Request, res:Response) => {
    const newSong:Song = req.body;

    const song = new SongDB(newSong);

    song.save().then(r => {console.log("--> Added new Song!")})
        .catch(error => {console.log("--> ! ERROR while adding new Song !")});

    res.status(200).json(newSong);
})

module.exports = router;