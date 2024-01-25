import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Outlet} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className={"header fluid text-align-center"}>
                <div className={"row"}>
                    <h1>Playlist</h1>
                </div>
                <div className={"row"}>
                    <Link to={"view-playlist"}>Show Playlist</Link>
                    <Link to={"view-songs"}>Show All Songs</Link>
                    <Link to={"add-song"}>Add new Song</Link>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Header;