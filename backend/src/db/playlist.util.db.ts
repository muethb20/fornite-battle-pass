import mongoose from "mongoose";

const DB_URL = 'mongodb://0.0.0.0:27017/WMC';

export const connectDB = async () => {
    mongoose.connect(DB_URL).then(() => {
        console.log('--> Connected to ' + DB_URL);
    }).catch(error => {
        console.log("--> ! MongoDB ERROR ! ", error)
    })
}