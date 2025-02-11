import * as albumActions from "../../redux/albums";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import './AlbumDetails.css'

// const user = useSelector((store) => store.session.user);
//     console.log(user)
//     const likedSongIds = useSelector((state) => state.session.user?.likedSongIds || []);
//     const songIds = useSelector((state) => state.session.user?.songIds || []);
//     const albumIds = useSelector((state) => state.session.user?.albumIds || []);
//     const playlistIds = useSelector((state) => state.session.user?.playlistIds || []);

/*

when we land on a details page, we need to get the album from the store
    get the album id from the url with useParams
    create a selector with useSelector
we also need to get the user, if there is one. 
    create a selector with useSelector

Below that, we render the Album img, title, artist name, release year, # songs, and duration

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

const testAlbum = {
  title: "TEST Title",
  image_url:
    "https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/3b41e0933d2b41d8b313bf92d0917c4c.jpg",
  release_year: 1989,
};

const album = {
  artist: {
    artist_id: 1,
    artist_name: "DemoLition",
  },
  id: 1,
  image_url:
    "https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/3b41e0933d2b41d8b313bf92d0917c4c.jpg",
  release_year: 1982,
  song_ids: [1],
  title: "Eye Of The Tiger",
};

const AlbumDetails = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  // const album = useSelector((state) => state.albums[albumId]);
  // const user = useSelector((state) => state.session.user);
  // const albumSongs = useSelector((state) => albumActions.selectAlbumSongs(state, albumId));
  // let userOwnsAlbum = false;

  // if (user) userOwnsAlbum = user.id === album.artist.artist_id;

    
  return (
    <div>
      <div>
        <img className="album-image" src={album.image_url} />
      </div>
      <div>
        <p>Album</p>
        <h2>{album.title}</h2>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
