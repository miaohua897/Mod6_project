import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../redux/session'
import './LeftNavbarAlbums.css';

export default function LeftNavbarAlbums({ isLoaded, sessionUser }) {
  const userAlbums = useSelector(sessionActions.getUserAlbums);
  const navigate = useNavigate();

  console.log("USER ALBUMS", userAlbums)

  return (
    <article className='albums-sidebar'>
      {userAlbums.map(album => (
        <section className='albums-sidebar-entry' onClick={() => navigate(`/albums/${album.id}`)}>
          <img src={album.image_url} />
          <p>{album.title}</p>
        </section>
      ))}
    </article>
  );
}
