import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Artist } from "../interface/interface";

export default function NewArtist({ artistList }: { artistList: Artist[] }) {
  const base_URL = process.env.API_URL;
  const [artistName, setArtistName] = useState("");
  const [dob, setDob] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (artistName != "" || dob != "") {
      const newArtist = {
        artistName: artistName,
        dob: dob,
      };
      fetch(`${base_URL}/artists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtist),
      })
        .then((res) => res.json())
        .then((data) => {
          artistList.push(data.data);
          console.log(data.data);
        });
    }
  };

  return (
    <div className="newArtistBody">
      <form id="newArtist" onSubmit={handleSubmit}>
        <div className="padding">
          <TextField
            className="textFields"
            id="artistName"
            variant="outlined"
            label="Artist name"
            name="artistName"
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <div style={{ height: "1rem" }}></div>
        <div className="padding">
          <TextField
            className="textFields"
            id="dob"
            variant="outlined"
            label="DOB - DD/MM-YYYY"
            name="dob"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="submitArtist">
          <Button id="newArtist" type="submit" variant="contained">
            Add new Artist
          </Button>
        </div>
      </form>
    </div>
  );
}
