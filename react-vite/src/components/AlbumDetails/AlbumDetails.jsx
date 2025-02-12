import { calculateDuration } from '../../resources/helperFunctions';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import * as albumActions from "../../redux/albums";
import * as songActions from "../../redux/songs";
import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { CreateAlbum, EditAlbum } from '../AlbumForm';
import './AlbumDetails.css'

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showSecondMenu, setShowSecondMenu] = useState(false)
  const dispatch = useDispatch();
  const ulRef = useRef();
  const ulRefSecond = useRef();
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);
  const albumSongs = useSelector((state) => albumActions.selectAlbumSongs(state, albumId));
  let userOwnsAlbum = false;
  let albumDuration;

  useEffect(() => {
    // if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }

      if (ulRefSecond.current && !ulRef.current.contains(e.target)) {
        setShowSecondMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const toggleMenu = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const toggleSecondMenu = (e) => {
    e.stopPropagation();
    setShowSecondMenu(!showSecondMenu);
  };

  const closeMenu = () => setShowMenu(false);

  const closeSecondMenu = () => setShowSecondMenu(false);

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
            {albumSongs.length > 0 &&
            <>
            <GoDotFill />
            <p>{albumDuration}</p>
            </>}
          </div>
        </div>
      </header>
      {userOwnsAlbum && (
        <section className="album-details-update-delete">
        <div onClick={toggleMenu}>...</div>
        {showMenu && (
        <ul className={'album-dropdown'} ref={ulRef}>
            <OpenModalMenuItem 
            modalComponent={<EditAlbum />}
            itemText="Update Album"
            />
          <li>
            delete album
          </li>
        </ul>
      )}
      </section>)}


      <section>
      <div onClick={toggleSecondMenu}>...</div>
        {showSecondMenu && (
        <ul className={'album-song-dropdown'} ref={ulRefSecond}>
          <li>Remove song from album</li>
          <li>Add to Playlist</li>
        </ul>
      )}
      </section>
    </article>
  );
};

export default AlbumDetails;


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

      {/* <section>
        <OpenModalButton
          modalComponent={<CreateAlbum />}
          buttonText="Add an Album"
        />
      </section> */}
