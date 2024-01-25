import {Song} from "../models/Song";

export async function updateSong(song:Song){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "inPlaylist": !song.inPlaylist
    });

    await fetch("http://localhost:3000/songs/"+song._id, {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })
}

export async function getSongs():Promise<Song[]>{
    const response = await fetch("http://localhost:3000/songs");
    return response.json();
}

export async function postSong(song:Song){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "title": song.title,
        "interpret": song.interpret,
        "duration": song.duration,
        "inPlaylist": song.inPlaylist
    });


     await fetch("http://localhost:3000/songs", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    });
}

export async function getSortedSongs(query:string) {
    const response = await fetch("http://localhost:3000/songs?sortBy="+query);
    return response.json();
}