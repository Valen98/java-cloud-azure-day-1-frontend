import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import { Album, Artist, Genre } from "../interface/interface";
import "./style.css";
import NewArtist from "./newArtist";
export default function NewMusic() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [targetGenre, setTargetGenre] = useState<Genre | null>(null);
  const base_URL = process.env.API_URL;
  const [targetArtist, setTargetArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[] | null>([]);
  const [targetAlbum, setTargetAlbum] = useState<Album | null>(null);
  const [newArtistChecker, setNewArtistChecker] = useState(false);

  const [songName, setSongName] = useState("");
  const [songDuration, setSongDuration] = useState("");

  useEffect(() => {
    fetch(`${base_URL}/artists`)
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.data);
        console.log(data);
      });
    fetch(`${base_URL}/genres`)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.data);
      });
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    if (name == "artist") {
      const selectedArtist = artists.find(
        (artist) => artist.artistName === value
      );
      console.log(selectedArtist);
      if (selectedArtist != null) {
        setAlbums(selectedArtist.albums);
        setTargetAlbum(null);
      }

      setTargetArtist(selectedArtist || null);
    } else if (name == "album") {
      const selectedAlbum = albums?.find((album) => album.albumName === value);
      setTargetAlbum(selectedAlbum || null);
    } else if (name == "genre") {
      const selectedGenre = genres.find((genre) => genre.genre === value);
      setTargetGenre(selectedGenre || null);
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (targetAlbum != null && targetArtist != null && targetGenre != null) {
      const newSong = {
        songName: songName,
        duration: parseInt(songDuration),
        genreIds: [targetGenre?.id],
        artistId: targetArtist?.id,
        albumId: targetAlbum?.id,
      };
      fetch(`${base_URL}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });
    }
  };

  const addNewArtist = () => {
    setNewArtistChecker(!newArtistChecker);
  };

  if (!artists) {
    return <Loading />;
  }

  return (
    <div className="formParent">
      <h1>Add new music!</h1>
      <div className="formBody">
        <form onSubmit={submit}>
          <div className="paddingSelect">
            {newArtistChecker ? (
              <FormControl className="formControl">
                <InputLabel id="artistLabel">Artist*</InputLabel>
                <Select
                  labelId="artist"
                  id="artistId"
                  name="artist"
                  value={targetArtist?.artistName || ""}
                  label="Artist"
                  onChange={handleChange}
                >
                  {artists.map((artist, index) => (
                    <MenuItem key={index} value={artist.artistName}>
                      {artist.artistName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <NewArtist artistList={artists} />
            )}
            <Button onClick={addNewArtist}>
              {newArtistChecker
                ? "Add new artist"
                : "Use already existing user"}
            </Button>
          </div>
          <div className="paddingSelect">
            <FormControl className="formControl">
              <InputLabel id="albumLabel">Album*</InputLabel>
              <Select
                labelId="album"
                id="albumId"
                name="album"
                value={targetAlbum?.albumName || ""}
                label="Album"
                onChange={handleChange}
              >
                {albums?.map((album, index) => (
                  <MenuItem key={index} value={album.albumName}>
                    {album.albumName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="songBody">
            <div className="padding">
              <TextField
                className="textFields"
                id="song-name"
                label="Song name"
                variant="outlined"
                name="songName"
                onChange={(e) => setSongName(e.target.value)}
              />
            </div>
            <div style={{ height: "1rem" }}></div>
            <div className="padding">
              <TextField
                className="textFields"
                id="song-duration"
                label="Song duration in seconds"
                variant="outlined"
                name="songDuration"
                onChange={(e) => setSongDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="paddingSelect">
            <FormControl className="formControl">
              <InputLabel id="genreLabel">Genre</InputLabel>
              <Select
                labelId="genre"
                id="genreId"
                name="genre"
                value={targetGenre?.genre || ""}
                label="Artist"
                onChange={handleChange}
              >
                {genres.map((genre, index) => (
                  <MenuItem key={index} value={genre.genre}>
                    {genre.genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="buttonDiv">
            <Button type="submit" variant="contained">
              Submit song
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
