import {mongo} from "mongoose";
import {SongDB} from "./playlist.model.db";
import {mockdata} from "../mock/mockdata";

export const initDB = async () => {
   try {
       await SongDB.deleteMany();
       await SongDB.insertMany(mockdata);
       console.log("--> Successful insert of Songs");
   } catch (error) {
       console.log("--> ! Could not insert Data into MongoDB !")
   }
}
