export interface Artist {
  id: number;
  artistName: string;
  dob: string;
  albums: [Album]
}

export interface Album {
  id: number;
  albumName: string;
  songList: [Song];
}

export interface Song {
  id: number;
  album: Album;
  artist: Artist;
  genres: [Genre];
  songName: string;
}

export interface Genre {
  id: number;
  genre: string;
}
