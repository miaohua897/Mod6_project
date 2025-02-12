import * as albumActions from "../../redux/albums";
import * as songActions from "../../redux/songs";
import { calculateDuration } from '../../resources/helperFunctions';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import './AlbumDetails.css'

/*

if there is a user and they own the album, we render the FIRST crud dropdown, which has
update album and delete album modal buttons

if there is a user and they own the album and there are no songs, we render a message

then, we render a table. Each row has sing title, artist name, duration
if there is a user, we render the like button and a SECOND crud dropdown

in the SECOND crud dropdown, we render:
add to playlist modal button
(if user owns the album): remove song link

if there is a user that owns the album, the final table row is a dropdown menu for adding songs

I have an array of song Ids, and I need that generate me an array of songs

*/

const AlbumDetails = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);
  const albumSongs = useSelector((state) => albumActions.selectAlbumSongs(state, albumId));
  let userOwnsAlbum = false;
  let albumDuration;

  useEffect(() => {
    dispatch(albumActions.thunkLoadAlbums())
  }, [dispatch])

  useEffect(() => {
    dispatch(songActions.getAllSongs())
  }, [dispatch])

  if (!album) return <h2>Loading...</h2>

  if (user) userOwnsAlbum = user.id === album.artist.artist_id;

  if (albumSongs.length) {
    albumDuration = calculateDuration(albumSongs)
  }
    
  return (
    <article>
      <header className="album-details-header">
        <div className="album-image-container">
          <img className="album-image" src={album.image_url} />
        </div>
        <div className="album-info-container">
          <p>Album</p>
          <h2>{album.title}</h2>
          <div id="album-info">
            <p>{album.artist.artist_name}</p>
            <GoDotFill />
            <p>{album.release_year}</p>
            <GoDotFill />
            <p>
              {album.song_ids.length === 1
                ? `1 song`
                : `${album.song_ids.length} songs`}
            </p>
            <GoDotFill />
            {albumSongs.length && <p>{albumDuration}</p>}
          </div>
        </div>
      </header>
      <section className="album-details-update-delete">
        <div>...</div>
      </section>
    </article>
  );
};

export default AlbumDetails;
