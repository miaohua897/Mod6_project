import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { calculateDuration } from "../../resources/helperFunctions";
import * as albumActions from "../../redux/albums";

const AlbumInfo = ({ albumDuration }) => {
  const { albumId } = useParams();
  const album = useSelector((state) => state.albums[albumId]);
  const albumSongs = useSelector((state) =>
    albumActions.selectAlbumSongs(state, albumId)
  );

  if (albumSongs.length) {
    albumDuration = calculateDuration(albumSongs);
  }

  return (
    <div className="album-info-container">
      <div className="album-info-title">
        <p>Album</p>
        <h2>{album.title}</h2>
      </div>
      <div id="album-info-details">
        <p>{album.artist.artist_name}</p>
        <GoDotFill />
        <p>{album.release_year}</p>
        <GoDotFill />
        <p>
          {album.song_ids.length === 1
            ? `1 song`
            : `${album.song_ids.length} songs`}
        </p>
        {album.song_ids.length > 0 && (
          <>
            <GoDotFill />
            <p>{albumDuration}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumInfo;
