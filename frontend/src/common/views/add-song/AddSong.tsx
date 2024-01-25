import React, {FormEvent} from 'react';
import {Song} from "../../models/Song";
import 'bootstrap/dist/css/bootstrap.min.css'

interface AddSongProps{
    addSong: (song:Song) => void
}

const AddSong:React.FC<AddSongProps> = ({addSong}) => {

    const addHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const jsonObject:Song = {
            _id: "",
            title: e.currentTarget.songName.value,
            inPlaylist: false,
            interpret: e.currentTarget.interpret.value,
            duration: [Math.floor(e.currentTarget.duration.valueAsNumber / 60), e.currentTarget.duration.valueAsNumber % 60]
        }

        addSong(jsonObject);
    }

    return (
        <div>
            <h1>Add Song</h1>
            <form onSubmit={addHandler}>
                <div className={"form-group m-2"}>
                    <label className={"form-label"}>Song name</label>
                    <br/>
                    <input type={"text"} id={"songName"}/>
                </div>

                <div className={"form-group m-2"}>
                    <label className={"form-label"}>Interpret</label>
                    <br/>
                    <input type={"text"} id={"interpret"}/>
                </div>

                <div className={"form-group m-2"}>
                    <label className={"form-label"}>Duration in seconds</label>
                    <br/>
                    <input type={"number"} defaultValue={0} min={0} max={600} id={"duration"}/>
                </div>

                <button type={"submit"} className={"btn btn-success"}>Submit</button>
            </form>
        </div>
    );
};

export default AddSong;