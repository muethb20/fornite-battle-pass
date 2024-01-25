import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./common/views/layout/Header";
import {Song} from "./common/models/Song";
import SongView from "./common/views/view-songs/SongView";
import PlaylistView from "./common/views/view-playlist/PlaylistView";
import AddSong from "./common/views/add-song/AddSong";
import {getSongs, postSong, updateSong} from "./common/services/Service.frontend";

function App() {

  const [songs, setSongs] = useState<Song[]>([]);

  const setSongsFromDB = () => {
      getSongs().then(songs => {
        setSongs(songs);
      })
  }

  useEffect(() => {setSongsFromDB()}, []);

  const changeInPlaylist = async (song:Song) => {
    await updateSong(song);
    setSongsFromDB();
  }

  const addSong = async (song:Song) => {
    await postSong(song);
    setSongsFromDB();
  }

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Header/>}>
              <Route path={"add-song"} element={<AddSong addSong={addSong}/>}></Route>
              <Route path={"view-songs"} element={<SongView addSongToPlaylist={changeInPlaylist} songs={songs}/>}></Route>
              <Route path={"view-playlist"} element={<PlaylistView removeSongFromPlaylist={changeInPlaylist} songs={songs}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
