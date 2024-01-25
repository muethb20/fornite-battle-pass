import React, {ChangeEventHandler, FormEvent} from 'react';
import {Song} from "../../models/Song";

interface SongViewProps {
    songs: Song[],
    addSongToPlaylist: (s:Song) => void
    sortSongs: (query:string) => void
}

const SongView: React.FC<SongViewProps> = ({songs, addSongToPlaylist, sortSongs}) => {

    const handleSortChange = () => {
        const sortBy:HTMLSelectElement = document.querySelector("#sortBy") as HTMLSelectElement;
        sortSongs(sortBy.value);
    }


    return (
        <div>
            <h1>All Songs</h1>

            <label>Sort By: </label>
            <select onChange={handleSortChange} id={"sortBy"}>
                <option>title</option>
                <option>interpret</option>
                <option>duration</option>
            </select>

            <table className={"table table-striped table-hover w-50"} style={{margin:"auto"}}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Interpret</th>
                        <th>Duration</th>
                        <th className={"w-25"}>InPlaylist</th>
                    </tr>
                </thead>
                <tbody>
                {songs.map(s => {
                    return <tr style={{height: "5em"}}>
                        <td>{s.title}</td>
                        <td>{s.interpret}</td>
                        <td>{`${s.duration[0]}:${s.duration[1]}`}</td>
                        <td>{s.inPlaylist ? "Added" : <button className={"btn btn-primary"} onClick={() => addSongToPlaylist(s)}>Add Song</button>}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default SongView;