import React from 'react';
import {Song} from "../../models/Song";
import 'bootstrap/dist/css/bootstrap.min.css'

interface SongViewProps {
    songs: Song[],
    removeSongFromPlaylist: (s:Song) => void
}

const SongView: React.FC<SongViewProps> = ({songs, removeSongFromPlaylist}) => {
    return (
        <div>
            <h1>Playlist Songs</h1>
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
                    if(s.inPlaylist){
                        return <tr>
                            <td>{s.title}</td>
                            <td>{s.interpret}</td>
                            <td>{`${s.duration[0]}:${s.duration[1]}`}</td>
                            <td><button className={"btn btn-danger"} onClick={() => removeSongFromPlaylist(s)}>Remove Song</button></td>
                        </tr>
                    }
                })}
                </tbody>
            </table>
        </div>
    );
};

export default SongView;