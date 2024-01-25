import express, {Request, Response} from 'express';
import {SongDB} from "../src/db/playlist.model.db";
import {initDB} from "../src/db/playlist.service.db";
import {Song} from "../src/model/Song";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const sortBy = req.query.sortBy;


    SongDB.find().then(data => {
        if (!data){
            throw new Error("Database is empty!");
        }
        let response:Song[] = data;

        if (sortBy != undefined){
            console.log("--> SORT BY:  ", sortBy);

             response = response.sort((a, b) => {
                 switch (sortBy){
                     case "title":
                        return a.title.localeCompare(b.title);
                     case  "interpret":
                         return a.interpret.localeCompare(b.interpret);
                     case "duration":
                         return a.duration[0]*60+a.duration[1] - b.duration[0]*60+b.duration[1]
                     default:
                         return 0;

                 }

            })
        }

        res.status(200).send(response);
    }).catch(error => {
        console.log("--> GET Route Failed: " + error)
    })
})

router.get('/', (req: Request, res: Response) => {

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