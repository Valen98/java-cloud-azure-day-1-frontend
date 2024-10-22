import "./style.css"

export default function Song({song} : {song : any}) {
    return (
        <div className="songsBody">
            {song.songName}
        </div>
    )
}