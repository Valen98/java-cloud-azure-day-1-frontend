import { useState } from "react";
import Song from "../songs/songs";
import "./style.css";
import { Button } from "@mui/material";

export default function Albums({ album }: { album: any }) {
  const songs: [] = album.songList;
  const [showAlbum, setShowAlbum] = useState(false);

  const handlePress = (e: React.MouseEvent) => {
    const checker = showAlbum;
    setShowAlbum(!checker);
  };

  return (
    <div className="albumBody">
      <div className="albumTitle">
        <h4>{album.albumName}</h4>
        <div className={`songList ${showAlbum ? "expanded" : "collapse"}`}>
          {songs.length < 1
            ? "No songs in this album"
            : songs.map((song, index) => {
                return <Song song={song} key={index} />;
              })}
        </div>
        <Button onClick={handlePress}>{showAlbum ? "Hide Songs" : "Show Songs"}</Button>
      </div>
    </div>
  );
}
