export interface Song {
    _id: string,
    title: string,
    interpret: string,
    duration: number[],
    inPlaylist: boolean
}