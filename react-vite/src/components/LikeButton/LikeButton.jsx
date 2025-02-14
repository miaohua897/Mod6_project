import { BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../redux/session';
import './LikeButton.css';

export default function LikeButton(songId) {
  const dispatch = useDispatch();
  const likedSongIds = useSelector(state => state.session.user.likedSongIds);

  const handleClick = async ({ songId }) => {
    if (!likedSongIds.includes(songId)) {
      await dispatch(sessionActions.thunkAddLikedSong(songId));
    } else {
      await dispatch(sessionActions.thunkRemoveLikedSong(songId));
    }
  };

  return (
    <span onClick={() => handleClick(songId)} className="like-button-container">
      <BiPlusCircle
        style={{ width: '100%', height: 'auto' }}
        className="like-button"
      />
    </span>
  );
}
